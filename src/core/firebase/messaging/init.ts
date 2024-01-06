import { getMessaging } from 'firebase/messaging'
import app from '../init'

const messaging = getMessaging(app)

export default messaging
