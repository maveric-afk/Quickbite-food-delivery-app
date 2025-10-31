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

          <div className="space-y-4">
            {restaurant.orders.map((order, index) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-orange-200 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-lg mb-2">{order.orderedBy}</h3>
                        <p className="text-gray-600 text-sm mb-3">{order.items.length}</p>
                        {/* <p className="text-gray-500 text-xs">{order.time}</p> */}
                      </div>

                      {/* <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">${order.amount.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="animate-fade-in-delay-2">
          <h2 className="text-2xl font-bold text-black mb-6">Available Food Items</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                  >
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              : items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-40 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center overflow-hidden">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </span>

                      {/* Discount Badge */}
                      {item.discount && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          -{item.discount}%
                        </div>
                      )}

                      {/* Veg/Non-Veg Icon */}
                      <div className="absolute top-3 left-3">
                        {item.isVeg ? (
                          <Leaf size={20} className="text-green-600 bg-white rounded-full p-1" />
                        ) : (
                          <Flame size={20} className="text-red-600 bg-white rounded-full p-1" />
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <h3 className="font-semibold text-black text-base mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-gray-500 text-xs mb-3">{item.category}</p>

                      {/* Price Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-orange-600">
                            ${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
                          </span>
                          {item.discount && (
                            <span className="text-sm text-gray-400 line-through">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
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
