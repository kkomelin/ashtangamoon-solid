import { Show } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import { authSignIn, authSignOut } from '../core/firebase/auth/utils'
import { error } from '../core/utils/toasts'
import SignInIcon from './icons/SignInIcon'
import SignOutIcon from './icons/SignOutIcon'

const AuthControl = () => {
  const { user } = useAuth()

  const handleSignInClick = async (e: any) => {
    e.preventDefault()
    try {
      await authSignIn()
    } catch (e) {
      error(e, 'Cannot login at the moment. Please try again.')
    }
  }

  const handleSignOutClick = async (e: any) => {
    e.preventDefault()
    try {
      await authSignOut()
    } catch (e) {
      error(e, 'Cannot logout at the moment. Please try again.')
    }
  }

  return (
    <div>
      <Show
        when={user() != null}
        fallback={
          <button onClick={handleSignInClick} title="Sign In">
            <span class="sr-only">Sign In</span>
            <SignInIcon />
          </button>
        }
      >
        <button onClick={handleSignOutClick} title="Sign Out">
          <span class="sr-only">Sign Out</span>
          <SignOutIcon />
        </button>
      </Show>
    </div>
  )
}

export default AuthControl
