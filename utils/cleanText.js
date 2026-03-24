export const cleanText = (raw) => {
  if (!raw) return "";
  let s = raw.replace(/\r\n/g, "\n");
  s = s.replace(/-\n\s*/g, "");
  s = s.replace(/\n{2,}/g, "\n\n");
  s = s.replace(/[ \t]{2,}/g, " ");
  return s.trim();
};

export const normalizeWaisTable = (text) => {
  const lines = text.split("\n");

  const cleaned = lines.map((line) => {
    // Match WAIS row pattern
    const match = line.match(
      /([A-Za-z ()]+)\s+([A-Z]{1,3})\s+(\d+)\s+(\d+)\s+(\d+)(?:\s+\d+)?(?:\s+[0-9.]+)?/,
    );

    if (match) {
      const [, name, code, raw, scaled, percentile] = match;

      return `${name.trim()} | RAW:${raw} | SCALED:${scaled} | PR:${percentile}`;
    }

    return line;
  });

  return cleaned.join("\n");
};
