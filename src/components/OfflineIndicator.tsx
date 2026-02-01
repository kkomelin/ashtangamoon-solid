import { Show } from 'solid-js'
import { useOffline } from '../domains/offline'

const OfflineIndicator = () => {
  const { isOffline } = useOffline()

  return (
    <Show when={isOffline()}>
      <div
        class="fixed left-0 right-0 top-0 z-50 bg-yellow-600 px-4 py-2 text-center text-sm font-medium text-white"
        role="status"
        aria-live="polite"
      >
        <span class="mr-2">⚠️</span>
        You're offline. Some features may not be available.
      </div>
    </Show>
  )
}

export default OfflineIndicator
