export const setdateTime = (dateTime) => {
  const parsedTime = parseDate(dateTime);
  // Format date
  const formattedDate = parsedTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format time (local)
  const localTime = parsedTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate}    ${localTime}`;
};
export const parseDate = (val) => {
  if (typeof val !== "string") return new Date(val);

  // Sanitize milliseconds and force UTC with Z
  const fixed = val.replace(/(\.\d{3})\d+$/, "$1") + "Z";

  return new Date(fixed);
};
