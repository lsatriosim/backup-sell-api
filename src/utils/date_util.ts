import { formatInTimeZone } from "date-fns-tz";

export function getDayRangeInZone(date: Date, timeZone: string) {
  // Format the "date" into YYYY-MM-DD in the given timezone
  const localDateStr = formatInTimeZone(date, timeZone, "yyyy-MM-dd");

  // Parse start of day and end of day in that zone
  const startOfDayLocal = new Date(`${localDateStr}T00:00:00.000${offsetForZone(timeZone, date)}`);
  const endOfDayLocal = new Date(`${localDateStr}T23:59:59.999${offsetForZone(timeZone, date)}`);

  return {
    start: startOfDayLocal.toISOString(), // back to UTC
    end: endOfDayLocal.toISOString(),
  };
}

// helper: get the zone offset string like "+07:00"
export function offsetForZone(timeZone: string, date: Date): string {
  const offsetMinutes = -1 * new Date(formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX")).getTimezoneOffset();
  const hours = Math.floor(Math.abs(offsetMinutes) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (Math.abs(offsetMinutes) % 60).toString().padStart(2, "0");
  return `${offsetMinutes >= 0 ? "+" : "-"}${hours}:${minutes}`;
}
