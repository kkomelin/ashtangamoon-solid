import { createContext } from 'solid-js'
import { TAuthContext } from '.'

export const AuthContext = createContext<TAuthContext | undefined>(undefined)
