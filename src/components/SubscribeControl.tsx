import {
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../core/firebase/subscription'
import styles from './SubscribeControl.module.css'

interface IProps {}

const SubscribeControl = (props: IProps) => {
  const handleSubscribeClick = async (e: any) => {
    e.preventDefault()

    await subscribeToTopic()
  }

  const handleUnsubscribeClick = async (e: any) => {
    e.preventDefault()

    await unsubscribeFromTopic()
  }

  return (
    <div class={styles.subscribeControl}>
      <button onClick={handleSubscribeClick}>Subscribe</button>
      <button onClick={handleUnsubscribeClick}>Unsubscribe</button>
    </div>
  )
}

export default SubscribeControl
