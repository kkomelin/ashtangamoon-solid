import { createSignal } from 'solid-js'

export function useOfflineProviderState() {
  const [isOffline, setIsOffline] = createSignal(!window.navigator.onLine)
  return { isOffline, setIsOffline }
}
