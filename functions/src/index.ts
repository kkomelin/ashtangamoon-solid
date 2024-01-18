import { isDate } from 'date-fns'
import * as admin from 'firebase-admin'
import * as logger from 'firebase-functions/logger'
import {
  onDocumentCreated,
  onDocumentDeleted,
} from 'firebase-functions/v2/firestore'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { EMoonPhase } from './types/EMoonPhase'
import { IMessage } from './types/IMessage'
import { createMessage, getMoonPhases, isMoonDayClose } from './utils'

const TOPIC = 'fullNewMoonNotifications'

admin.initializeApp()

export const subscribeToTopic = onDocumentCreated(
  'fcmTokens/{token}',
  async (event) => {
    const token = event.params.token

    try {
      const response = await admin.messaging().subscribeToTopic(token, TOPIC)
      if (response.failureCount > 0) {
        response.errors.forEach((error) =>
          logger.error(
            'An error has occurred during subscribing to the topic',
            error
          )
        )
        return
      }

      logger.log('A token has been subscribed to the topic successfully', {
        token,
        topic: TOPIC,
      })
    } catch (e) {
      logger.error(e, {
        token,
        topic: TOPIC,
      })
    }
  }
)

export const unsubscribeFromTopic = onDocumentDeleted(
  'fcmTokens/{token}',
  async (event) => {
    const token = event.params.token

    try {
      const response = await admin
        .messaging()
        .unsubscribeFromTopic(token, TOPIC)
      if (response.failureCount > 0) {
        response.errors.forEach((error) =>
          logger.error(
            'An error has occurred during unsubscribing from the topic',
            error
          )
        )
        return
      }

      logger.log('A token has been unsubscribed from the topic successfully', {
        token,
        topic: TOPIC,
      })
    } catch (e) {
      logger.error(e, {
        token,
        topic: TOPIC,
      })
    }
  }
)

export const calculateMoonPhases = onSchedule(
  'every day 00:00',
  async (event) => {
    const { newMoon, fullMoon, nextNewMoon } = getMoonPhases()

    const firestore = admin.firestore()

    if (
      (newMoon != null && isDate(newMoon) && isMoonDayClose(newMoon)) ||
      (nextNewMoon != null &&
        isDate(nextNewMoon) &&
        isMoonDayClose(nextNewMoon))
    ) {
      await createMessage(firestore, EMoonPhase.NEW)
    } else if (
      fullMoon != null &&
      isDate(fullMoon) &&
      isMoonDayClose(fullMoon)
    ) {
      await createMessage(firestore, EMoonPhase.FULL)
    }

    logger.log('A message has been created successfully')
  }
)

export const sendMessagesToTopic = onDocumentCreated(
  'messages/{messageId}',
  async (event) => {
    const snapshot = event.data
    if (snapshot == null) {
      logger.error('No date is associated with the event')
      return
    }

    const message = snapshot.data() as IMessage

    const payload = {
      notification: {
        title: 'Ashtanga Moon',
        body: message.message,
      },
    }

    await admin.messaging().sendToTopic(TOPIC, payload)

    logger.log('A message has been sent successfully')
  }
)
