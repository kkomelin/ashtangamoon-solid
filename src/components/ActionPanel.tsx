import { UserCredential } from 'firebase/auth'
import { Show, onMount } from 'solid-js'
import { requestToken } from '../core/firebase/subscription'
import styles from './ActionPanel.module.css'
import AuthControl from './AuthControl'
import SubscribeControl from './SubscribeControl'

interface IProps {
  user?: UserCredential
  onAuth: (user?: UserCredential) => void
}

const ActionPanel = (props: IProps) => {

  onMount(async () => {
    await requestToken()
  })

  return (
    <div class={styles.actionPanel}>
      <AuthControl user={props.user} onAuth={props.onAuth} />

      <Show when={props.user}>
        <SubscribeControl />
      </Show>
    </div>
  )
}

export default ActionPanel
