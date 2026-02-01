import { ErrorBoundary as SolidErrorBoundary } from 'solid-js'
import { logger } from '../core/utils/logger'

interface ErrorBoundaryProps {
  children: any
}

const ErrorFallback = (err: Error, reset: () => void) => {
  logger.error('Application error caught by boundary:', err)

  return (
    <div class="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div class="text-primary max-w-md rounded-lg border border-red-500 bg-red-900/20 p-6 text-center">
        <h2 class="mb-2 text-xl font-bold">Something went wrong</h2>
        <p class="text-secondary mb-4 text-sm">
          An error occurred while loading the application.
        </p>
        <button
          onClick={reset}
          class="text-primary rounded-sm border border-primary px-4 py-2 transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Reload Application
        </button>
      </div>
    </div>
  )
}

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return (
    <SolidErrorBoundary fallback={ErrorFallback}>
      {props.children}
    </SolidErrorBoundary>
  )
}

export default ErrorBoundary
