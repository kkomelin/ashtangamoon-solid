import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth'
import auth from './init'

export const authSignIn = async () => {
  const provider = new GoogleAuthProvider()

  return await signInWithPopup(auth, provider)
}

export const authSignOut = async () => {
  return await signOut(auth)
}
