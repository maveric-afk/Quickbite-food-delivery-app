import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Lottie from 'lottie-react'
import DeliveryGuy from '../../Delivery Guy Waiting.json'
import {NavLink,useNavigate} from 'react-router-dom'
import api from '../api/axios'
import {toast} from 'react-hot-toast'

export default function AdminHome() {
    const [loggedIn,setLoggedIn]=useState(false)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#b45309",
      transition: {
        duration: 0.3,
      },
    },
  }

  const navigate=useNavigate();

  function handleLogout(){
    api.get('/api/restaurant/logout')
    .then((res)=>{
        if(res.data.success){
            toast.success(res.data.success);
            setLoggedIn(false);
        }
        else{
            toast.error(res.data.error)
        }
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  useEffect(()=>{
    api.get('/api/restaurant')
    .then((res)=>{
        if(res.data.success){
            setLoggedIn(true);
        }
    })
    .catch((e)=>{
        console.log(e)
    })
  },[])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-orange-600/20"
      >

          <img src="/Quickbite-logo.png" alt="logo" className="h-[4.5rem] w-[4.5rem] md:h-[5.5rem] ml-8 md:w-[5.5rem] lg:h-[8rem] lg:w-[8rem]" />        
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8 ">
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="h-1 w-16 bg-linear-to-r from-orange-600 to-orange-500 rounded-full" />
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl text-balance">
                Manage Restaurant with Ease — Join QuickBite Today!
              </h2>
            </motion.div>

            {/* Description Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] font-light leading-relaxed text-gray-300 md:text-[20px]"
            >
              QuickBite connects restaurants to thousands of hungry customers
              every day.
            </motion.p>

            {/* Benefits Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-[15px] font-light leading-relaxed text-gray-300 md:text-[20px]"
            >
              Join QuickBite and gain access to marketing insights, delivery
              analytics, and fast customer support — all from one easy-to-use
              dashboard.
            </motion.p>
          </div>

          {/* Right Column - Illustration Placeholder */}
          <motion.div
            variants={itemVariants}
            className="lg:flex items-center justify-center"
          >
            <Lottie animationData={DeliveryGuy} loop={true}/>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        {loggedIn
        ?<div>
            <motion.button
              onClick={()=>{navigate('/dashboard')}}
              variants={buttonVariants}
              whileHover="hover"
              className="mt-8 lg:mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-600/50"
            >
              DashBoard
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={handleLogout}
              variants={buttonVariants}
              className="ml-2 lg:ml-4 mt-8 lg:mt-6 inline-flex items-center gap-2  font-semibold text-gray-400 hover:text-gray-100"
            >
              Logout
            </motion.button>
        </div>
        : <motion.button
              onClick={()=>{navigate('/register')}}
              variants={buttonVariants}
              whileHover="hover"
              className="mt-8 lg:mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-600/50"
            >
              Join Now
              <ArrowRight className="h-5 w-5" />
            </motion.button>}
            
      </main>
    </div>
  )
}
