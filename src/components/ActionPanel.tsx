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
