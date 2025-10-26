import React, { useState ,useEffect, useRef} from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import FoodCard from '../components/FoodCard'
import Footer from '../components/Footer'

const Menu = () => {
  const [allfoodItem,setAllfoodItem]=useState([])
  const [pizzas,setPizzas]=useState([]);
  const [burgers,setBurgers]=useState([]);
  const [desserts,setDesserts]=useState([]);
  const [drinks,setDrinks]=useState([]);
  const [snacks,setSnacks]=useState([]);
  const [meals,setMeals]=useState([]);
  const [category,setCategory]=useState('All');

  const categories=["All","Pizzas", "Burgers", "Desserts", "Drinks", "Snacks","Meals"];


  useEffect(()=>{
      api.get('/api/fooditem/all')
      .then((res)=>{
        setAllfoodItem(res.data.allfoodItems);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/pizzas')
      .then((res)=>{
        setPizzas(res.data.Pizzas);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/burgers')
      .then((res)=>{
        setBurgers(res.data.Burgers);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/desserts')
      .then((res)=>{
        setDesserts(res.data.Desserts);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/drinks')
      .then((res)=>{
        setDrinks(res.data.Drinks);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/snacks')
      .then((res)=>{
        setSnacks(res.data.Snacks);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

    useEffect(()=>{
      api.get('/api/fooditem/meals')
      .then((res)=>{
        setMeals(res.data.Meals);
      })
      .catch((e)=>{
        console.log(e);
      })
    },[])

  return (
    <section className="bg-black px-4 pt-4">
     <Navbar/>

    {/* Header */}
      <div className="my-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
          Delicious items <span className="text-orange-500">for You</span>
        </h1>
        <p className="text-gray-400 text-lg">Discover amazing food with a top-class menu</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-2 p-2 border border-white justify-evenly my-8 bg-gray-950 rounded-xl'>
      {categories.map((cat,index)=>(
        <span 
        key={index}
        className={`cursor-pointer px-4 py-2 transition-all duration-300 rounded-2xl ${cat==category? 'bg-white text-black shadow-sm shadow-black' : 'text-white bg-gray-950'}`}
        onClick={(e)=>{setCategory(cat)}}>
          {cat}
        </span>
      ))}
      </div>

      {category=='All'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {allfoodItem.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Pizzas'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {pizzas.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Burgers'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {burgers.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Desserts'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {desserts.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Drinks'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {drinks.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Snacks'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {snacks.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          {category=='Meals'
          ?<div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {meals.map((fooditem)=>(
            <div key={fooditem._id}>
              <FoodCard name={fooditem.name} image={fooditem.itemImg} description={fooditem.description} actualPrice={fooditem.actualprice} discountPrice={fooditem.discountprice} category={fooditem.category} type={fooditem.type}/>
            </div>
          ))}
          </div>
          :<div></div>}

          <Footer/>
    </section>
  )
}

export default Menu
