export function formatDate(date) {
  const d = new Date(date);  // Ensure it's a Date object
  if (isNaN(d)) return "Invalid Date";  // Optional: handle bad values
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
