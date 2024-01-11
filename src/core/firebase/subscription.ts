import {
  DocumentSnapshot,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../config'
import { error, success } from '../utils/toasts'
import auth from './auth/init'
import firestore from './firestore/init'
import messaging from './messaging/init'

export function subscribeToTopic() {
  const userErrorMessage =
    'Cannot subscribe at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  return getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return setDoc(doc(firestore, 'fcmTokens', currentToken), {
          uid: auth.currentUser?.uid,
        })
          .then(() => {
            success('Subscribed successfully')
            return true
          })
          .catch((e: any) => {
            error(e, userErrorMessage)
            return false
          })
      } else {
        error(
          'No registration token available. Request permission to generate one.',
          userErrorMessage
        )
        return false
      }
    })
    .catch((err) => {
      error(err, userErrorMessage)
      return false
    })
}

export function unsubscribeFromTopic() {
  const userErrorMessage =
    'Cannot unsubscribe at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  return getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return deleteDoc(doc(firestore, 'fcmTokens', currentToken))
          .then(() => {
            success('Unsubscribed successfully')
            return true
          })
          .catch((e: any) => {
            error(e, userErrorMessage)
            return false
          })
      } else {
        error(
          'No registration token available. Request permission to generate one.',
          userErrorMessage
        )
        return false
      }
    })
    .catch((err) => {
      error(err, userErrorMessage)
      return false
    })
}

export function isSubscribed() {
  const userErrorMessage =
    'Cannot check the subscription at the moment. Please try again later.'

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  return getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return getDoc(doc(firestore, 'fcmTokens', currentToken))
          .then((docSnap: DocumentSnapshot) => {
            return docSnap.exists()
          })
          .catch((e: any) => {
            error(e, userErrorMessage)
            return false
          })
      } else {
        error(
          'No registration token available. Request permission to generate one.',
          userErrorMessage
        )
        return false
      }
    })
    .catch((err) => {
      error(err, userErrorMessage)
      return false
    })
}
