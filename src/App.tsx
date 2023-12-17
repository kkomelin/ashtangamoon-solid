import { createSignal, onCleanup, onMount } from 'solid-js'
import './App.css'
import calculateMoonPhases from './core/calculateMoonPhases'
import { currentDate, formatMoonDate } from './core/utils'
import visualizeMoonPhase from './core/visualizeMoonPhase'

interface IMoonDate {
  title: string
  date: string
}

function App() {
  const [cDate, setCDate] = createSignal<string>(currentDate())
  const [dates, setDates] = createSignal<IMoonDate[]>([])
  const [loading, setLoading] = createSignal<boolean>(true)
  let moonRef!: SVGSVGElement
  let renderInterval: NodeJS.Timeout

  const refresh = () => {
    setCDate(currentDate())
    // Calculate moon phases.
    const { currentPhase, newMoon, fullMoon, nextFullMoon, nextNewMoon } =
      calculateMoonPhases()

    const dateArr = [
      { title: 'New Moon', date: formatMoonDate(newMoon) },
      { title: 'Full Moon', date: formatMoonDate(fullMoon) },
      { title: 'Next New Moon', date: formatMoonDate(nextNewMoon) },
    ]

    if (nextFullMoon != null) {
      dateArr.push({
        title: 'Next Full Moon',
        date: formatMoonDate(nextFullMoon),
      })
    }

    setDates(dateArr)

    setLoading(false)

    // Visualize the moon.
    visualizeMoonPhase(moonRef, currentPhase)
  }

  onMount(() => {
    refresh()

    // Re-render page regularly.
    renderInterval = setInterval(
      () => {
        // Check whether the app has focus.
        if (!window.document.hasFocus()) {
          return
        }

        refresh()
      },
      1 * 60 * 1000
    ) // once a minute
  })

  onCleanup(() => {
    clearInterval(renderInterval)
  })

  return (
    <>
      <header>
        <h1>Ashtanga Moon</h1>
        <div class="current-date">{cDate()}</div>
      </header>

      {loading() && <div class="loader">Loading...</div>}

      <svg id="moon" ref={moonRef} />

      <div class="next-dates">
        {dates().map((moonDate: IMoonDate) => (
          <div class="moon-phase">
            <div class="title">{moonDate.title}</div>
            <div class="date">{moonDate.date}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
