/* @refresh reload */
import { render } from 'solid-js/web'

import App from './components/App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

const root = document.getElementById('root')

render(
  () => (
    <AuthProvider>
      <App />
    </AuthProvider>
  ),
  root!
)
