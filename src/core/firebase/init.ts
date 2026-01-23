import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { FIREBASE_CONFIGURATION } from '../../config/keys'
import { APP_MACHINE_NAME } from '../../config/main'

const app = initializeApp(FIREBASE_CONFIGURATION, APP_MACHINE_NAME)

// Only initialize analytics in production
if (import.meta.env.PROD) {
  getAnalytics(app)
}

export default app
