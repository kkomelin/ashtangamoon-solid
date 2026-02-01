import { Show, onMount } from 'solid-js'
import { requestToken } from '../core/firebase/subscription'
import { useAuth } from '../domains/auth'
import AuthControl from './AuthControl'
import SubscribeControl from './SubscribeControl'

const ActionPanel = () => {
  const { user } = useAuth()

  onMount(async () => {
    // Only request token if not in emulator mode
    // The token will be automatically cached after first request
    if (import.meta.env.VITE_EMULATE !== 'true') {
      await requestToken()
    }
  })

  return (
    <>
      <div class="flex flex-row items-center justify-center gap-4 p-1">
        <AuthControl />

        <Show when={user() != null}>
          <SubscribeControl />
        </Show>
      </div>
    </>
  )
}

export default ActionPanel
