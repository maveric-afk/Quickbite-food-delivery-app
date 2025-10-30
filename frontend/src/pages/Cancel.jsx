import { motion } from 'framer-motion'
import React from 'react'
import {ArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import Cancelled from '.././Payment Failed.json'

const Cancel = () => {
    const navigate=useNavigate()
  return (
    <div className='bg-black p-12 text-white flex h-[100vh] justify-center items-center'>
      
      <div className='rounded-2xl p-8 flex flex-col items-center gap-8 md:gap-12'>
        <Lottie className='h-[15rem] sm:h-[18rem] md:h-[25rem]' animationData={Cancelled} loop/>
        <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{navigate('/cart')}}
              className="mt-6 w-full rounded-lg bg-red-600 py-3 text-white shadow-lg transition-all hover:bg-red-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-600/50"
            >
              Return
            </motion.button>
      </div>

    </div>
  )
}

export default Cancel