import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Userhome from './Components/Userhome.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'

const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
   {
    index:true,
    element:<Userhome/>
   }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
<RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
