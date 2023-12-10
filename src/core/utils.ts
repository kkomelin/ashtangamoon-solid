import { format } from 'date-fns'

export const currentDate = (): string => {
  return format(new Date(), 'd MMM yyyy')
}
