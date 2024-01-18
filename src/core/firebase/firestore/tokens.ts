import { Auth } from 'firebase/auth'
import {
  DocumentSnapshot,
  Firestore,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { error, success } from '../../utils/toasts'

export const registerToken = async (
  auth: Auth,
  firestore: Firestore,
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    await setDoc(doc(firestore, 'fcmTokens', currentToken), {
      uid: auth.currentUser?.uid,
    })

    success('Subscribed successfully')
    return true
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}

export const unregisterToken = async (
  firestore: Firestore,
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    await deleteDoc(doc(firestore, 'fcmTokens', currentToken))

    success('Unsubscribed successfully')
    return true
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}

export const isTokenRegistered = async (
  firestore: Firestore,
  currentToken: string,
  userErrorMessage: string
) => {
  try {
    const docSnap: DocumentSnapshot = await getDoc(
      doc(firestore, 'fcmTokens', currentToken)
    )
    return docSnap.exists()
  } catch (e: any) {
    error(e, userErrorMessage)
    return false
  }
}
