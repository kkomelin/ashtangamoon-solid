import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { EMULATE } from '../../../config/main'
import app from '../init'

const firestore = getFirestore(app)

if (EMULATE) {
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
}

export default firestore
