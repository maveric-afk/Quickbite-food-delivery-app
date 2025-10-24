import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { NavLink ,useNavigate} from "react-router-dom"
import {ArrowLeft} from 'lucide-react'
import {toast} from 'react-hot-toast'
import api from '../api/axios'

export default function Signup() {
    const [clicked,setClicked]=useState(false)
    const [emailverified,setEmailverified]=useState(false)
    const [userdata,setUserdata]=useState({})
    const [otp,setOtp]=useState(null)
    const [realotp,setRealotp]=useState(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const password = watch("password")

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

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  }

  const navigate=useNavigate()

  const handleVerifyEmail=(e)=>{
   e.preventDefault();
   if(Number(otp)===Number(realotp)){
    setEmailverified(true);
    api.post('/api/restaurant/signup',userdata)
    .then((res)=>{
        toast.success(res.data.success);
        navigate('/login')
    })
    .catch((err)=>{
        console.log(err)
    })
   }
   else{
    toast.error('Invalid Otp');
   }
  }

  const onSubmit = async (data) => {
    setClicked(true)
    setUserdata(data)

    api.post('/api/restaurant/verifyemail',data)
    .then((res)=>{
        setRealotp(res.data.otp);
        toast.success('Otp sent');
    })
    .catch((e)=>{
        console.log(e);
    })

    reset();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">

    <NavLink 
    to='/'
    className='absolute flex items-center top-4 right-4  text-orange-600 border-2 rounded-2xl py-2 px-4 hover:border-orange-500 border-orange-600 duration-200'>
        <ArrowLeft className="h-5 w-5" />
        Home
    </NavLink>

    {(clicked && !emailverified)
        ? <form className="p-8 border border-orange-600 absolute z-50 text-black rounded-2xl bg-white flex flex-col items-center gap-10">
          <div className="flex flex-col">
          <p className="text-[15px] md:text-xl self-start lg:text-2xl">OTP Verification</p>
          <p className="text-[7px] text-gray-500 md:text-[10px] self-start lg:text-[12px]">An otp is sent to {userdata.email}</p>
          </div>
            <input className="p-4 bg-gray-300 rounded-xl border-2 border-black" value={otp} placeholder="Enter the Otp" type='number' onChange={(e)=>{
              setOtp(e.target.value)
            }} />
            <button 
            onClick={handleVerifyEmail}
            className="bg-orange-600 rounded-2xl py-1 px-3">
              Verify
            </button>
        </form>
        :<div>
          </div>}

      <motion.div
        className={`w-full ${clicked?'blur-[5px] opacity-70':''} mt-8 max-w-md`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Heading Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white mb-2">
            Register Your Restaurant with{" "}
            <span className="text-orange-600">QuickBite</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Join our network and grow your restaurant online.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          variants={containerVariants}
          encType="multipart/form-data"
        >
          {/* Restaurant Name */}
          <motion.div variants={itemVariants}>
            <input
              {...register("name", {
                required: "Restaurant name is required",
                minLength: {
                  value: 2,
                  message: "Restaurant name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="Restaurant Name"
              className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </motion.div>

          {/* Email Address */}
          <motion.div variants={itemVariants}>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          {/* Address / City */}
          <motion.div variants={itemVariants}>
            <input
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
              })}
              type="text"
              placeholder="Address / City"
              className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </motion.div>

           {/*image*/}
          <motion.div variants={itemVariants}>
            <input
              {...register("image", {
                required: "Image is required",
              })}
              type="file"
              placeholder="Restaurant Image"
              className="w-full p-8 bg-gray-200 cursor-pointer text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Register
          </motion.button>
        </motion.form>

        {/* Sign In Link */}
        <motion.div className="text-center mt-6" variants={itemVariants}>
          <p className="text-gray-400">
            Already registered?{" "}
            <NavLink
              to='/login'
              className="text-orange-600 hover:text-orange-500 font-semibold transition-colors"
            >
              Sign in
            </NavLink>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
