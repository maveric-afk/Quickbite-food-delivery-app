import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Help from './pages/Help'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Restaurants from './pages/Restaurants'
import Menu from './pages/Menu'
import {Toaster} from 'react-hot-toast'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/help',
    element:<Help/>
  },
  {
    path:'/restaurants',
    element:<Restaurants/>
  },
  {
    path:'/signin',
    element:<Signin/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/menu',
    element:<Menu/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </div>
  )
}

export default App
