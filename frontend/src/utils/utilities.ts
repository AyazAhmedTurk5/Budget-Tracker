export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(today.getDate()).padStart(2, "0"); // Add leading zero
  return `${year}-${month}-${day}`; // yyyy-mm-dd
};

export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateToDisplay = (dateString: string): string => {
  const [day, month, year] = dateString.split("-").map(Number);

  if (!day || !month || !year) return "Invalid Date";

  const validDate = new Date(year, month - 1, day);

  return validDate.toLocaleDateString("en-GB").replace(/\//g, "-");
};

export const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split("-").map(Number);

  if (!day || !month || !year) return null;

  const validDate = new Date(year, month - 1, day);

  return validDate;
};
