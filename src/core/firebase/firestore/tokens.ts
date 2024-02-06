import { error, success } from '../../utils/toasts'
import { db } from './db'

export const registerToken = async (
  uid: string | undefined,
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    await db.fcmTokens.set(currentToken, {
      uid,
    })

    success('Subscribed successfully')
    return true
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}

export const unregisterToken = async (
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    await db.fcmTokens.remove(currentToken)

    success('Unsubscribed successfully')
    return true
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}

export const isTokenRegistered = async (
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    const token = await db.fcmTokens.get(currentToken)

    return token != null
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}
