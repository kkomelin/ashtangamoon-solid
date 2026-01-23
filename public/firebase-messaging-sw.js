importScripts('/__/firebase/12.8.0/firebase-app-compat.js')
importScripts('/__/firebase/12.8.0/firebase-messaging-compat.js')
importScripts('/__/firebase/init.js?useEmulator=true')

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  const notificationTitle =
    payload?.notification?.title || 'Background Message Title'

  const notificationOptions = {
    body: payload?.notification?.body || 'Background Message Body',
    icon: '/img/android-chrome-192x192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
