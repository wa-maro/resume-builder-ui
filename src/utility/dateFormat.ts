export const toDDMMYYYY = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const toYYYDDMM = (dateStr?: string): string => {
  if (!dateStr || !dateStr.includes("/")) return ""; // fallback
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};
