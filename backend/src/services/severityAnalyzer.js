import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeSeverity(title, description) {
  // fallback (never crash system)
  const fallback = {
    issueType: "General",
    severity: "Medium",
    reason: "Default severity fallback"
  };

  if (!process.env.GEMINI_API_KEY) return fallback;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `
You are an AI civic governance expert.

Classify the following civic issue:

Title: ${title}
Description: ${description}

Rules:
- HIGH: safety, health, accidents, public risk
- MEDIUM: inconvenience, service disruption
- LOW: minor issues

Respond ONLY in JSON:
{
  "issueType": "",
  "severity": "Low | Medium | High",
  "reason": ""
}
`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch {
    return fallback;
  }
}
