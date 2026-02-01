/* @refresh reload */
import { render } from 'solid-js/web'
import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider } from './domains/auth'
import { OfflineProvider } from './domains/offline'
import './styles/index.css'

const root = document.getElementById('root')

render(
  () => (
    <ErrorBoundary>
      <OfflineProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </OfflineProvider>
    </ErrorBoundary>
  ),
  root!
)
