import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import {MapPin} from 'lucide-react'
import api from '../api/axios';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';


const RestaurantItems = () => {
    const [restaurant,setRestaurant]=useState({});
    const [fooditems,setFooditems]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
    api.get(`/api/restaurant/${id}`)
    .then((res)=>{
        setRestaurant(res.data.restaurant);
    })
    .catch((err)=>{
        console.log(err);
    })
    },[])

    useEffect(()=>{
        api.get(`/api/fooditem/all`)
        .then((res)=>{
            setFooditems(res.data.allfoodItems)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    const foodItemsofRestaurant=useRef([]);
    
        for(let i=0;i<fooditems.length;i++){
            if(restaurant.fooditems.includes(fooditems[i]._id)){
                foodItemsofRestaurant.current.push(fooditems[i]);
            }
        }

    console.log(foodItemsofRestaurant.current)

  return (
    <div className="bg-black px-4 pt-4">
      <Navbar/>

         <div className="bg-black flex flex-col gap-8 md:gap-12 lg:gap-24 md:flex-row md:items-center rounded-2xl shadow-sm my-8 animate-fade-in">
      {/* Restaurant Image */}
            <div>
              <img 
              className="rounded-2xl h-[10rem] md:h-[20rem]"
              src={`${import.meta.env.VITE_API_BASE_URL}/${restaurant.image}`} alt="Restaurant Image" />
            </div>

            {/* Restaurant Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-gray-100 mb-4">
                <MapPin size={18} className="text-orange-600" />
                <p className="text-lg">{restaurant.location}</p>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                Premium dining experience with authentic cuisine and exceptional service.
              </p>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {foodItemsofRestaurant.current.map((item)=>(
                    <div key={item._id}>
                        <FoodCard name={item.name} image={item.itemImg} description={item.description} type={item.type} category={item.category} actualPrice={item.actualprice} discountPrice={item.discountprice}/>
                    </div>
            ))}
            </div>

            <Footer/>
        </div>
  )
}

export default RestaurantItems
