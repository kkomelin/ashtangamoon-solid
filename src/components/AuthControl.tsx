import { Show } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import { authSignIn } from '../core/firebase/auth/utils'
import { error } from '../core/utils/toasts'
import SignInIcon from './icons/SignInIcon'

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

  return (
    <div>
      <Show
        when={user() != null}
        fallback={
          <button onClick={handleSignInClick} title="Sign In">
            <SignInIcon />
            <span>Sign In</span>
          </button>
        }
      >
        <></>
      </Show>
    </div>
  )
}

export default AuthControl
