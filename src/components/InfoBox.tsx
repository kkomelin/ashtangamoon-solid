import { Popover } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import InfoIcon from './icons/InfoIcon'

const InfoBox = () => (
  <Popover.Root portalled>
    <Popover.Trigger>
      <span class="sr-only">Show Info</span>
      <InfoIcon class="fill-secondary" />
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Description class='bg-primary text-tertiary px-4 py-3 rounded max-w-xs text-sm'>
            Sign in and subscribe to receive a push notification the day before
            full and new moon.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export default InfoBox
