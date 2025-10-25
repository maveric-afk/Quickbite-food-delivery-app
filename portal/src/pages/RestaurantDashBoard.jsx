import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const RestaurantDashBoard = () => {
  const [restaurantImage,setRestaurantImage]=useState('')
  useEffect(()=>{
    api.get('/api/restaurant')
    .then((res)=>{
      if(res.data.restaurant){
        setRestaurantImage(res.data.restaurant.Image);
      }
    })
  })
  return (
    <div>
      hi
      <img src={`http://localhost:7000/${restaurantImage}`} alt="" />
    </div>
  )
}

export default RestaurantDashBoard
