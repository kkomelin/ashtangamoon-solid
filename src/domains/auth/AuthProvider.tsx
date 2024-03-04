import { AuthContext } from '.'
import { useProviderContextState } from '.'

export function AuthProvider(props: any) {
  const value = useProviderContextState()

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
