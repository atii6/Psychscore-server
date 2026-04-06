import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Missing OpenAI API key. Please set OPENAI_API_KEY in your .env",
  );
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── 1. AUTO-DETECT TEST TYPE ────────────────────────────────────────────────

export const detectTestType = (text) => {
  const t = text.toUpperCase();
  if (
    t.includes("WAIS-5") ||
    t.includes("WAIS®-5") ||
    (t.includes("WECHSLER ADULT INTELLIGENCE SCALE") && t.includes("FIFTH"))
  )
    return "WAIS-5";
  if (
    t.includes("WMS-IV") ||
    t.includes("WMS®-IV") ||
    t.includes("WECHSLER MEMORY SCALE")
  )
    return "WMS-IV";
  if (
    t.includes("CVLT-3") ||
    t.includes("CVLT® 3") ||
    (t.includes("CALIFORNIA VERBAL LEARNING TEST") && t.includes("THIRD"))
  )
    return "CVLT-3";
  if (
    t.includes("CVLT-II") ||
    t.includes("CVLT®-II") ||
    (t.includes("CALIFORNIA VERBAL LEARNING TEST") && t.includes("SECOND"))
  )
    return "CVLT-II";
  if (t.includes("WISC-V") || t.includes("WISC®-V")) return "WISC-V";
  if (t.includes("BASC") || t.includes("BEHAVIOR ASSESSMENT SYSTEM"))
    return "BASC";
  if (t.includes("CONNERS")) return "CONNERS";
  // Add more as needed
  return "UNKNOWN";
};

// ─── 2. TEST-SPECIFIC PROMPTS ─────────────────────────────────────────────────

const PROMPTS = {
  "WMS-IV": (chunk, schema) => `
You are extracting data from a WMS-IV (Wechsler Memory Scale-Fourth Edition) score report.

EXTRACT ONLY from the table titled "Primary Subtest Scaled Score Summary".
DO NOT extract from Process Score, Raw Score, or any other table.

TABLE COLUMN ORDER (left to right):
  Subtest | Domain | Raw Score | Scaled Score | Percentile Rank

EXAMPLE ROW:
  "Logical Memory I AM 23 9 37"
   → subtest_name: "Logical Memory I"
   → (skip domain "AM")
   → (skip raw score 23)
   → scaled_score: 9        ← 4th column
   → percentile_rank: 37    ← 5th column
   → composite_score: null
   → descriptor: null

EXAMPLE ROW:
  "Designs I VM 42 3 1"
   → subtest_name: "Designs I"
   → scaled_score: 3
   → percentile_rank: 1

RULES:
- scaled_score is ALWAYS the 4th number group (after subtest name, domain abbreviation, raw score)
- NEVER use raw score as scaled_score
- Use test_name: "WMS-IV"
- Return ONLY valid JSON matching the schema

Schema: ${JSON.stringify(schema, null, 2)}
Text: ${chunk}
`,

  "CVLT-3": (chunk, schema) => `
You are extracting data from a CVLT-3 (California Verbal Learning Test, Third Edition) score report.

EXTRACT FROM THESE SECTIONS (all of them):
1. "Immediate Recall" — Trial 1 Correct, Trial 2 Correct, Trial 3 Correct, Trial 4 Correct
2. "Delayed Recall" — Short Delay Free Recall Correct, Long Delay Free Recall Correct, Long Delay Cued Recall Correct
3. "Yes/No Recognition" — Total Hits, Total False Positives, Recognition Discriminability (d'), Recognition Discriminability Nonparametric
4. "Recall Errors" — Total Intrusions
5. "Standard Score Summary" (index-level) — Trials 1–4 Correct, Delayed Recall Correct, Total Recall Correct

TABLE COLUMN ORDER for sections 1–4 (left to right):
  Score Name | Raw score | Scaled score | Percentile rank

EXAMPLE ROW (Immediate Recall):
  "Trial 1 Correct 7 13 84"
   → subtest_name: "Trial 1 Correct"
   → (skip raw score 7)
   → scaled_score: 13       ← 3rd column
   → percentile_rank: 84    ← 4th column
   → composite_score: null
   → descriptor: null

EXAMPLE ROW (Delayed Recall):
  "Short Delay Free Recall Correct 7 8 25"
   → subtest_name: "Short Delay Free Recall Correct"
   → scaled_score: 8
   → percentile_rank: 25

TABLE COLUMN ORDER for section 5 - Standard Score Summary (left to right):
  Index Name | Sum of scaled scores | Index score | Percentile rank

EXAMPLE ROW (Standard Score Summary):
  "Trials 1–4 Correct 43 105 63"
   → subtest_name: "Trials 1–4 Correct"
   → (skip sum of scaled scores 43)
   → composite_score: 105   ← 3rd column (this is the Index Score, NOT scaled score)
   → percentile_rank: 63    ← 4th column
   → scaled_score: null
   → descriptor: null

RULES:
- For sections 1–4: scaled_score = 3rd number, percentile_rank = 4th number
- For section 5: composite_score = 3rd number, scaled_score = null
- NEVER use raw score as scaled_score
- Use test_name: "CVLT-3"
- Return ONLY valid JSON matching the schema

Schema: ${JSON.stringify(schema, null, 2)}
Text: ${chunk}
`,

  "WAIS-5": (chunk, schema) => `
You are extracting data from a WAIS-5 (Wechsler Adult Intelligence Scale, Fifth Edition) score report.

EXTRACT FROM TWO TABLES:

━━━ TABLE 1: "Subtest Score Summary" ━━━
COLUMN ORDER (left to right):
  Domain | Subtest Name | Abbreviation | Total Raw Score | Scaled Score | Percentile Rank | Ref. Group Scaled Score | SEM

EXAMPLE ROW:
  "Verbal Similarities SI 19 7 16 7 1.20"
   → subtest_name: "Similarities"
   → (skip domain "Verbal", skip abbreviation "SI", skip raw score 19)
   → scaled_score: 7        ← 5th column (first number after raw score)
   → percentile_rank: 16    ← 6th column
   → composite_score: null
   → descriptor: null

EXAMPLE ROW:
  "Comprehension Vocabulary VC 10 4 2 4 1.04"
   → subtest_name: "Vocabulary"
   → scaled_score: 4
   → percentile_rank: 2

EXAMPLE ROW:
   " (information) IN 9 7 16 7 0.99"
   → subtest_name: "Information"
   → scaled_score: 7
   → percentile_rank: 16

CRITICAL: The 7th column (Ref. Group Scaled Score) is NOT the scaled_score. 
Always use the 5th column (first number after raw score) as scaled_score.
Skip rows where Scaled Score is "-" or missing.
Secondary subtests (in parentheses) that have "-" values should be skipped.

━━━ TABLE 2: "Composite Score Summary" ━━━
COLUMN ORDER (left to right):
  Composite Name | Abbreviation | Sum of Scaled Scores | Composite Score | Percentile Rank | 95% CI | Qualitative Description | SEM

EXAMPLE ROW:
  "Verbal Comprehension VCI 11 76 5 70-85 Very low 4.24"
   → subtest_name: "Verbal Comprehension"
   → (skip abbreviation "VCI", skip sum 11)
   → composite_score: 76    ← 4th column
   → percentile_rank: 5     ← 5th column
   → descriptor: "Very low" ← 7th column
   → scaled_score: null

EXAMPLE ROW:
  "Full Scale FSIQ 55 85 16 81-90 Below average 2.60"
   → subtest_name: "Full Scale FSIQ"
   → composite_score: 85
   → percentile_rank: 16
   → descriptor: "Below average"

Skip composite rows where Composite Score is "-".

RULES:
- Subtest table → use scaled_score, leave composite_score null
- Composite table → use composite_score + descriptor, leave scaled_score null
- NEVER confuse Ref. Group Scaled Score with Scaled Score
- Use test_name: "WAIS-5"
- Return ONLY valid JSON matching the schema

Schema: ${JSON.stringify(schema, null, 2)}
Text: ${chunk}
`,

  // ── Fallback for unknown tests ──────────────────────────────────────────────
  UNKNOWN: (chunk, schema) => `
You are extracting structured data from a psychological test score report.

Extract all subtests/scores you can find. For each row in any score table:
- subtest_name: the name of the score/subtest
- scaled_score: the scaled score (NOT raw score)
- composite_score: composite or index score if present
- percentile_rank: percentile rank
- descriptor: qualitative label if present (e.g. "Average", "Below average")

IMPORTANT: Raw scores are always the FIRST number after the subtest name.
Scaled scores come AFTER raw scores. Never use a raw score as a scaled score.

Schema: ${JSON.stringify(schema, null, 2)}
Text: ${chunk}
`,
};

