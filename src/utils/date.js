export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
