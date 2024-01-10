import { UserCredential } from 'firebase/auth'
import { Show } from 'solid-js'
import { authSignIn, authSignOut } from '../core/firebase/auth/utils'
import { error } from '../core/utils/toasts'

interface IProps {
  user?: UserCredential
  onAuth: (user?: UserCredential) => void
}

const AuthControl = (props: IProps) => {
  const handleSignInClick = async (e: any) => {
    e.preventDefault()
    try {
      const user = await authSignIn()
      props.onAuth(user)
    } catch (e) {
      error(e, 'Cannot login at the moment. Please try again.')
    }
  }

  const handleSignOutClick = async (e: any) => {
    e.preventDefault()
    try {
      await authSignOut()
      props.onAuth()
    } catch (e) {
      error(e, 'Cannot logout at the moment. Please try again.')
    }
  }

  return (
    <div>
      <Show
        when={props.user}
        fallback={<button onClick={handleSignInClick}>Sign In</button>}
      >
        <button onClick={handleSignOutClick}>Sign Out</button>
      </Show>
    </div>
  )
}

export default AuthControl
