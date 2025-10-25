import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Upload, ArrowLeft } from "lucide-react"
import { toast } from 'react-hot-toast'
import api from "../api/axios"

const categories = ["Pizza", "Burger", "Dessert", "Drinks", "Snacks", "Salad"]

export default function ItemRegister() {
  const [itemImage, setItemImage] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [restaurant, setRestaurant] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()


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

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  }

  const navigate = useNavigate();
  useEffect(() => {
    api.get('/api/restaurant')
      .then((res) => {
        if (res.data.success) {
          setLoggedIn(true);
          setRestaurant(res.data.restaurant);
        }
        else {
          toast.error(res.data.error);
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])


  const onSubmit = async (data) => {
   data.image=itemImage
   console.log(data);
   api.post(`/api/restaurant/${restaurant._id}/newitem`,data,{
    headers:{'Content-Type':'multipart/form-data'}
   })
   .then((res)=>{
    if(res.data.success){
      toast.success(res.data.success);
    }
   })
   .catch((err)=>{
    console.log(err);
   })

   reset();
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">

      <NavLink
        to='/dashboard'
        className='absolute flex items-center top-4 right-4  text-orange-600 border-2 rounded-2xl py-2 px-4 hover:border-orange-500 border-orange-600 duration-200'>
        <ArrowLeft className="h-5 w-5" />
        DashBoard
      </NavLink>

      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header with animated underline */}
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <motion.h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4" variants={headingVariants}>
            Add New Item
          </motion.h1>
          <motion.div
            className="h-1 bg-orange-600 mx-auto origin-left"
            style={{ width: "120px" }}
            variants={underlineVariants}
          />
        </motion.div>

        {/* Form Container */}
        <motion.form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-8 sm:p-10"
          variants={itemVariants}
        >
          {/* Name Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-sm font-semibold text-black mb-2">
              Item Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter item name"
              {...register("name", { required: "Item name is required" })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none transition-colors shadow-sm"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </motion.div>

          {/* Description Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-sm font-semibold text-black mb-2">
              Description <span className="text-orange-600">*</span>
            </label>
            <textarea
              placeholder="Enter item description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none transition-colors shadow-sm resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </motion.div>

          {/* Category and Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-black mb-2">
                Category <span className="text-orange-600">*</span>
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none transition-colors shadow-sm bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </motion.div>

            {/* Type Field (Radio Buttons) */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-black mb-3">
                Type <span className="text-orange-600">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="veg" {...register("type")} className="w-4 h-4 accent-green-600" />
                  <span className="ml-2 text-sm font-medium text-black">🥬 Veg</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="non-veg" {...register("type")} className="w-4 h-4 accent-red-600" />
                  <span className="ml-2 text-sm font-medium text-black">🍗 Non-Veg</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Price Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Actual Price */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-black mb-2">
                Actual Price <span className="text-orange-600">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter actual price"
                step="0.01"
                {...register("actualPrice", {
                  required: "Actual price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none transition-colors shadow-sm"
              />
              {errors.actualPrice && <p className="text-red-500 text-sm mt-1">{errors.actualPrice.message}</p>}
            </motion.div>

            {/* Discount Price */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-black mb-2">Discount Price</label>
              <input
                type="number"
                placeholder="Enter discount price"
                step="0.01"
                {...register("discountPrice", {
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-600 focus:outline-none transition-colors shadow-sm"
              />
              {errors.discountPrice && <p className="text-red-500 text-sm mt-1">{errors.discountPrice.message}</p>}
            </motion.div>
          </div>

          {/* Image Upload Field */}
          
          <motion.div>
            <input 
            required
            type="file"
            onChange={(e)=>setItemImage(e.target.files[0])}
            placeholder="Item image"
             />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
            >
              Register Item
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}
