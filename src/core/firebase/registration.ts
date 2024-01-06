import { doc, setDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../config'
import { error } from '../utils/errors'
import auth from './auth/init'
import firestore from './firestore/init'
import messaging from './messaging/init'

export function getMessagingToken() {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // @todo Send the token to your server and update the UI if necessary
        console.log(currentToken)

        // Save the token.
        setDoc(doc(firestore, 'fcmTokens', currentToken), {
          uid: auth.currentUser?.uid,
        })
          .then(() => {})
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
