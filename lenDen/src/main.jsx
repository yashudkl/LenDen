import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import AppLayout from './AppLayout.jsx'
import { Login, Signup, Dashboard ,CheckEmail} from './pages/index.js'
import { store } from './store/store.js'
import ProtectedRoute from './ProtectedRoute.jsx'
import { supabase } from '../supbase/client'
import { login, logout } from './feature/auth/authSlice'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkemail" element={<CheckEmail />} />

      {/* Private */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    </>
  )
)

// Restores the Supabase session before rendering any route
function AuthBootstrap({ children }) {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      if (session) dispatch(login(session.user))
      else dispatch(logout())
      setReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) dispatch(login(session.user))
        else dispatch(logout())
      }
    )

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [dispatch])

  if (!ready) return null // swap for a spinner if you like

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthBootstrap>
        <RouterProvider router={router} />
      </AuthBootstrap>
    </Provider>
  </StrictMode>
)