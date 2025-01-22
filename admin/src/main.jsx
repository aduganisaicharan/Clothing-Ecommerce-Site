import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  //  now we will get the react-router-dom support in this project
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
