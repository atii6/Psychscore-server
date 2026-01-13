import path from "path";
import models from "../models/index.js";
import { extractTextFromFile } from "../utils/extractTextFromFile.js";
import { cleanText } from "../utils/cleanText.js";
import { parseWithLLM } from "../utils/llmService.js";

export const extractDataInline = async (uploadId) => {
  const upload = await models.Upload.findByPk(uploadId);
  if (!upload) throw new Error("Upload record not found");

  const absolutePath = path.isAbsolute(upload.path)
    ? upload.path
    : path.join(process.cwd(), upload.path);
  if (!absolutePath) throw new Error("File not found");

  const rawText = await extractTextFromFile(absolutePath);
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
                  scaled_score: { type: "number" },
                  composite_score: { type: "number" },
                  percentile_rank: { type: "number" },
                  descriptor: { type: "string" },
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

  console.log("cleanText==>", cleanedText);
  const parsedData = await parseWithLLM({
    text: cleanedText,
    jsonSchema: extractionSchema,
  });

  console.log("cleanText==>1", parsedData);

  await upload.update({
    raw_text: cleanedText,
    extracted_json: parsedData,
    status: "done",
  });

  if (!parsedData?.tests) {
    console.warn("LLM returned invalid structure", parsedData);
  }

  return {
    status: "success",
    tests: Array.isArray(parsedData?.tests) ? parsedData.tests : [],
    raw_llm_outputs: parsedData.raw_llm_outputs || [],
  };
};
