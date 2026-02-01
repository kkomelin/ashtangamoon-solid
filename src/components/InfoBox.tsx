import { Popover } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import InfoIcon from './icons/InfoIcon'

const InfoBox = () => (
  <Popover.Root portalled>
    <Popover.Trigger class="absolute top-1 right-1 cursor-pointer p-3">
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
              <a
                href="https://komelin.com/#get-in-touch"
                target="_blank"
                rel="noopener noreferrer"
                class="text-tertiary underline hover:text-tertiary/80 transition-colors"
              >
                Contact author
              </a>
            </p>
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export default InfoBox
