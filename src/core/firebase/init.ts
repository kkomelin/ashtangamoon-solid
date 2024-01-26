import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { FIREBASE_CONFIGURATION } from '../../config/keys'

const app = initializeApp(FIREBASE_CONFIGURATION)

getAnalytics(app)

export default app
