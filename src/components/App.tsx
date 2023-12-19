import { Index, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import calculateMoonPhases from '../core/calculateMoonPhases'
import { APP_NAME } from '../core/config'
import { currentDateFormatted, formatMoonDate } from '../core/utils'
import visualizeMoonPhase from '../core/visualizeMoonPhase'
import { IMoonDate } from '../types/IMoonDate'
import './App.css'
import MoonDate from './MoonDate'

function App() {
  const [currentDate, setCurrentDate] = createSignal<string>(
    currentDateFormatted()
  )
  const [dates, setDates] = createSignal<IMoonDate[]>([])
  const [currentPhase, setCurrentPhase] = createSignal<number>()

  let moonRef!: SVGSVGElement
  let renderInterval: NodeJS.Timeout

  const refresh = () => {
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
    refresh()

    // Refresh once a minute.
    renderInterval = setInterval(refresh, 1 * 60 * 1000) 
  })

  createEffect(() => {
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
      <header>
        <h1>{APP_NAME}</h1>
        <div class="current-date">{currentDate()}</div>
      </header>

      {currentPhase() === undefined && <div class="loader">Loading...</div>}

      <svg id="moon" ref={moonRef} />

      <div class="next-dates">
        <Index each={dates()}>
          {(moonDate) => <MoonDate moonDate={moonDate()} />}
        </Index>
      </div>
    </>
  )
}

export default App
