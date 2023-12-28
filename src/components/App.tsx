import { UserCredential } from '@firebase/auth'
import {
  Index,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import calculateMoonPhases from '../core/calculateMoonPhases'
import { APP_NAME } from '../core/config'
import { authSignIn, authSignOut } from '../core/firebase/auth/utils'
import { requestPermission } from '../core/firebase/registration'
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
  const [user, setUser] = createSignal<UserCredential>()

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

    requestPermission()
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

  const handleSignInClick = async (e: any) => {
    e.preventDefault()
    try {
      const user = await authSignIn()
      setUser(user)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSignOutClick = async (e: any) => {
    e.preventDefault()
    try {
      await authSignOut()
      setUser()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Show
        when={user()}
        fallback={<button onClick={handleSignInClick}>Sign In</button>}
      >
        <button onClick={handleSignOutClick}>
          Sign Out as {user()?.user.displayName}
        </button>
      </Show>

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
