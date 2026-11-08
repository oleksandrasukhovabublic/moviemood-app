// 8.6 → «8.6», 8 → «8.0», відсутня оцінка → «—»
export function formatRating(rating) {
  return Number.isFinite(Number(rating)) && rating !== null && rating !== ''
    ? Number(rating).toFixed(1)
    : '—';
}
