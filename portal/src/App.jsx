import { useState } from 'react'
import './App.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import RestaurantDashBoard from './pages/RestaurantDashBoard'
import {Toaster} from 'react-hot-toast'

const router=createBrowserRouter([
  {
    path:'/',
    element:<div>
      <Home/>
    </div>
  },
  {
    path:'/register',
    element:<div>
      <Signup/>
    </div>
  },
  {
    path:'/login',
    element:<div>
      <Signin/>
    </div>
  },
  {
    path:'/dashboard',
    element:<div>
      <RestaurantDashBoard/>
    </div>
  }
])

function App() {

  return (
   <div>
    <RouterProvider router={router}>

    </RouterProvider>
    <Toaster/>
   </div>
  )
}

export default App
