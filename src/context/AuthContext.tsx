import { User } from 'firebase/auth'
import { createContext, createSignal, useContext } from 'solid-js'

function useProviderValue() {
  const [user, setUser] = createSignal<User | null>(null)
  return { user, setUser }
}

export type AuthContextType = ReturnType<typeof useProviderValue>

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider(props: any) {
  const value = useProviderValue()

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
