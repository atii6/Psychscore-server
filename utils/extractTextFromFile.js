import fs from "fs";
import path from "path";
import * as pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";
import * as XLSX from "xlsx";
import { parse } from "csv-parse/sync";

export const extractTextFromFile = async (absolutePath) => {
  if (!fs.existsSync(absolutePath))
    throw new Error("File not found: " + absolutePath);
  const ext = path.extname(absolutePath).toLowerCase();

  switch (ext) {
    case ".pdf": {
      const buffer = fs.readFileSync(absolutePath);
      const data = await pdfParse(buffer);
      return data.text || "";
    }
    case ".png":
    case ".jpg":
    case ".jpeg": {
      const res = await Tesseract.recognize(absolutePath, "eng", {
        logger: () => {},
      });
      return res.data.text || "";
    }
    case ".csv": {
      const csvRaw = fs.readFileSync(absolutePath, "utf8");
      const rows = parse(csvRaw, { relax_column_count: true, trim: true });
      return rows.map((r) => r.join(" ")).join("\n");
    }
    case ".xlsx":
    case ".xls": {
      const workbook = XLSX.readFile(absolutePath);
      const sheets = workbook.SheetNames;
      const texts = sheets.map((name) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[name], {
          header: 1,
          raw: true,
        });
        return sheet.map((row) => row.join(" ")).join("\n");
      });
      return texts.join("\n\n");
    }
    default:
      throw new Error("Unsupported file type: " + ext);
  }
};
