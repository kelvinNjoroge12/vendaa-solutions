import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CmsProvider } from './store/CmsContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CmsProvider>
      <App />
    </CmsProvider>
  </StrictMode>,
)
