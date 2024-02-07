import { Show, createSignal, onMount } from 'solid-js'
import { useAuth } from '../context/AuthContext'
import {
  isSubscribed,
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import Loading from './Loading'
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
    <div class="flex flex-row gap-1">
      <Show when={isUserSubscribed() !== undefined} fallback={<Loading />}>
        <Show
          when={isUserSubscribed() === true}
          fallback={
            <button
              class="cursor-pointer border border-primary px-3.5 py-2.5 text-primary"
              onClick={handleSubscribeClick}
              title="Subscribe"
            >
              <SubscribeIcon />
              <span class="flex flex-col items-center justify-center">
                Subscribe
              </span>
            </button>
          }
        >
          <button
            class="text-quarteraly border-quarteraly cursor-pointer border px-3.5 py-2.5"
            onClick={handleUnsubscribeClick}
            title="Unsubscribe"
          >
            <UnsubscribeIcon class="fill-quarteraly" />
            <span class="!text-quarteraly flex flex-col items-center justify-center">
              Unsubscribe
            </span>
          </button>
        </Show>
      </Show>
    </div>
  )
}

export default SubscribeControl
