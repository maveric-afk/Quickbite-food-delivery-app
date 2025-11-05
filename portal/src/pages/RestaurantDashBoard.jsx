import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../api/axios"
import { toast } from 'react-hot-toast'
import OrderCard from '../components/OrderCard'
import { Menu, X, MapPin, ArrowLeft, Clock, CheckCircle, XCircle, Leaf, Flame } from "lucide-react"
import ItemCard from "../components/ItemCard"

export default function RestaurantDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [restaurant, setRestaurant] = useState({});
  const [restaurantItems, setRestaurantItems] = useState([])
  const [orders, setOrders] = useState([])
  const [allfoodItems, setAllfoodItems] = useState([])

  const navigate = useNavigate()

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


  useEffect(() => {
    api.get('/api/restaurant')
      .then((res) => {
        if (res.data.success) {
          setLoggedIn(true);
          setRestaurant(res.data.restaurant);
          setRestaurantItems(res.data.restaurant.fooditems);
          setOrders(res.data.restaurant.orders)
        }
        else {
          toast.error(res.data.error);
          navigate('/login')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    api.get('/api/fooditem/all')
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          navigate('/login')
        }
        else if (res.data.allfoodItems) {
          setAllfoodItems(res.data.allfoodItems);
        }
      })
  }, [])

  const CurrentItems = [];
  restaurantItems.forEach((item, ind) => {
    allfoodItems.map((fooditem, index) => {
      if (fooditem._id == item) {
        CurrentItems.push(fooditem);
      }
    })
  })

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
                src={restaurant.image.startsWith('http')?`${restaurant.image}`:`${import.meta.env.VITE_API_BASE_URL}/${restaurant.image}`} alt="Restaurant Image" />
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
          <div className="px-1 md:px-4">
        {orders.map((order)=>( 
          <div key={order._id} className="my-2">
              <OrderCard orderId={order._id} userId={order.orderedBy} items={order.items} />
          </div>
          ))}
          </div>
        </div>

        <div className="animate-fade-in-delay">
          <h2 className="text-2xl font-bold text-black">Selling items</h2>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4">
            {CurrentItems.map((item) => (
              <div key={item._id}>
                <ItemCard imageSrc={item.itemImg} imageAlt={item.name} name={item.name} type={item.type} category={item.category} />
              </div>
            ))}
          </div>
        </div>



        {/* Add New Item Button - Not Fixed */}
        <div className="flex justify-center py-8">
          <button
            onClick={(e) => { navigate('/newitem') }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
            + Add New Item
          </button>
        </div>
      </div>
    </motion.div>
  )
}
