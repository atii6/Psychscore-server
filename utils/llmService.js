import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Missing OpenAI API key. Please set OPENAI_API_KEY in your .env"
  );
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const parseWithLLM = async ({ text, jsonSchema }) => {
  const MAX_CHUNK = 30000; // max chars per chunk
  const chunks = [];

  // Split text into chunks
  for (let i = 0; i < text.length; i += MAX_CHUNK) {
    chunks.push(text.slice(i, i + MAX_CHUNK));
  }

  const promptForChunk = (chunk) => `
You are a precise JSON extractor. Given the text below, extract data according to this JSON schema (send only valid JSON, don't add commentary):

Schema:
${JSON.stringify(jsonSchema, null, 2)}

Text:
${chunk}
  `;

  const combinedResults = [];

  for (const chunk of chunks) {
    try {
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You extract structured data as JSON according to a provided schema.",
          },
          { role: "user", content: promptForChunk(chunk) },
        ],
        max_tokens: 2000,
        temperature: 0,
      });

      const out = resp.choices?.[0]?.message?.content || "";
      combinedResults.push(out);
    } catch (err) {
      console.error("LLM chunk parsing error:", err);
      combinedResults.push("");
    }
  }

  for (const r of combinedResults) {
    try {
      const parsed = JSON.parse(r);
      return parsed;
    } catch (err) {}
  }

  return { raw_llm_outputs: combinedResults };
};
