import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { NavLink ,useNavigate} from "react-router-dom"
import {ArrowLeft} from 'lucide-react'
import {toast} from 'react-hot-toast'
import api from '../api/axios'

export default function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  const navigate=useNavigate();
  const onSubmit = async (data) => {
        api.post('/api/restaurant/signin',data)
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.success);
                navigate('/');
            }
            else{
                toast.error(res.data.error);
                reset();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
  }

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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">

        <NavLink 
        to='/'
        className='absolute flex items-center top-4 right-4  text-orange-600 border-2 rounded-2xl py-2 px-4 hover:border-orange-500 border-orange-600 duration-200'>
                <ArrowLeft className="h-5 w-5" />
                Home
            </NavLink>

      <motion.div
        className="w-full mt-8 max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Heading Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white mb-2">
            Login to your{" "}
            <span className="text-orange-600">Portal</span>
          </h1>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          variants={containerVariants}
        >

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

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Login
          </motion.button>
        </motion.form>

        {/* Sign up Link */}
        <motion.div className="text-center mt-6" variants={itemVariants}>
          <p className="text-gray-400">
            Not Joined yet?{" "}
            <NavLink
              to='/register'
              className="text-orange-600 hover:text-orange-500 font-semibold transition-colors"
            >
              Register
            </NavLink>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
