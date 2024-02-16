import { Show, onMount } from 'solid-js'
import toast from 'solid-toast'
import { useAuth } from '../context/AuthContext'
import { requestToken } from '../core/firebase/subscription'
import useOffline from '../hooks/useOffline'
import AuthControl from './AuthControl'
import SubscribeControl from './SubscribeControl'

const ActionPanel = () => {
  const { user } = useAuth()
  const { isOffline } = useOffline()

  onMount(async () => {
    await requestToken()

    if (isOffline()) {
      toast(
        "You're offline at the moment, so some features may not be available."
      )
      return
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
