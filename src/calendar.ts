/**
 * ACN (Après Chuck Norris) Calendar System
 *
 * A custom 13-month lunar calendar where:
 * - Epoch: March 20, 2025 (the day after Chuck Norris' symbolic passing)
 * - 13 months of 28 days each = 364 days per year
 * - Plus 1-2 "Jour(s) de Chuck" sacred days between years
 */

export interface ACNDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  isChuckDay: boolean;
  chuckDayNumber?: number;
}

/** March 20, 2025 — Day 1 of Year 1 ACN */
const ACN_EPOCH = new Date(2025, 2, 20); // Month is 0-indexed: 2 = March

export const ACN_MONTH_NAMES: string[] = [
  'Norrisendre',
  'Févriaire',
  'Marsial',
  'Avrilanche',
  'Maistral',
  'Juingler',
  'Juillecoup',
  'Aoûtlaw',
  'Septembare',
  'Octobrave',
  'Novembrise',
  'Décembrase',
  'Chuckicendre',
];

const DAYS_PER_MONTH = 28;
const MONTHS_PER_YEAR = 13;
const REGULAR_DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 364

/**
 * Check if a Gregorian year is a leap year.
 */
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the number of days between two dates (date2 - date1), ignoring time.
 * Returns a positive number if date2 > date1.
 */
function daysBetween(date1: Date, date2: Date): number {
  const d1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
}

/**
 * Add days to a date, returning a new Date.
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get the start date (Gregorian) of a given ACN year.
 * Year 1 starts at ACN_EPOCH. Each subsequent year starts after
 * 364 regular days + Jour(s) de Chuck of the previous year.
 */
function getYearStart(acnYear: number): Date {
  let start = new Date(ACN_EPOCH.getTime());
  for (let y = 1; y < acnYear; y++) {
    const chuckDays = getChuckDaysCount(y);
    start = addDays(start, REGULAR_DAYS_PER_YEAR + chuckDays);
  }
  return start;
}

/**
 * Returns how many Jours de Chuck there are for a given ACN year (1 or 2).
 *
 * The Jour(s) de Chuck fall after day 364 of the ACN year. We check whether
 * the Gregorian year containing the end of this ACN year is a leap year.
 * Since each ACN year starts around March 20, the 364th day falls around
 * March 18 of the following Gregorian year. So we check that following
 * Gregorian year for a leap year (i.e., whether it has a Feb 29).
 */
export function getChuckDaysCount(year: number): number {
  // Compute the start of this ACN year
  // For year 1, start = ACN_EPOCH (March 20, 2025)
  // The 364th day (last regular day) is start + 363 days
  // The Gregorian year of that day determines leap status

  let start = new Date(ACN_EPOCH.getTime());
  for (let y = 1; y < year; y++) {
    // We need to know chuck days for previous years to find this year's start
    // For previous years, compute their chuck days by finding their start
    // This is inherently iterative, but since getYearStart also iterates,
    // let's just compute inline to avoid infinite recursion
    const prevLastRegularDay = addDays(start, REGULAR_DAYS_PER_YEAR - 1);
    const prevGregorianYear = prevLastRegularDay.getFullYear();
    const prevChuckDays = isGregorianLeapYear(prevGregorianYear) ? 2 : 1;
    start = addDays(start, REGULAR_DAYS_PER_YEAR + prevChuckDays);
  }

  const lastRegularDay = addDays(start, REGULAR_DAYS_PER_YEAR - 1);
  const gregorianYear = lastRegularDay.getFullYear();
  return isGregorianLeapYear(gregorianYear) ? 2 : 1;
}

/**
 * Convert a Gregorian date to an ACN date.
 */
export function getACNDate(date: Date): ACNDate {
  const totalDays = daysBetween(ACN_EPOCH, date);

  if (totalDays < 0) {
    // Before the epoch — return year 0 as a fallback
    return {
      year: 0,
      month: 0,
      day: 0,
      monthName: '',
      isChuckDay: false,
    };
  }

  // Find which ACN year this date falls in
  let acnYear = 1;
  let yearStart = new Date(ACN_EPOCH.getTime());

  while (true) {
    const chuckDays = getChuckDaysCount(acnYear);
    const yearLength = REGULAR_DAYS_PER_YEAR + chuckDays;
    const dayInYear = daysBetween(yearStart, date);

    if (dayInYear < yearLength) {
      // This date is within this ACN year
      if (dayInYear < REGULAR_DAYS_PER_YEAR) {
        // Regular month day
        const month = Math.floor(dayInYear / DAYS_PER_MONTH) + 1;
        const day = (dayInYear % DAYS_PER_MONTH) + 1;
        return {
          year: acnYear,
          month,
          day,
          monthName: ACN_MONTH_NAMES[month - 1],
          isChuckDay: false,
        };
      } else {
        // Jour de Chuck
        const chuckDayNumber = dayInYear - REGULAR_DAYS_PER_YEAR + 1;
        return {
          year: acnYear,
          month: 0,
          day: chuckDayNumber,
          monthName: 'Jour de Chuck',
          isChuckDay: true,
          chuckDayNumber,
        };
      }
    }

    // Move to next year
    yearStart = addDays(yearStart, yearLength);
    acnYear++;
  }
}

/**
 * Returns all 28 days of a given month in a given ACN year,
 * each with its corresponding Gregorian date.
 */
export function getMonthDays(
  year: number,
  month: number
): { day: number; gregorianDate: Date }[] {
  const yearStart = getYearStart(year);
  const monthStart = addDays(yearStart, (month - 1) * DAYS_PER_MONTH);

  const days: { day: number; gregorianDate: Date }[] = [];
  for (let d = 0; d < DAYS_PER_MONTH; d++) {
    days.push({
      day: d + 1,
      gregorianDate: addDays(monthStart, d),
    });
  }
  return days;
}

/**
 * Convert an ACN date back to a Gregorian Date.
 * month=0 means Jour de Chuck (day=1 or 2).
 */
export function acnToGregorian(
  year: number,
  month: number,
  day: number
): Date {
  const yearStart = getYearStart(year);

  if (month === 0) {
    // Jour de Chuck: after the 364 regular days
    return addDays(yearStart, REGULAR_DAYS_PER_YEAR + (day - 1));
  }

  // Regular month day
  const dayOffset = (month - 1) * DAYS_PER_MONTH + (day - 1);
  return addDays(yearStart, dayOffset);
}

/**
 * Get today's date in the ACN calendar.
 */
export function getTodayACN(): ACNDate {
  return getACNDate(new Date());
}
