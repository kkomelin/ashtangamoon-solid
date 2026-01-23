import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../../config/keys'
import { error } from '../utils/toasts'
import auth from './auth/init'
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
    const currentToken = await requestToken()

    if (currentToken) {
      return await registerToken(
        auth.currentUser?.uid,
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
    const currentToken = await requestToken()

    if (currentToken) {
      return await unregisterToken(currentToken, userErrorMessage)
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
    const currentToken = await requestToken()

    if (currentToken) {
      return await isTokenRegistered(currentToken, userErrorMessage)
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

export async function requestToken() {
  // FCM doesn't work with Firebase emulators - skip in dev mode
  if (import.meta.env.VITE_EMULATE === 'true') {
    console.warn('FCM is disabled in emulator mode')
    return null
  }

  return await getToken(messaging, {
    vapidKey: PUBLIC_VAPID_KEY,
  })
}
