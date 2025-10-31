import { motion } from "framer-motion"
import { Trash2, ArrowLeft } from "lucide-react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"
import CartItem from "../components/CartItem"
import {loadStripe} from '@stripe/stripe-js'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState({})
  const [useraddress,setUserAddress]=useState(null)
  const [allfoodItems, setAllfoodItems] = useState([])

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

   const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

   const navigate = useNavigate()

  function handleUserAddress(e){
    api.patch('/api/user/address',{address:useraddress})
    .then((res)=>{
      if(res.data.error){
        navigate('/signin')
        toast.error(res.data.error)
      }
      else if(res.data.success){
        toast.success(res.data.success)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(() => {
    api.get('/api/user')
      .then((res) => {
        setUser(res.data.user)
        setCart(res.data.user.Cart)
      })
  }, [])


  useEffect(() => {
    api.get('/api/fooditem/all')
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        }
        setAllfoodItems(res.data.allfoodItems);
      })
  }, [])


  const cartItems = [
    
  ];
  cart.forEach((cartItem, index) => {
    allfoodItems.forEach((fooditem, index) => {
      if (fooditem._id == cartItem.itemId) {
        fooditem.quantity = cartItem.quantity;
        cartItems.push(fooditem)
      }
    })
  })

  const totalPrice = cartItems.reduce((sum, item) => sum + item.discountprice * item.quantity, 0)

  //payment
  async function handlePayment() {
    const stripe=await loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY);
    api.post('/api/create-checkout-session',{cartItems:cartItems})
    .then((res)=>{
      if(res.data.sessionURL)
      {window.location.href=res.data.sessionURL}
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      className="min-h-screen bg-black overflow-hidden text-white"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" bg-black shadow-sm"
      >
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { navigate('/') }}
            className="inline-flex border border-orange-500 items-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-orange-600 hover:border-orange-600 duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
          <h1 className="mt-4 text-3xl font-bold">Cart</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mx-[0.5rem] md:mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              <h2 className="text-xl font-semibold">Items ({cart.length})</h2>
              <div className="max-h-96 space-y-3 overflow-y-auto rounded-lg border border-gray-600 bg-gray-950 p-4">
                {cart.length > 0 ? (
                  cartItems.map((item) => (
                    <CartItem _id={item._id} name={item.name} itemImg={item.itemImg} discountprice={item.discountprice} quantity={item.quantity}/>
                  ))
                ) : (
                  <p className="py-8 text-center text-gray-300">Your cart is empty</p>
                )}
              </div>
            </motion.div>

            <button
                className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-600/50"
                onClick={(e)=>{navigate('/menu')}}>
                  Add more items
                </button>

            {/* User Details Section */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-8 rounded-lg border border-gray-600 bg-black p-6 shadow-md"
            >
              <h2 className="mb-6 text-xl font-semibold">Delivery Details</h2> 
                <div>
                  <label className="block text-sm font-medium text-white">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={useraddress}
                    required
                    onChange={(e)=>{setUserAddress(e.target.value)}}
                    placeholder="Street/Landmark, City, Pincode"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-black px-6 py-4 text-white placeholder-gray-400 transition-colors focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600/20 hover:border-gray-400"
                  />
                </div>

                <button
                className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-600/50"
                onClick={handleUserAddress}>
                  Confirm
                </button>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="rounded-lg border border-gray-600 bg-black p-6 shadow-md h-fit"
          >
            <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-3 border-b border-gray-200 pb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-black">Rs.{(item.discountprice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Rs.{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-600">Rs.{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Confirm Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-600/50"
            >
              Confirm & Proceed to Payment
            </motion.button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  )
}
