import { differenceInHours, isDate } from 'date-fns'
import { phase_hunt } from 'lune'
import { EMoonPhase } from './types/EMoonPhase'
import { IMessage } from './types/IMessage'

export const getMoonPhases = () => {
  const { nextnew_date, new_date, full_date } = phase_hunt()

  return {
    newMoon: new_date as Date,
    fullMoon: full_date as Date,
    nextNewMoon: nextnew_date as Date,
  }
}

export const isMoonDayClose = (moonDate: Date) => {
  if (moonDate == null || !isDate(moonDate)) {
    return false
  }

  const diffHours = differenceInHours(moonDate, new Date())

  return diffHours > 6 && diffHours <= 36
}

export const createMessage = async (firestore: any, moonPhase: EMoonPhase) => {
  const messageDoc: IMessage = {
    message: generateMessage(moonPhase),
  }

  await firestore.collection('messages').add(messageDoc)
}

const generateMessage = (moonPhase: EMoonPhase) => {
  return moonPhase + ' moon is coming'
}
