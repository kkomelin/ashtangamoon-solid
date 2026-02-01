import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
} from 'firebase/firestore'
import { EMULATE } from '../../../config/main'
import app from '../init'

// Initialize Firestore with persistence configuration
// Single-tab persistence is the default when using persistentLocalCache()
const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache(),
})

if (EMULATE) {
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
}

export default firestore
