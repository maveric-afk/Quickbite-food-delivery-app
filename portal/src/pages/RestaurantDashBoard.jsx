import React, { useState, useEffect } from "react"
import { NavLink,useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../api/axios"
import {toast} from 'react-hot-toast'
import { Menu, X, MapPin, ArrowLeft,Clock, CheckCircle, XCircle, Leaf, Flame } from "lucide-react"

export default function RestaurantDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn,setLoggedIn]=useState(false)
  const [restaurant,setRestaurant]=useState({});
  const [orders,setOrders]=useState([])

  const navigate=useNavigate()

   const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }
  

  useEffect(()=>{
      api.get('/api/restaurant')
      .then((res)=>{
          if(res.data.success){
              setLoggedIn(true);
              setRestaurant(res.data.restaurant);
              setOrders(res.data.restaurant.orders)
          }
          else{
            toast.error(res.data.error);
            navigate('/login')
          }
      })
      .catch((e)=>{
          console.log(e)
      })
    },[])

  return (
    <motion.div 
    variants={containerVariants} initial="hidden" animate="visible"
    className="min-h-screen bg-gray-50">
      
          <NavLink 
            to='/'
            className='absolute flex items-center top-4 right-4  text-orange-600 border-2 rounded-2xl py-2 px-4 hover:border-orange-500 border-orange-600 duration-200'>
                <ArrowLeft className="h-5 w-5" />
                Home
            </NavLink>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Restaurant Image */}
            <div>
              <img 
              className="rounded-2xl h-[10rem] md:h-[15rem]"
              src={`${import.meta.env.VITE_API_BASE_URL}/${restaurant.image}`} alt="Restaurant Image" />
            </div>

            {/* Restaurant Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-black mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin size={18} className="text-orange-600" />
                <p className="text-lg">{restaurant.location}</p>
              </div>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                Premium dining experience with authentic cuisine and exceptional service.
              </p>
            </div>
          </div>
        </div>

        {/* Live Orders Section */}
        <div className="animate-fade-in-delay">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-black">Live Orders</h2>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-600"></div>
          </div>
            {orders.length}
        </div>

        

        {/* Add New Item Button - Not Fixed */}
        <div className="flex justify-center py-8">
          <button 
          onClick={(e)=>{navigate('/newitem')}}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
            + Add New Item
          </button>
        </div>
      </div>
    </motion.div>
  )
}
