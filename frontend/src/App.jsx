import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Help from './pages/Help'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Restaurants from './pages/Restaurants'
import RestaurantItems from './pages/RestaurantItems'
import Menu from './pages/Menu'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import OrdersPage from './pages/OrdersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/help',
    element: <Help />
  },
  {
    path: '/restaurants',
    element: <Restaurants/>,
  },
  {
    path: '/restaurants/:id',
    element: <div>
      <RestaurantItems />
    </div>
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path:'/orders',
    element:<div>
      <OrdersPage/>
    </div>
  },
  {
    path:'/success',
    element:<div>
      <Success/>
    </div>
  },
  {
    path:'/cancel',
    element:<div>
      <Cancel/>
    </div>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App

// backend: https://quickbite-backend-piw7.onrender.com