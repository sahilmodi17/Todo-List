import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './context/Context'
import router from './Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />

  </UserProvider>
)
