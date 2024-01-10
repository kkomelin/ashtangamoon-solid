import * as admin from 'firebase-admin'
import * as logger from 'firebase-functions/logger'
import {
  onDocumentCreated,
  onDocumentDeleted,
} from 'firebase-functions/v2/firestore'

const TOPIC = 'fullNewMoonNotifications'

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
    } catch (e) {
      logger.error('Could not subscribe to the topic', { token, topic: TOPIC })
    }
  }
)

export const unsubscribeToTopic = onDocumentDeleted(
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
    } catch (e) {
      logger.error('Could not unsubscribe from the topic', {
        token,
        topic: TOPIC,
      })
    }
  }
)
