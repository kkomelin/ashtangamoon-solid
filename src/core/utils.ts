import { format } from 'date-fns'

export const currentDate = (): string => {
  return format(new Date(), 'd MMM yyyy')
}

export const formatMoonDate = (date: Date): string => {
  return format(date, 'MMM, d - HH:mm')
}
