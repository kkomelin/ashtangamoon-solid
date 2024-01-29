import { Show, onMount } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import { requestToken } from '../core/firebase/subscription'
import styles from './ActionPanel.module.css'
import AuthControl from './AuthControl'
import SubscribeControl from './SubscribeControl'

const ActionPanel = () => {
  const { user } = useAuth()

  onMount(async () => {
    await requestToken()
  })

  return (
    <div class={styles.actionPanel}>
      <AuthControl />

      <Show when={user() != null}>
        <SubscribeControl />
      </Show>
    </div>
  )
}

export default ActionPanel
