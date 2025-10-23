import React from 'react'
import Navbar from '../components/Navbar'
import LoadingScreen from '../components/LoadingScreen'
import ImageCaraousel from '../components/ImageCaraousel'
import FoodCard from '../components/FoodCard'
import RestaurantCard from '../components/RestaurantCard'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import { useState } from 'react'
import api from '../api/axios'

const Home = () => {
  const [show, setShow] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(t);
  }, [4000]);

  return (
    <>
      {show ?
        <LoadingScreen /> :

        <div
          className='bg-black text-white px-4'>
          <Navbar />

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

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center mt-8'>
            <FoodCard
              imageSrc={'/dummy1.jpg'}
              imageAlt='dummyfood'
              name='Paneer tikka roll'
              type={'veg'}
              category={'rolls'}
              rating={4}
            />
            <RestaurantCard
              imageSrc={'/dummy2.jpg'}
              imageAlt='dummyrestaurant'
              name='DCT Cafe'
              location='Kamla Nagar'
              rating={3.5}
            />
          </div>

          {/* <div className='absolute bottom-0'>
      <Footer/>
    </div> */}

        </div>}
    </>
  )
}

export default Home
