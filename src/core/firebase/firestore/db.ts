import { schema, Typesaurus } from 'typesaurus'
import { APP_MACHINE_NAME } from '../../../config/main'
import './init'

export const db = schema(
  ($) => ({
    fcmTokens: $.collection<FcmTokens>(),
  }),
  { app: APP_MACHINE_NAME }
)

export type Schema = Typesaurus.Schema<typeof db>

// Models:

interface FcmTokens {
  uid: string | undefined
}
