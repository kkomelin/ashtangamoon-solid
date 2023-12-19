import { format } from 'date-fns'

export const currentDateFormatted = (): string => {
  return format(new Date(), 'd MMM yyyy')
}

export const formatMoonDate = (date: Date): string => {
  return format(date, 'MMM, d - HH:mm')
}
