// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyAiqR7IKkPZy1FEbMmXyipNFjsgTUDlVXI',
  authDomain: 'test-push-2-995d1.firebaseapp.com',
  projectId: 'test-push-2-995d1',
  storageBucket: 'test-push-2-995d1.appspot.com',
  messagingSenderId: '430604690456',
  appId: '1:430604690456:web:7a77db82aafaa057e0cf6d',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
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