// Get prompt builder for detected test, fallback to UNKNOWN
const getPrompt = (testType) => PROMPTS[testType] || PROMPTS["UNKNOWN"];

// ─── 3. MAIN EXPORT ───────────────────────────────────────────────────────────

export const parseWithLLM = async ({ text, jsonSchema }) => {
  const MAX_CHUNK = 30000;

  // Detect test type from full text BEFORE chunking
  const testType = detectTestType(text);
  console.log(`📋 Detected test type: ${testType}`);

  const promptBuilder = getPrompt(testType);

  // Chunk the text
  const chunks = [];
  for (let i = 0; i < text.length; i += MAX_CHUNK) {
    chunks.push(text.slice(i, i + MAX_CHUNK));
  }

  const allTests = {}; // keyed by test_name for deduplication

  for (const chunk of chunks) {
    try {
      const resp = await client.chat.completions.create({
        model: "gpt-4o", // Use gpt-4o not gpt-4o-mini for better table parsing
        messages: [
          {
            role: "system",
            content:
              "You are a precise psychological test data extractor. Follow column order instructions exactly. Return only valid JSON.",
          },
          {
            role: "user",
            content: promptBuilder(chunk, jsonSchema),
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "extraction_schema",
            schema: jsonSchema,
            strict: true,
          },
        },
      });

      const content = resp.choices?.[0]?.message?.content;
      if (!content) continue;

      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed?.tests)) continue;

      // Merge by test_name (handles chunking splits)
      for (const test of parsed.tests) {
        if (!test.test_name || !Array.isArray(test.scores)) continue;

        if (!allTests[test.test_name]) {
          allTests[test.test_name] = { test_name: test.test_name, scores: [] };
        }

        // Deduplicate scores by subtest_name
        const existingNames = new Set(
          allTests[test.test_name].scores.map((s) => s.subtest_name),
        );
        for (const score of test.scores) {
          if (score.subtest_name && !existingNames.has(score.subtest_name)) {
            allTests[test.test_name].scores.push(score);
            existingNames.add(score.subtest_name);
          }
        }
      }
    } catch (err) {
      console.error("LLM chunk parsing error:", err.message);
    }
  }

  return {
    tests: Object.values(allTests),
    detected_test_type: testType,
  };
};
