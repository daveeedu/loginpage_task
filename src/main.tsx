import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import LogIn from './pages/auth/Index.tsx'
import LandingPage from './pages/landing/Index.tsx'
import config from './utils/config.ts'
import ProtectedRoute from './components/ProtectedRoute.tsx'

const { routes } = config

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: routes.login, element: <LogIn /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: routes.home, element: <LandingPage /> }],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
