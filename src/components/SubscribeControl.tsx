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
              class="flex cursor-pointer flex-row items-center justify-center gap-3 rounded border border-primary px-3.5 py-2.5 text-primary"
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
            class="flex cursor-pointer flex-row items-center justify-center gap-3 rounded border border-quarteraly px-3.5 py-2.5 text-quarteraly"
            onClick={handleUnsubscribeClick}
            title="Unsubscribe"
          >
            <UnsubscribeIcon class="fill-quarteraly" />
            <span class="flex flex-col items-center justify-center !text-quarteraly">
              Unsubscribe
            </span>
          </button>
        </Show>
      </Show>
    </div>
  )
}

export default SubscribeControl
