import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useState } from 'react'
import { useEffect } from 'react'


const CartOverlay = () => {
  const [cart,setCart]=useState([])
  
  useEffect(()=>{
    api.get('/api/user')
    .then((res)=>{
      if(res.data.user)
      setCart(res.data.user.Cart);
    })
    .catch((e)=>{
      console.log(e);
    })
  })

  const navigate=useNavigate()
  return (
    <div className='rounded-xl flex items-center justify-evenly gap-4 px-8 py-4 md:px-12 md:py-6 mx-4 fixed bottom-2 md:bottom-8 text-gray-200 z-50 bg-gray-950 border border-white'>
        <div>
              {cart.length} x items added
        </div>
        <div
        onClick={(e)=>{navigate('/cart')}}
        className="bg-orange-600 cursor-pointer text-white hover:bg-orange-500 px-3 py-1 rounded-xl">
            View Cart
        </div>
    </div>
  )
}

export default CartOverlay
