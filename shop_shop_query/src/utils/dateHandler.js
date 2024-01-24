const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day + 1).setUTCHours(0, 0, 0, 0);
};
const parseDateAndTime = (dateString) => {
  const [datePart, timePart] = dateString.split("/");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};
module.exports = { parseDate, parseDateAndTime };
