import { GoogleGenerativeAI } from "@google/generative-ai";
import Complaint from "../models/Complaint.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function findDuplicateGroup(
  title,
  description,
  lat,
  lng
) {
  // 1️⃣ Get nearby complaints (last 20)
  const nearby = await Complaint.find({
    "location.lat": { $gte: lat - 0.01, $lte: lat + 0.01 },
    "location.lng": { $gte: lng - 0.01, $lte: lng + 0.01 }
  })
    .sort({ createdAt: -1 })
    .limit(5);

  if (nearby.length === 0) return null;

  // 2️⃣ Prepare context for Gemini
  const context = nearby.map((c, i) => `
${i + 1}. Title: ${c.title}
Description: ${c.description}
`).join("\n");

  const prompt = `
You are a civic intelligence system.

NEW COMPLAINT:
Title: ${title}
Description: ${description}

EXISTING COMPLAINTS:
${context}

Question:
Is the new complaint essentially the SAME issue as any above?

Respond ONLY in JSON:
{
  "isDuplicate": true/false,
  "matchedIndex": number or null
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    if (parsed.isDuplicate && parsed.matchedIndex !== null) {
      return nearby[parsed.matchedIndex];
    }
  } catch {
    return null;
  }

  return null;
}
