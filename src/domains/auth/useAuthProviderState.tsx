import { User } from 'firebase/auth'
import { createSignal } from 'solid-js'

export function useAuthProviderState() {
  const [user, setUser] = createSignal<User | null | undefined>(undefined)
  return { user, setUser }
}
