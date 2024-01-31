import { schema, Typesaurus } from 'typesaurus'
import './init'

export const db = schema(($) => ({
  fcmTokens: $.collection<FcmTokens>(),
}))

export type Schema = Typesaurus.Schema<typeof db>

// Models:

interface FcmTokens {
  uid: string | undefined
}
