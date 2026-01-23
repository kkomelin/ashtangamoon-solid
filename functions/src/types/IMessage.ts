import { EMoonPhase } from './EMoonPhase'

export interface IMessage {
  message: string
  createdAt?: Date
  type?: EMoonPhase
}
