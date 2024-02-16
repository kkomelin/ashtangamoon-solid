import { createSignal, onCleanup, onMount } from 'solid-js'

const useOffline = () => {
  const [isOffline, setIsOffline] = createSignal(!window.navigator.onLine)

  const handleOnline = () => {
    // @fixme: Add event listeners once only for multiple uses of the useOffline hook.
    setIsOffline(!window.navigator.onLine)
  }

  const handleOffline = () => {
    setIsOffline(!window.navigator.onLine)
  }

  onMount(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onCleanup(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return { isOffline }
}

export default useOffline
