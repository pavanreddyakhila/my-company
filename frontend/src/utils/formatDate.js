// src/utils/formatDate.js
export const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", { hour12: true });
};
