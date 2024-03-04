import { onCleanup, onMount } from 'solid-js'
import { OfflineContext, useOfflineProviderState } from '.'

export function OfflineProvider(props: any) {
  const value = useOfflineProviderState()
  const { setIsOffline } = value

  const handleOnline = () => {
    // @fixme: Add event listeners once only for multiple uses of the useOffline hook.
    console.log('online ', Date.now())
    setIsOffline(!window.navigator.onLine)
  }

  const handleOffline = () => {
    console.log('offline ', Date.now())
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

  return (
    <OfflineContext.Provider value={value}>
      {props.children}
    </OfflineContext.Provider>
  )
}
