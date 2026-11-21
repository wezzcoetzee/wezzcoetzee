/** `YYYY-MM` when the month is known, `YYYY` when only the year is. */
export type ShipDate = `${number}-${number}` | `${number}`;

const MONTH = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });

/** "Oct 2026", or "2024" for a year-only date. */
export function formatShipDate(date: ShipDate) {
  const [year, month] = date.split('-');
  return month
    ? `${MONTH.format(new Date(Date.UTC(Number(year), Number(month) - 1)))} ${year}`
    : year;
}

/** Newest first. A year-only date sorts after the dated months of that year. */
export function newestFirst<T extends { date: ShipDate }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}
