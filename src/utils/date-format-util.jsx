// "2025-03-04T00:00:00.000Z"

export const dateFormat = (isoDate, format = "DD-MM-YYYY") => {
    if (!isoDate) return "";
  
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
  
    if (format === "DD-MM-YYYY") return `${day}-${month}-${year}`;
    if (format === "YYYY-MM-DD") return `${year}-${month}-${day}`;
    if (format === "MM-DD-YYYY") return `${month}-${day}-${year}`;
  
    return `${day}-${month}-${year}`; // Default to DD-MM-YYYY
  };
  