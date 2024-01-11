import { Show, createEffect, createSignal } from 'solid-js'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import styles from './SubscribeControl.module.css'

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

  createEffect(async () => {
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
        fallback={<button onClick={handleSubscribeClick}>Subscribe</button>}
      >
        <button onClick={handleUnsubscribeClick}>Unsubscribe</button>
      </Show>
    </div>
  )
}

export default SubscribeControl
