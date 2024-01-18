import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../config'
import { error } from '../utils/toasts'
import auth from './auth/init'
import firestore from './firestore/init'
import {
  isTokenRegistered,
  registerToken,
  unregisterToken,
} from './firestore/tokens'
import messaging from './messaging/init'

export async function subscribeToTopic() {
  const userErrorMessage =
    'Cannot subscribe at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    })

    if (currentToken) {
      return await registerToken(
        auth,
        firestore,
        currentToken,
        userErrorMessage
      )
    } else {
      error(
        'No registration token available. Request permission to generate one.',
        userErrorMessage
      )
      return false
    }
  } catch (e) {
    error(e, userErrorMessage)
    return false
  }
}

export async function unsubscribeFromTopic() {
  const userErrorMessage =
    'Cannot unsubscribe at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    })

    if (currentToken) {
      return await unregisterToken(firestore, currentToken, userErrorMessage)
    } else {
      error(
        'No registration token available. Request permission to generate one.',
        userErrorMessage
      )
      return false
    }
  } catch (e) {
    error(e, userErrorMessage)
    return false
  }
}

export async function isSubscribed() {
  const userErrorMessage =
    'Cannot check the subscription at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    })

    if (currentToken) {
      return await isTokenRegistered(firestore, currentToken, userErrorMessage)
    } else {
      error(
        'No registration token available. Request permission to generate one.',
        userErrorMessage
      )
      return false
    }
  } catch (e) {
    error(e, userErrorMessage)
    return false
  }
}
