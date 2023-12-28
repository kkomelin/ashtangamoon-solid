importScripts('/__/firebase/8.10.1/firebase-app.js')
importScripts('/__/firebase/8.10.1/firebase-messaging.js')
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
    body: payload?.notification?.title || 'Background Message body.',
    icon: '/img/android-chrome-192x192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
