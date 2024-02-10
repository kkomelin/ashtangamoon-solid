import { Show, onMount } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import { requestToken } from '../core/firebase/subscription'
import AuthControl from './AuthControl'
import SubscribeControl from './SubscribeControl'

const ActionPanel = () => {
  const { user } = useAuth()

  onMount(async () => {
    await requestToken()
  })

  return (
    <>
      <div class="flex flex-row items-center justify-center p-1">
        <AuthControl />

        <Show when={user() != null}>
          <SubscribeControl />
        </Show>
      </div>

      <Show when={user() !== undefined}>
        <div class="mx-auto mt-1 max-w-md px-4 text-center text-sm text-primary opacity-80">
          Login and subscribe to receive push notifications the day before full
          and new moon
        </div>
      </Show>
    </>
  )
}

export default ActionPanel
