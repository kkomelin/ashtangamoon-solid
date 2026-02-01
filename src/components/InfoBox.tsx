import { Popover } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import InfoIcon from './icons/InfoIcon'

const InfoBox = () => (
  <Popover.Root portalled>
    <Popover.Trigger class="absolute top-1 right-1 p-3 cursor-pointer">
      <span class="sr-only">Show Info</span>
      <InfoIcon class="fill-primary" />
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Description class="bg-primary text-tertiary max-w-xs rounded-sm px-4 py-3 text-sm">
            <p class="pb-4 font-bold">
              Sign in with Google using the button at the bottom and subscribe
              to receive a push notification the day before full and new moon.
            </p>
            <p>
              Even though the application is quite stable, it's under
              development, so some functions and styles can change with time.
            </p>
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export default InfoBox
