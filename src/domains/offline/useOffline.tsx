import { useContext } from 'solid-js'
import { OfflineContext } from '.'

export function useOffline() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error(`useOffline must be used within a OfflineProvider`)
  }
  return context
}
