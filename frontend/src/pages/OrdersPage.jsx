import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useNavigate,NavLink} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import empty from '.././empty.json'
import Delivery from '.././Delivery.json'
import DeliveryRiding from '.././Delivery Riding.json'
import Lottie from 'lottie-react'
import {ArrowLeft} from 'lucide-react'

const OrdersPage = () => {
    const [user,setUser]=useState({})
    const [orders,setOrders]=useState([]);
    const [allfooditems,setAllfoodItems]=useState([])
    const [loading,setLoading]=useState(true)

    const navigate=useNavigate()
    useEffect(()=>{
        api.get('/api/user')
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error);
                navigate('/signin')
            }
            else if(res.data.user){
                setUser(res.data.user);
                setOrders(res.data.user.LiveOrders)
            }
        })
        .catch((e)=>{
            console.log(e);
        })
    },[])

    useEffect(()=>{
        api.get('/api/fooditem/all')
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error);
                navigate('/signin')
            }
            else if(res.data.allfoodItems){
                setAllfoodItems(res.data.allfoodItems);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const orderItems=[];
    orders.forEach((order,index)=>{
        allfooditems.forEach((item,ind)=>{
            if(item._id==order.itemId){
                item.quantity=order.quantity;
                orderItems.push(item)
            }
        })
    })

    useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 3000);
    },[])
  return (
    <>
    {loading
    ? <div className='bg-white h-[100vh] flex justify-center items-center'>
        <div>
               <Lottie animationData={DeliveryRiding} className='h-[10rem] sm:h-[20rem] lg:h-[30rem]' loop/>
       </div>
    </div>
    : <div>
      {orders && orders.length==0
      ?<div className='bg-black text-white p-4'>
        <Navbar/>
       
        <section className='h-[100vh] flex justify-center items-center'>
            <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-8'>
                <div>
                    <Lottie animationData={empty} className='h-[10rem] sm:h-[18rem] lg:h-[25rem]' loop/>
                </div>
                <p className='font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>No orders yet</p>
            </div>
        </section>
        
        <Footer/>
      </div>
      :<div className='bg-white text-black p-4'>

             <NavLink 
            to='/'
            className='absolute flex items-center top-4 right-4  text-orange-600 border-2 rounded-2xl py-2 px-4 hover:border-orange-500 border-orange-600 duration-200'>
                <ArrowLeft className="h-5 w-5" />
                Home
            </NavLink>

            <section className='mt-8'>
                <div>
                    <Lottie animationData={Delivery} className='h-[10rem] sm:h-[18rem] lg:h-[25rem]' loop/>
                </div>
            </section>

            <p className='font-bold text-center my-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Preparing your order...</p>

            <section className='px-4 md:px-12 lg:px-24'>
                <p className='font-semibold mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Your Orders</p>
                {orderItems.map((item)=>(
                    <div key={item._id} className='p-4 flex flex-col gap-4 sm:flex-row border items-center justify-around rounded-2xl'>
                        <div>
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/${item.itemImg}`} alt="Item image" className="h-20 w-20 md:h-32 md:w-32 rounded-md object-cover"/>
                        </div>
                        <div>
                            <p className='font-semibold text-[16px] sm:text-xl md:text-2xl'>{item.name}</p>
                            <p className='text-[13px] sm:text-[15px] md:text-[18px]'>X {item.quantity}</p>
                            <div className='flex mt-6 items-center'>
                            <p className='text-[14px] sm:text-[16px] md:text-[18px]'>Paid with</p>
                            <img src='/stripe_logo.png' alt="Stripe" className='h-[45px] sm:h-[55px] md:h-[70px]'/>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>}
    </div>
    }
     </>
  )
}

export default OrdersPage
