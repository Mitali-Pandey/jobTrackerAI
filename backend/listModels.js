import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const apiKey = process.env.GEMINI_API_KEY;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );
  const data = await res.json();

  console.log("Available models that support generateContent:\n");

  data.models?.forEach((m) => {
    if (m.supportedGenerationMethods?.includes("generateContent")) {
      console.log(m.name);
    }
  });
};

run();