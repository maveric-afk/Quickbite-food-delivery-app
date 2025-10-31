import React, { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useRef } from "react"
import { useEffect } from "react"
import api from "../api/axios"
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function FoodCard({id,name,image,description,category,type,actualPrice,discountPrice}) {
  const isVeg = type?.toLowerCase() === "veg"
  const [open,setOpen]=useState(false)
  const [user,setUser]=useState({});
  const [cart,setCart]=useState([])
  const [quantity,setQuantity]=useState(0)

  const navigate=useNavigate()
  
  function handleQuantityIncrement(e){
    api.patch(`/api/user/cart/add/${id}`)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      setQuantity(res.data.currentQuantity)
    })
  }

  function handleQuantityDecrement(e){
    api.patch(`/api/user/cart/remove/${id}`)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      else if(res.data.null){
        toast.error(res.data.null);
      }
      setQuantity(res.data.currentQuantity)
    })
  }

  useEffect(()=>{
      api.get('/api/user/')
      .then((res)=>{
        if(res.data.user)
        setUser(res.data.user);
      })
    },[])

    useEffect(()=>{
      if(user)
      setCart(user.Cart);
    },[user])


  return (
    <>
  {open
  ?<motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className={`flex flex-col justify-between items-center p-8 max-w-sm md:max-w-md w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-sm hover:shadow-md transition-shadow `}
      role="article"
      aria-label={name}
    >

    <span 
    onClick={(e)=>setOpen(false)}
    className="text-white cursor-pointer absolute top-2 right-2 font-bold text-sm md:text-lg">
      X
    </span>

    {/* Image section (~60% height; uses fixed heights for consistency) */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <motion.img
          src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
          alt={name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-3 p-4">
          <h3 className="text-lg text-pretty md:text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-300 text-xs md:text-lg">{description}</p>
      </div>
    </motion.div>
  :<motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className={`group max-w-sm md:max-w-md w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-sm hover:shadow-md transition-shadow `}
      role="article"
      aria-label={name}
    >
      {/* Image section (~60% height; uses fixed heights for consistency) */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <motion.img
          src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
          alt={name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/10"
          aria-hidden="true"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-pretty text-lg font-semibold tracking-tight">{name}</h3>

          {/* Veg / Non-Veg badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
              isVeg ? "bg-neutral-800 text-neutral-200" : "bg-neutral-800 text-neutral-200"
            }`}
            aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`}
              aria-hidden="true"
            />
            {isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>
            {category ? <p className="text-sm text-neutral-400">{category}</p> : null}
          </span>

            <span className="flex items-center gap-1">
              Rs.
            {<p className="text-[13px] md:text-[15px] text-white">{discountPrice}</p>}
            <p className="text-[11px] md:text-[13px] text-neutral-400 line-through">{actualPrice}</p>
            </span>
        </div>

        {/* CTA */}
        <div className="mt-1 flex justify-between items-center">
          <div>
            <button 
            onClick={(e)=>{setOpen(true)}}
            className="flex rounded-xl items-center justify-center bg-orange-600 p-2 text-sm font-medium text-white transition-colors">
              View
            </button>
          </div>

          <div>
            <span
            onClick={handleQuantityDecrement}
            className="flex items-center justify-center cursor-pointer bg-orange-600 p-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            -
          </span>
          <span
            className="flex items-center justify-center bg-orange-600 p-2 text-sm font-medium text-white transition-colors"
          >
            {quantity}
          </span>
          <span
            onClick={handleQuantityIncrement}
            className="flex items-center justify-center cursor-pointer bg-orange-600 p-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            +
          </span>
          </div>
        </div>
      </div>
    </motion.div>}
    </>
  )
}
