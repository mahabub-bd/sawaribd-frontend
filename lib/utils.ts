import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DateRangeFilterType =
  | "all"
  | "today"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "lastSixMonths"

/**
 * Returns the date range for a given filter type
 * @param filter The date range filter type
 * @returns An array with start and end dates, or null if filter is "all"
 */
export function getDateFilterRange(filter: DateRangeFilterType): [Date, Date] | null {
  const today = new Date()

  // Set time to start of day (00:00:00)
  const startOfToday = new Date(today)
  startOfToday.setHours(0, 0, 0, 0)

  // Set time to end of day (23:59:59.999)
  const endOfToday = new Date(today)
  endOfToday.setHours(23, 59, 59, 999)

  // Calculate start of week (Monday)
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1),
  )
  startOfWeek.setHours(0, 0, 0, 0)

  // Calculate start of month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Calculate start of year
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  startOfYear.setHours(0, 0, 0, 0)

  // Calculate start of last month
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  startOfLastMonth.setHours(0, 0, 0, 0)

  // Calculate end of last month
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
  endOfLastMonth.setHours(23, 59, 59, 999)

  // Calculate start of last year
  const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1)
  startOfLastYear.setHours(0, 0, 0, 0)

  // Calculate end of last year
  const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31)
  endOfLastYear.setHours(23, 59, 59, 999)

  // Calculate start of last week
  const startOfLastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 6 + (today.getDay() === 0 ? -6 : 1),
  )
  startOfLastWeek.setHours(0, 0, 0, 0)

  // Calculate end of last week
  const endOfLastWeek = new Date(
    startOfLastWeek.getFullYear(),
    startOfLastWeek.getMonth(),
    startOfLastWeek.getDate() + 6,
  )
  endOfLastWeek.setHours(23, 59, 59, 999)

  // Calculate six months ago
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate())
  sixMonthsAgo.setHours(0, 0, 0, 0)

  switch (filter) {
    case "today":
      return [startOfToday, endOfToday]
    case "thisWeek":
      return [startOfWeek, endOfToday]
    case "lastWeek":
      return [startOfLastWeek, endOfLastWeek]
    case "thisMonth":
      return [startOfMonth, endOfToday]
    case "lastMonth":
      return [startOfLastMonth, endOfLastMonth]
    case "thisYear":
      return [startOfYear, endOfToday]
    case "lastYear":
      return [startOfLastYear, endOfLastYear]
    case "lastSixMonths":
      return [sixMonthsAgo, endOfToday]
    default:
      return null
  }
}
