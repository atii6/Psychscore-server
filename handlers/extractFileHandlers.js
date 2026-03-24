import path from "path";
import models from "../models/index.js";
import { extractTextFromFile } from "../utils/extractTextFromFile.js";
import { cleanText } from "../utils/cleanText.js";
import { parseWithLLM } from "../utils/llmService.js";
import { writeFileSync } from "fs";

export const extractDataInline = async (uploadId) => {
  const upload = await models.Upload.findByPk(uploadId);
  if (!upload) throw new Error("Upload record not found");

  const absolutePath = path.isAbsolute(upload.path)
    ? upload.path
    : path.join(process.cwd(), upload.path);
  if (!absolutePath) throw new Error("File not found");

  const rawText = await extractTextFromFile(absolutePath);

  if (!rawText || rawText.trim().length === 0) {
    throw new Error("No readable text found in file");
  }
  const cleanedText = cleanText(rawText);

  const extractionSchema = {
    type: "object",
    additionalProperties: false,
    properties: {
      tests: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            test_name: { type: "string" },
            scores: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  subtest_name: { type: "string" },
                  scaled_score: { type: ["number", "null"] },
                  composite_score: { type: ["number", "null"] },
                  percentile_rank: { type: ["number", "null"] },
                  descriptor: { type: ["string", "null"] },
                },
                required: [
                  "subtest_name",
                  "scaled_score",
                  "composite_score",
                  "percentile_rank",
                  "descriptor",
                ],
              },
            },
          },
          required: ["test_name", "scores"],
        },
      },
    },
    required: ["tests"],
  };

  let parsedData = { tests: [], raw_llm_outputs: [] };
  try {
    parsedData = await parseWithLLM({
      text: cleanedText,
      jsonSchema: extractionSchema,
    });
  } catch (error) {
    console.error("LLM extraction failed:", error);
  }

  const safeTests = Array.isArray(parsedData?.tests) ? parsedData.tests : [];

  // 5️⃣ Save results
  await upload.update({
    raw_text: cleanedText,
    extracted_json: parsedData,
    status: "done",
  });

  if (!safeTests.length) {
    console.warn("⚠️ No tests extracted from document");
  }

  return {
    status: "success",
    detected_test_type: parsedData.detected_test_type || "UNKNOWN",
    output: {
      tests: safeTests,
      raw_llm_outputs: parsedData.raw_llm_outputs || [],
    },
  };
};
