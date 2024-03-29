import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { EMULATE } from '../../../config/main'
import app from '../init'

const auth = getAuth(app)

if (EMULATE) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}

export default auth
