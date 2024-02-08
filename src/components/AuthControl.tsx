import { Show } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import { authSignIn } from '../core/firebase/auth/utils'
import { error } from '../core/utils/toasts'
import Loading from './Loading'
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
      <Show when={user() !== undefined} fallback={<Loading />}>
        <Show
          when={user() !== null}
          fallback={
            <button
              class="flex cursor-pointer flex-row items-center justify-center gap-3 rounded border border-primary px-3.5 py-2.5 text-primary"
              onClick={handleSignInClick}
              title="Sign In"
            >
              <SignInIcon />
              <span class="flex flex-col items-center justify-center">
                Sign In
              </span>
            </button>
          }
        >
          <></>
        </Show>
      </Show>
    </div>
  )
}

export default AuthControl
