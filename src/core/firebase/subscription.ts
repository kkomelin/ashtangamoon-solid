import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../config'
import { error, success } from '../utils/toasts'
import auth from './auth/init'
import firestore from './firestore/init'
import messaging from './messaging/init'

export function subscribeToTopic() {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // Save the token.
        setDoc(doc(firestore, 'fcmTokens', currentToken), {
          uid: auth.currentUser?.uid,
        })
          .then(() => {
            success('Subscribed successfully')
          })
          .catch((e: any) => {
            error(e, 'Cannot store the token.')
          })
      } else {
        // Show permission request UI
        console.warn(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err)
    })
}

export function unsubscribeFromTopic() {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // Save the token.

        deleteDoc(doc(firestore, 'fcmTokens', currentToken))
          .then(() => {
            success('Unsubscribed successfully')
          })
          .catch((e: any) => {
            error(e, 'Cannot store the token.')
          })
      } else {
        // Show permission request UI
        console.warn(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err)
    })
}
