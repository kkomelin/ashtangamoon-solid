import { Show } from 'solid-js'
import { authSignIn } from '../core/firebase/auth/utils'
import { error } from '../core/utils/toasts'
import { useAuth } from '../domains/auth'
import Button from './Button'
import Loading from './Loading'
import SignInIcon from './icons/SignInIcon'

const AuthControl = () => {
  const { user } = useAuth()

  const handleSignInClick = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      await authSignIn()
    } catch (e) {
      error(e, 'Cannot login at the moment. Please try again.')
    }
  }

  return (
    <div>
      <Show when={user() !== undefined} fallback={<Loading />}>
        <Show
          when={user() !== null}
          fallback={
            <Button type="primary" onClick={handleSignInClick} title="Sign In">
              <SignInIcon />
            </Button>
          }
        >
          <></>
        </Show>
      </Show>
    </div>
  )
}

export default AuthControl
