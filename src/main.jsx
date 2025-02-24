import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Cars from './components/Cars/Cars'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cars />
  </StrictMode>,
)
