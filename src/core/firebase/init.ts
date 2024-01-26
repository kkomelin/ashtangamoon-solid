// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { FIREBASE_CONFIGURATION } from '../../config/keys'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIGURATION)
export default app
