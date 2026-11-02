import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import AppLayout from './AppLayout.jsx'
import { Login, Signup } from './components/index.js'
// adjust these paths to where you actually put the files:
import ProtectedRoute from './ProtectedRoute.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Private */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
          {/* add /add, /transactions, /profile here as you build them */}
        </Route>
      </Route>

      {/* Fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)