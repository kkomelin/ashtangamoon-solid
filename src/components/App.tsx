import { UserCredential } from '@firebase/auth'
import {
  Index,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { Toaster } from 'solid-toast'
import calculateMoonPhases from '../core/calculateMoonPhases'
import { APP_NAME } from '../core/config'
import { authSignIn, authSignOut } from '../core/firebase/auth/utils'
import { getMessagingToken } from '../core/firebase/registration'
import { error } from '../core/utils/errors'
import { currentDateFormatted, formatMoonDate } from '../core/utils/main'
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
      error(e, 'Cannot login at the moment. Please try again.')
    }
  }

  const handleSignOutClick = async (e: any) => {
    e.preventDefault()
    try {
      await authSignOut()
      setUser()
    } catch (e) {
      error(e, 'Cannot logout at the moment. Please try again.')
    }
  }

  const handleSaveClick = async (e: any) => {
    e.preventDefault()

    const user = await authSignIn()
    setUser(user)

    await getMessagingToken()
  }

  return (
    <>
      <div class="auth-control">
        <Show
          when={user()}
          fallback={<button onClick={handleSignInClick}>Sign In</button>}
        >
          <button onClick={handleSignOutClick}>
            Sign Out as {user()?.user.displayName}
          </button>
        </Show>
      </div>

      <header>
        <h1>{APP_NAME}</h1>
        <div class="current-date">{currentDate()}</div>
      </header>

      <button onclick={handleSaveClick}>
        Request permissions and save token
      </button>

      {currentPhase() === undefined && <div class="loader">Loading...</div>}

      <svg id="moon" ref={moonRef} />

      <div class="next-dates">
        <Index each={dates()}>
          {(moonDate) => <MoonDate moonDate={moonDate()} />}
        </Index>
      </div>

      <Toaster />
    </>
  )
}

export default App
