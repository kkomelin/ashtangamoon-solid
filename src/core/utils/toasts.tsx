import toast, { Toast } from 'solid-toast'
import { logger } from './logger'

export const error = (e: any, message: string) => {
  logger.error(e)
  toast.error(message)
}

export const errorWithRetry = (
  e: any,
  message: string,
  onRetry: () => void
) => {
  logger.error(e)
  toast(
    (t: Toast) => (
      <div class="flex flex-col gap-2">
        <div>{message}</div>
        <button
          onClick={() => {
            toast.dismiss(t.id)
            onRetry()
          }}
          class="rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Retry
        </button>
      </div>
    ),
    {
      duration: 5000,
      icon: '❌',
    }
  )
}

export const success = (message: string) => {
  toast.success(message)
}
