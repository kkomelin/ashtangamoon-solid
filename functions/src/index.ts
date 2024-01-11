import * as admin from 'firebase-admin'
import * as logger from 'firebase-functions/logger'
import {
  onDocumentCreated,
  onDocumentDeleted,
} from 'firebase-functions/v2/firestore'

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
