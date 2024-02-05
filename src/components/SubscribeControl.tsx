import { Show, createSignal, onMount } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import Loading from './Loading'
import styles from './SubscribeControl.module.css'
import SubscribeIcon from './icons/SubscribeIcon'
import UnsubscribeIcon from './icons/UnsubscribeIcon'

const SubscribeControl = () => {
  const [isUserSubscribed, setIsUserSubscribed] = createSignal<
    boolean | undefined
  >(undefined)
  const { user } = useAuth()

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
    if (user() === undefined) {
      return
    }

    try {
      const result = await isSubscribed()
      setIsUserSubscribed(result)
    } catch (e) {
      setIsUserSubscribed(false)
    }
  })

  return (
    <div class={styles.subscribeControl}>
      <Show when={isUserSubscribed() !== undefined} fallback={<Loading />}>
        <Show
          when={isUserSubscribed() === true}
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
      </Show>
    </div>
  )
}

export default SubscribeControl
