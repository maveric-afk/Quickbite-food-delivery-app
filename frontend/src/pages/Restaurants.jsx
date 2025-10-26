import React, { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import RestaurantCard from '../components/RestaurantCard'
import Footer from '../components/Footer'

const Restaurants = () => {
  const [allRestaurants,setAllrestaurants]=useState([])

    useEffect(()=>{
    api.get('/api/restaurant/all')
    .then((res)=>{
      setAllrestaurants(res.data.allRestaurants);
    })
    .catch((e)=>{
      console.log(e)
    })
  },[])

  return (
    <section className="bg-black px-4 pt-4">
      <Navbar/>

      {/* Header */}
      <div className="my-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
          Restaurants <span className="text-orange-500">for You</span>
        </h1>
        <p className="text-gray-400 text-lg">Discover amazing food from top-rated restaurants</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRestaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <RestaurantCard name={restaurant.name} image={restaurant.image} location={restaurant.location} rating={restaurant.rating} _id={restaurant._id}/>
          </div>
        ))}
      </div>

      <Footer/>
    </section>
  )
}

export default Restaurants
