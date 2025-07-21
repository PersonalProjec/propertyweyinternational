import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <ParallaxProvider>
      <App />
      </ParallaxProvider>
    </BrowserRouter>
  </StrictMode>
)
