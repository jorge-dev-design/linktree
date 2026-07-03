import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Login } from './pages/login'
import { Networks } from './pages/networks'
import { Notfound } from './pages/notfound'
import { Private } from './routes/Private'

const router = createHashRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/admin',
    element: <Private> <Admin/> </Private>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path: '*',
    element: <Notfound/>
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
