import { IMoonDate } from '../types/IMoonDate'

interface IMoonDateProps {
  moonDate: IMoonDate
}

const MoonDate = (props: IMoonDateProps) => {
  const { moonDate } = props

  return (
    <div class="moon-phase">
      <div class="title">{moonDate.title}</div>
      <div class="date">{moonDate.date}</div>
    </div>
  )
}

export default MoonDate
