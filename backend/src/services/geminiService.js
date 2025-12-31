import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCivicIssue = async (imagePath) => {
  const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

  const imageBuffer = fs.readFileSync(imagePath);

  const prompt = `
You are a smart city AI assistant.

Analyze the given image of a civic issue and return:
1. Issue Type (e.g. pothole, garbage, water leakage, streetlight, road damage)
2. Severity level (Low, Medium, High)
3. Short explanation (1–2 lines)

Respond strictly in JSON format like:
{
  "issueType": "",
  "severity": "",
  "summary": ""
}
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpeg",
      },
    },
  ]);

  const responseText = result.response.text();
  return JSON.parse(responseText);
};
