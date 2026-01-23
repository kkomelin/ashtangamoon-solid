import { onAuthStateChanged, User } from 'firebase/auth'
import { createSignal, Index, onCleanup, onMount, Show } from 'solid-js'
import { Toaster } from 'solid-toast'
import calculateMoonPhases from '../core/calculateMoonPhases'
import auth from '../core/firebase/auth/init'
import { currentDateFormatted, formatMoonDate } from '../core/utils/main'
import visualizeMoonPhase from '../core/visualizeMoonPhase'
import { useAuth } from '../domains/auth'
import useSW from '../hooks/useSW'
import { IMoonDate } from '../types/IMoonDate'
import ActionPanel from './ActionPanel'
import InfoBox from './InfoBox'
import Loading from './Loading'
import MoonDate from './MoonDate'

function App() {
  const [currentDate, setCurrentDate] = createSignal<string>(
    currentDateFormatted()
  )
  const [dates, setDates] = createSignal<IMoonDate[]>([])
  const [currentPhase, setCurrentPhase] = createSignal<number>()
  const { user, setUser } = useAuth()

  useSW()

  let moonRef!: SVGSVGElement
  let renderInterval: NodeJS.Timeout

  const calculateDates = () => {
    setCurrentDate(currentDateFormatted())

    const { currentPhase, newMoon, fullMoon, nextNewMoon } =
      calculateMoonPhases()

    setCurrentPhase(currentPhase)

    const dateArr = [
      { title: 'New Moon', date: formatMoonDate(newMoon) },
      { title: 'Full Moon', date: formatMoonDate(fullMoon) },
      { title: 'Next New Moon', date: formatMoonDate(nextNewMoon) },
    ]

    setDates(dateArr)
  }

  onMount(() => {
    calculateDates()

    // Refresh once a minute.
    renderInterval = setInterval(calculateDates, 1 * 60 * 1000)

    // Firebase Auth state change handler.
    onAuthStateChanged(auth, (user: User | null) => {
      setUser(user)
    })

    // Visualize current moon phase.
    const phase = currentPhase()
    if (phase !== undefined) {
      visualizeMoonPhase(moonRef, phase)
    }
  })

  onCleanup(() => {
    clearInterval(renderInterval)
  })

  return (
    <>
      <Show when={user() !== undefined}>
        <InfoBox />
      </Show>

      {currentPhase() === undefined && <Loading />}
      <div>
        <div class="current-date text-secondary mb-6 text-center font-bold">
          {currentDate()}
        </div>

        <svg id="moon" ref={moonRef} />
      </div>
      <footer class="mb-8 w-full">
        <div class="text-primary mb-4 flex flex-col items-center justify-center sm:flex-row sm:gap-12">
          <Index each={dates()}>
            {(moonDate) => <MoonDate moonDate={moonDate()} />}
          </Index>
        </div>

        <ActionPanel />
      </footer>
      <Toaster position="top-left" />
    </>
  )
}

export default App
