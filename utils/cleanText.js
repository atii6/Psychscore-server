export const cleanText = (raw) => {
  if (!raw) return "";
  let s = raw.replace(/\r\n/g, "\n");
  s = s.replace(/-\n\s*/g, "");
  s = s.replace(/\n{2,}/g, "\n\n");
  s = s.replace(/[ \t]{2,}/g, " ");
  return s.trim();
};
