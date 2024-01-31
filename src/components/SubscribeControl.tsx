import { Show, createSignal, onMount } from 'solid-js'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import styles from './SubscribeControl.module.css'
import SubscribeIcon from './icons/SubscribeIcon'
import UnsubscribeIcon from './icons/UnsubscribeIcon'

const SubscribeControl = () => {
  const [isUserSubscribed, setIsUserSubscribed] = createSignal(false)

  const handleSubscribeClick = async (e: any) => {
    e.preventDefault()

    const result = await subscribeToTopic()
    setIsUserSubscribed(result)
  }

  const handleUnsubscribeClick = async (e: any) => {
    e.preventDefault()

    const result = await unsubscribeFromTopic()
    setIsUserSubscribed(!result)
  }

  onMount(async () => {
    try {
      const result = await isSubscribed()
      setIsUserSubscribed(result)
    } catch (e) {
      setIsUserSubscribed(false)
    }
  })

  return (
    <div class={styles.subscribeControl}>
      <Show
        when={isUserSubscribed()}
        fallback={
          <button onClick={handleSubscribeClick} title="Subscribe">
            <SubscribeIcon />
            <span>Subscribe</span>
          </button>
        }
      >
        <button onClick={handleUnsubscribeClick} title="Unsubscribe">
          <UnsubscribeIcon />
          <span>Unsubscribe</span>
        </button>
      </Show>
    </div>
  )
}

export default SubscribeControl
