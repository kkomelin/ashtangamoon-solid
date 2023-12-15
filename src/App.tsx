import { createSignal, onMount } from 'solid-js'
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
  let moonRef!: SVGSVGElement

  const render = () => {
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

    // Visualize the moon.
    visualizeMoonPhase(moonRef, currentPhase)
  }

  onMount(render)

  return (
    <>
      <header>
        <h1>Ashtanga Moon</h1>
        <div class="current-date">{cDate()}</div>
      </header>

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
