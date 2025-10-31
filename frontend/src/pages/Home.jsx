import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoadingScreen from '../components/LoadingScreen'
import ImageCaraousel from '../components/ImageCaraousel'
import FoodCard from '../components/FoodCard'
import { NavLink } from 'react-router-dom'
import RestaurantCard from '../components/RestaurantCard'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import { useState } from 'react'
import api from '../api/axios'
import CartOverlay from '../components/CartOverlay'

const Home = () => {
  const [show, setShow] = useState(true);
  const [allRestaurants,setAllrestaurants]=useState([]);
  const [allfoodItem,setAllfoodItem]=useState([]);
  const [user,setUser]=useState({});
  const [cart,setCart]=useState([])

  React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(t);
  }, [4000]);


  useEffect(()=>{
    api.get('/api/restaurant/all')
    .then((res)=>{
      setAllrestaurants(res.data.allRestaurants);
    })
    .catch((e)=>{
      console.log(e)
    })
  },[])

  useEffect(()=>{
    api.get('/api/fooditem/all')
    .then((res)=>{
      setAllfoodItem(res.data.allfoodItems);
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])

  useEffect(()=>{
    api.get('/api/user')
    .then((res)=>{
      if(res.data.user)
      setUser(res.data.user);
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])

  useEffect(()=>{
    if(user)
    setCart(user.Cart);
  },[user])

  console.log(cart)

  return (
    <>
      {show ?
        <LoadingScreen /> :

        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
          className='bg-black text-white px-4 overflow-hidden'>
          <Navbar />

          {cart.length!=0
          ?<CartOverlay/>
          :<div></div>}

          <div>
            <ImageCaraousel />
          </div>

          <div
            className="relative my-4 bg-black overflow-hidden py-6 md:py-8"
          >
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: [0, "-50%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 10,
                  ease: "linear",
                },
              }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-wider">
                From Cravings to your Doorstep • From Cravings to your Doorstep • From Cravings to your Doorstep • From Cravings to your Doorstep • 
              </span>
            </motion.div>
          </div>

          <div
          className='my-8'>
            <p className='text-[25px] md:text-[35px] text-white font-extrabold mb-4'>Featured Restaurants -</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {allRestaurants.splice(0,7).map((restaurant)=>(
                <div key={restaurant._id}>
                  <RestaurantCard name={restaurant.name} location={restaurant.location} image={restaurant.image} rating={restaurant.rating} _id={restaurant._id}/>
                </div>
              ))}
              <div className='bg-gray-950 hover:bg-black rounded-2xl duration-200 flex justify-center items-center'>
              <NavLink
              to='/restaurants'
              className='text-orange-600 hover:text-orange-500 hover:scale-105 duration-200'
              >See more</NavLink>
              </div>
            </div>
          </div>


          <div
          className='my-8'>
            <p className='text-[25px] md:text-[35px] text-white font-extrabold mb-4'>Featured food items -</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {allfoodItem.splice(0,21).map((fooditem)=>(
                <div key={fooditem._id}>
                  <FoodCard id={fooditem._id} name={fooditem.name} description={fooditem.description} image={fooditem.itemImg} type={fooditem.type} category={fooditem.category} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice}  _id={fooditem._id}/>
                </div>
              ))}
              <div className='bg-gray-950 hover:bg-black rounded-2xl duration-200 flex justify-center items-center'>
              <NavLink
              to='/menu'
              className='text-orange-600 hover:text-orange-500 hover:scale-105 duration-200'
              >See more</NavLink>
              </div>
            </div>
          </div>
          
              <Footer/>
        </motion.div>}
    </>
  )
}

export default Home
