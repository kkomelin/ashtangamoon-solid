import { schema, Typesaurus } from 'typesaurus'
import { APP_MACHINE_NAME } from '../../../config/main'
import './init'

export const db = schema(
  ($) => ({
    fcmTokens: $.collection<FcmToken, string>(),
  }),
  { app: APP_MACHINE_NAME }
)

export type Schema = Typesaurus.Schema<typeof db>

// Models:

interface FcmToken {
  uid: string | undefined
}
