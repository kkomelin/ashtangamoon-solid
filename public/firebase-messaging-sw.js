importScripts('/__/firebase/12.8.0/firebase-app-compat.js')
importScripts('/__/firebase/12.8.0/firebase-messaging-compat.js')
importScripts('/__/firebase/init.js?useEmulator=true')

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  // Only log in development
  if (
    self.location.hostname === 'localhost' ||
    self.location.hostname === '127.0.0.1'
  ) {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    )
  }

  const notificationTitle = payload?.data?.title || 'Ashtanga Moon'

  const notificationOptions = {
    body: payload?.data?.body || 'A moon phase is coming',
    icon: '/img/android-chrome-192x192.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
