import { GoogleGenerativeAI } from "@google/generative-ai";
import parseResume from "../utils/parseResume.js";
import Application from "../models/Application.js";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route  POST /api/ai/match/:applicationId
// @desc   Upload resume, compare with job description, save match score
export const matchResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const { applicationId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume PDF" });
    }
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const resumeText = await parseResume(req.file.path);

    const prompt = `
You are an ATS (Applicant Tracking System) resume screener.
Compare the RESUME below with the JOB DESCRIPTION.
Return ONLY valid JSON in this exact format, nothing else, no markdown code blocks:
{ "matchScore": <number 0-100>, "missingKeywords": ["...", "..."], "feedback": "short 2-line feedback" }

RESUME:
${resumeText.slice(0, 3000)}

JOB DESCRIPTION:
${jobDescription}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Gemini sometimes wraps JSON in ```json ... ``` — strip that out
    responseText = responseText.replace(/```json|```/g, "").trim();

    const aiResponse = JSON.parse(responseText);

    application.matchScore = aiResponse.matchScore;
    await application.save();

    fs.unlinkSync(req.file.path);

    res.json({
      matchScore: aiResponse.matchScore,
      missingKeywords: aiResponse.missingKeywords,
      feedback: aiResponse.feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};