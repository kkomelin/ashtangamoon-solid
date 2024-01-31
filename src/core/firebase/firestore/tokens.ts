import { error, success } from '../../utils/toasts'
import { Schema, db } from './db'

export const registerToken = async (
  uid: string | undefined,
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    await db.fcmTokens.set(currentToken as Schema['fcmTokens']['Id'], {
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
    await db.fcmTokens.remove(currentToken as Schema['fcmTokens']['Id'])

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
    const token = await db.fcmTokens.get(
      currentToken as Schema['fcmTokens']['Id']
    )

    return token != null
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}
