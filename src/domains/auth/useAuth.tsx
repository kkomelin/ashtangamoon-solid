import { useContext } from 'solid-js'
import { AuthContext } from '.'

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
