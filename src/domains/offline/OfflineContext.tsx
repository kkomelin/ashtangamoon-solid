import { createContext } from 'solid-js'
import { TOfflineContext } from '.'

export const OfflineContext = createContext<TOfflineContext | undefined>(
  undefined
)
