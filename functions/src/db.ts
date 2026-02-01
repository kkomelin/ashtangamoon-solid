import type { Firestore } from 'firebase-admin/firestore'
import { format, subHours } from 'date-fns'
import * as logger from 'firebase-functions/logger'
import { TIME_RANGE_RIGHT } from './config'
import { EMoonPhase } from './types/EMoonPhase'
import { IMessage } from './types/IMessage'

export const createMessageIfPossible = async (
  firestore: Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date,
  moonDate: Date
) => {
  const exists = await doesMessageExist(firestore, moonPhase, currentDate)
  if (exists) {
    return
  }

  await createMessage(firestore, moonPhase, currentDate, moonDate)
  logger.log(`A ${moonPhase} message has been created successfully`)
}

const createMessage = async (
  firestore: Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date,
  moonDate: Date
) => {
  const messageDoc: IMessage = {
    message: generateMessage(moonPhase, moonDate),
    createdAt: currentDate,
    type: moonPhase,
  }

  await firestore.collection('messages').add(messageDoc)
}

const doesMessageExist = async (
  firestore: Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date
) => {
  const snapshot = await firestore
    .collection('messages')
    .where('createdAt', '>=', subHours(currentDate, TIME_RANGE_RIGHT))
    .where('type', '==', moonPhase)
    .limit(1)
    .get()

  return !snapshot.empty
}

const generateMessage = (moonPhase: EMoonPhase, moonDate: Date) => {
  const formattedDate = format(moonDate, 'MMMM d, yyyy')
  return `${moonPhase} moon is approaching on ${formattedDate}`
}
