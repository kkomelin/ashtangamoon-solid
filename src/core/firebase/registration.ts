import { getToken } from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from '../config'
import messaging from './messaging'

export function requestPermission() {
  console.log('Requesting permission...')
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')

      // Get registration token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
        .then((currentToken) => {
          if (currentToken) {
            // @todo Send the token to your server and update the UI if necessary
            console.log(currentToken)
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
    } else {
      console.warn('Notification permission not granted.')
    }
  })
}
