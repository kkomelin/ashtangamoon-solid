import { subHours } from 'date-fns'
import * as logger from 'firebase-functions/logger'
import { TIME_RANGE_RIGHT } from './config'
import { EMoonPhase } from './types/EMoonPhase'
import { IMessage } from './types/IMessage'

export const createMessageIfPossible = async (
  firestore: FirebaseFirestore.Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date
) => {
  const exists = await doesMessageExist(firestore, moonPhase, currentDate)
  if (exists) {
    return
  }

  await createMessage(firestore, moonPhase, currentDate)
  logger.log(`A ${moonPhase} message has been created successfully`)
}

const createMessage = async (
  firestore: FirebaseFirestore.Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date
) => {
  const messageDoc: IMessage = {
    message: generateMessage(moonPhase),
    createdAt: currentDate,
    type: moonPhase,
  }

  await firestore.collection('messages').add(messageDoc)
}

const doesMessageExist = async (
  firestore: FirebaseFirestore.Firestore,
  moonPhase: EMoonPhase,
  currentDate: Date
) => {
  const snapshot = await firestore
    .collection('messages')
    .where('createdAt', '>=', subHours(currentDate, TIME_RANGE_RIGHT))
    .where('type', '==', moonPhase)
    .get()

  let exists = false

  snapshot.forEach((doc: FirebaseFirestore.DocumentData) => {
    exists = true
    return
  })

  return exists
}

const generateMessage = (moonPhase: EMoonPhase) => {
  return moonPhase + ' moon is coming'
}
