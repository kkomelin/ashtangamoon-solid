import { Show, createSignal, onMount } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import useOffline from '../hooks/useOffline'
import Button from './Button'
import Loading from './Loading'
import SubscribeIcon from './icons/SubscribeIcon'
import UnsubscribeIcon from './icons/UnsubscribeIcon'

const SubscribeControl = () => {
  const [isUserSubscribed, setIsUserSubscribed] = createSignal<
    boolean | undefined
  >(undefined)
  const { user } = useAuth()
  const { isOffline } = useOffline()

  const handleSubscribeClick = async (e: MouseEvent) => {
    e.preventDefault()

    const result = await subscribeToTopic()
    setIsUserSubscribed(result)
  }

  const handleUnsubscribeClick = async (e: MouseEvent) => {
    e.preventDefault()

    const result = await unsubscribeFromTopic()
    setIsUserSubscribed(!result)
  }

  onMount(async () => {
    if (user() === undefined) {
      return
    }

    if (isOffline()) {
      setIsUserSubscribed(false)
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
    <div class="flex flex-row gap-1">
      <Show when={isUserSubscribed() !== undefined} fallback={<Loading />}>
        <Show
          when={isUserSubscribed() === true}
          fallback={
            <Button
              type="primary"
              onClick={handleSubscribeClick}
              title="Subscribe"
            >
              <SubscribeIcon />
            </Button>
          }
        >
          <Button
            type="secondary"
            onClick={handleUnsubscribeClick}
            title="Unsubscribe"
          >
            <UnsubscribeIcon class="fill-quarteraly" />
          </Button>
        </Show>
      </Show>
    </div>
  )
}

export default SubscribeControl
