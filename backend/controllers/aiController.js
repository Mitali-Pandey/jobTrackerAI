import { GoogleGenerativeAI } from "@google/generative-ai";
import parseResume from "../utils/parseResume.js";
import Application from "../models/Application.js";
import fs from "fs";

// Retry Gemini request when Google temporarily returns 503/429/5xx
const generateWithRetry = async (model, prompt, maxRetries = 3) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      lastError = error;

      const status = error?.status;
      const message = error?.message || "";

      const shouldRetry =
        status === 503 ||
        status === 429 ||
        status >= 500 ||
        message.includes("503") ||
        message.includes("Service Unavailable");

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      // 1s, 2s, 4s + small random jitter
      const delay =
        Math.pow(2, attempt) * 1000 +
        Math.floor(Math.random() * 500);

      console.log(
        `Gemini request failed (${status}). Retrying in ${delay}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

// @route  POST /api/ai/match/:applicationId
// @desc   Upload resume, compare with job description, save match score
export const matchResume = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const { jobDescription } = req.body;
    const { applicationId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume PDF",
      });
    }

    uploadedFilePath = req.file.path;

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const resumeText = await parseResume(uploadedFilePath);

    const prompt = `
You are an ATS (Applicant Tracking System) resume screener.

Compare the RESUME below with the JOB DESCRIPTION.

Return ONLY valid JSON in this exact format.
Do not use markdown code blocks.
Do not include any explanation outside the JSON.

{
  "matchScore": <number 0-100>,
  "missingKeywords": ["...", "..."],
  "feedback": "short 2-line feedback"
}

RESUME:
${resumeText.slice(0, 3000)}

JOB DESCRIPTION:
${jobDescription}
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Use a specific stable model instead of the moving "latest" alias
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    // Retry temporary Gemini failures
    const result = await generateWithRetry(model, prompt);

    let responseText = result.response.text();

    // Remove markdown code fences if Gemini adds them
    responseText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let aiResponse;

    try {
      aiResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Gemini returned invalid JSON:", responseText);

      return res.status(502).json({
        message: "AI returned an invalid response. Please try again.",
      });
    }

    // Validate the AI response
    if (
      typeof aiResponse.matchScore !== "number" ||
      !Array.isArray(aiResponse.missingKeywords) ||
      typeof aiResponse.feedback !== "string"
    ) {
      return res.status(502).json({
        message: "AI returned an unexpected response. Please try again.",
      });
    }

    application.matchScore = aiResponse.matchScore;
    await application.save();

    return res.json({
      matchScore: aiResponse.matchScore,
      missingKeywords: aiResponse.missingKeywords,
      feedback: aiResponse.feedback,
    });
  } catch (error) {
    console.error("AI Resume Match Error:", error);

    const status = error?.status;

    if (status === 503 || error?.message?.includes("503")) {
      return res.status(503).json({
        message:
          "Gemini is temporarily unavailable due to high demand. Please try again in a moment.",
      });
    }

    if (status === 429) {
      return res.status(429).json({
        message:
          "Gemini request limit reached. Please wait a moment and try again.",
      });
    }

    return res.status(500).json({
      message: error.message || "Failed to analyze resume",
    });
  } finally {
    // Always remove uploaded resume, even when Gemini fails
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
      } catch (fileError) {
        console.error("Failed to delete uploaded resume:", fileError);
      }
    }
  }
};