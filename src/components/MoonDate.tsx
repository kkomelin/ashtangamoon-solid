import { IMoonDate } from '../types/IMoonDate'

interface IMoonDateProps {
  moonDate: IMoonDate
}

const MoonDate = (props: IMoonDateProps) => {
  const { moonDate } = props

  return (
    <div class="mb-3 flex w-full flex-row items-center justify-center gap-4 text-center font-bold text-secondary sm:w-auto sm:flex-col sm:gap-0">
      <div class="mb-0.5 flex w-1/2 flex-row items-center justify-end text-base font-bold text-primary sm:block sm:w-auto sm:text-lg sm:font-normal">
        {moonDate.title}
      </div>
      <div class="flex w-1/2 flex-row items-center justify-start sm:block sm:w-auto">
        {moonDate.date}
      </div>
    </div>
  )
}

export default MoonDate
