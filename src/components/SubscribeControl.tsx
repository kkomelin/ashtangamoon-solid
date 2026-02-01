import { Show, createSignal, onMount } from 'solid-js'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import { errorWithRetry } from '../core/utils/toasts'
import { useAuth } from '../domains/auth'
import { useOffline } from '../domains/offline'
import Button from './Button'
import Loading from './Loading'
import SubscribeIcon from './icons/SubscribeIcon'
import UnsubscribeIcon from './icons/UnsubscribeIcon'

const SubscribeControl = () => {
  const [isUserSubscribed, setIsUserSubscribed] = createSignal<
    boolean | undefined
  >(undefined)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const { user } = useAuth()
  const { isOffline } = useOffline()

  const handleSubscribeClick = async (e?: MouseEvent) => {
    e?.preventDefault()
    setIsLoading(true)

    try {
      const result = await subscribeToTopic()
      setIsUserSubscribed(result)
    } catch (err) {
      errorWithRetry(
        err,
        'Failed to subscribe. Click retry to try again.',
        () => handleSubscribeClick()
      )
      setIsUserSubscribed(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnsubscribeClick = async (e?: MouseEvent) => {
    e?.preventDefault()
    setIsLoading(true)

    try {
      const result = await unsubscribeFromTopic()
      setIsUserSubscribed(!result)
    } catch (err) {
      errorWithRetry(
        err,
        'Failed to unsubscribe. Click retry to try again.',
        () => handleUnsubscribeClick()
      )
      setIsUserSubscribed(true)
    } finally {
      setIsLoading(false)
    }
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
        <Show when={isLoading()} fallback={
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
        }>
          <Loading />
        </Show>
      </Show>
    </div>
  )
}

export default SubscribeControl
