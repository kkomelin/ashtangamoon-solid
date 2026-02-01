import { createEffect } from 'solid-js'
import toast, { Toast } from 'solid-toast'
import { logger } from '../core/utils/logger'
import { useRegisterSW } from 'virtual:pwa-register/solid'

const intervalMS = 60 * 60 * 1000 // once an hour

const useSW = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_, r) {
      r &&
        setInterval(() => {
          r.update()
        }, intervalMS)
    },
    onRegisterError(error) {
      logger.error('SW registration error', error)
    },
  })

  const closePrompt = (t: Toast) => {
    // setOfflineReady(false)
    setNeedRefresh(false)
    toast.dismiss(t.id)
  }

  const handleInstall = (e: MouseEvent, t: Toast) => {
    e.preventDefault()
    updateServiceWorker(true)
    closePrompt(t)
  }

  const handleClose = (e: MouseEvent, t: Toast) => {
    e.preventDefault()
    closePrompt(t)
  }

  createEffect(() => {
    if (needRefresh()) {
      toast(
        (t: Toast) => (
          <div>
            <div>
              An application update is available. Click Install to install the
              new version and reload the page.
            </div>
            <div class="mt-3 flex flex-row items-center justify-start gap-3">
              <button
                onClick={(e: MouseEvent) => handleInstall(e, t)}
                class="rounded-sm border border-gray-300 bg-gray-200 px-2 py-1 transition-colors hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Install application update"
              >
                Install
              </button>
              <button
                onClick={(e: MouseEvent) => handleClose(e, t)}
                class="rounded-sm border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Close update notification"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
        }
      )
    }

    if (offlineReady()) {
      toast('The application is ready to work offline.')
      setOfflineReady(false)
    }
  })

  return null
}

export default useSW
