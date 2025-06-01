import { StrictMode } from 'react' //It only runs in development mode, not in production.
//but checks your code for potential problems (like deprecated APIs or side effects).
import { createRoot } from 'react-dom/client' // new way of rendering apps
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // switch between pages without reloading the page
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
  </BrowserRouter>,
) 
// can get the support of context api in out project 
// hence can use in any conponent 