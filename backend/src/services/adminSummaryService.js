import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generate AI summary for admin dashboard
 * Gemini is OPTIONAL – fallback always works
 */
export async function generateAdminSummary(complaints) {
  if (!complaints || complaints.length === 0) {
    return "No complaints available for analysis.";
  }

  // 🔁 FALLBACK SUMMARY (ALWAYS WORKS)
  const high = complaints.filter(c => c.severity === "High").length;
  const medium = complaints.filter(c => c.severity === "Medium").length;
  const low = complaints.filter(c => c.severity === "Low").length;

  const fallbackSummary = `
Total Complaints: ${complaints.length}
High Severity: ${high}
Medium Severity: ${medium}
Low Severity: ${low}

Immediate attention required for high severity issues.
`;

  // 🚫 If Gemini key not present → use fallback
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ Gemini API key missing. Using fallback summary.");
    return fallbackSummary;
  }

  // 🤖 GEMINI AI PATH
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use "gemini-1.5-flash" for speed/efficiency 
    // or "gemini-1.5-pro" for complex reasoning
    const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash" 
  });

    const issuesText = complaints.slice(0, 10).map((c, i) => `
${i + 1}. ${c.issueType}
Severity: ${c.severity}
Location: ${c.location?.address}
Description: ${c.description}
`).join("\n");

    const prompt = `
You are an AI assisting city administrators.

Analyze these civic complaints and provide:
1. Overall situation summary
2. Major risk areas
3. Suggested actions

Complaints:
${issuesText}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.error("❌ Gemini failed. Using fallback.", error);
    return fallbackSummary;
  }
}
