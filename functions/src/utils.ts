import { differenceInHours, isDate } from 'date-fns'
import { phase_hunt } from 'lune'
import { TIME_RANGE_LEFT, TIME_RANGE_RIGHT } from './config'

export const getMoonPhases = () => {
  const { nextnew_date, new_date, full_date } = phase_hunt()

  return {
    newMoon: new_date as Date,
    fullMoon: full_date as Date,
    nextNewMoon: nextnew_date as Date,
  }
}

export const isMoonDayClose = (moonDate: Date) => {
  if (!moonDate || !isDate(moonDate)) {
    return false
  }

  const diffHours = differenceInHours(moonDate, new Date())

  return diffHours > TIME_RANGE_LEFT && diffHours <= TIME_RANGE_RIGHT
}
