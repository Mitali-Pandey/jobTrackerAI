import fs from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// Reads a PDF file from disk and extracts its raw text
const parseResume = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const loadingTask = getDocument({ data: new Uint8Array(dataBuffer) });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};

export default parseResume;