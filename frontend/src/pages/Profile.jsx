import React from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'


const Profile = () => {
  const [user,setUser]=useState({})
  const [profileImg,setProfileImg]=useState(null)
  const [editimage,setEditImg]=useState(false)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate=useNavigate();

  const handleLogout=()=>{
    api.get('/api/user/logout/user')
    .then((res)=>{
      if(res.data.success){
        toast.success(res.data.success);
        navigate('/');
      }
      else{
        toast.error(res.data.error)
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  useEffect(()=>{
    api.get('/api/user/')
    .then((res)=>{
      setUser(res.data.user);
    })
  },[])

  function onSubmit(data) {
    setEditImg(false)
    const formdata=new FormData();
    formdata.append('profileImg',profileImg)
    api.patch('/api/user/editprofileimg',formdata)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin');
      }
      else if(res.data.success){
        toast.success(res.data.success);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
    className='bg-black px-8 overflow-hidden'>
      <Navbar/>

      {editimage
      ?<div className='absolute z-30 p-12 rounded-2xl bg-white border-orange-600 text-black'>
        <span className='absolute z-50 top-4 right-4 text-orange-600 font-extrabold cursor-pointer' onClick={(e)=>{setEditImg(false)}}>X</span>
        <form 
        className='flex flex-col sm:flex-row gap-4'
        encType='multipart/form-data'
        onSubmit={handleSubmit(onSubmit)}
        >
          <input
          required 
          onChange={(e)=>{setProfileImg(e.target.files[0])}}
         className='p-4 rounded-2xl border-orange-600'
          type="file" />
          <button
          className="bg-orange-600 text-white hover:bg-orange-500 px-3 py-1 rounded-xl">Upload</button>
        </form>

      </div>
      :<div></div>}

      <header className='mt-12 mb-24'>
    <div className='flex flex-col sm:flex-row p-12 items-center gap-8 sm:gap-16 md:gap-20 rounded-2xl bg-black hover:bg-gray-950 duration-200'>
        <div>
        {user.ProfileImg
        ?<img 
          className='rounded-full object-cover h-[8rem] w-[8rem] sm:h-[12rem] sm:w-[12rem] lg:h-[16rem] lg:w-[16rem] hover:scale-105 duration-200'
          src={`${import.meta.env.VITE_API_BASE_URL}/${user.ProfileImg}`} alt="Profile pic" />
        :<img
        src='/Dummyavatar.jpg'
        className='rounded-full h-[8rem] w-[8rem] sm:h-[12rem] sm:w-[12rem] lg:h-[16rem] lg:w-[16rem] hover:scale-105 duration-200'
        />}

        <button
        onClick={(e)=>{setEditImg(true)}}
        className="mt-4 bg-orange-600 text-white hover:bg-orange-500 px-3 py-1 rounded-xl">
          Edit
        </button>
        </div>

        <div>
          <p className='text-lg sm:text-xl md:text-2xl font-bold text-white'><span className='font-extrabold text-orange-600'>Username:</span> {user.FullName}</p>
           <p className='text-sm mt-4 sm:text-lg md:text-xl text-white'><span className='font-extrabold text-orange-600'>Email:</span> {user.Email}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 p-12 rounded-2xl sm:grid-cols-2 gap-8 bg-black duration-200'>
        <button 
        onClick={(e)=>{navigate('/cart')}}
        className='px-12 py-8 flex justify-center items-center rounded-2xl hover:scale-105 bg-black text-white font-extrabold hover:text-orange-600 duration-200 hover:border hover:border-orange-600'>Cart</button>
        <button 
        onClick={(e)=>{navigate('/orders')}}
        className='px-12 py-4 flex justify-center items-center rounded-2xl bg-black text-white font-extrabold hover:text-orange-600 duration-200 hover:border hover:border-orange-600'>Orders</button>
        <button 
        onClick={(e)=>{navigate('/help')}}
        className='px-12 py-4 flex justify-center items-center rounded-2xl bg-black text-white font-extrabold hover:text-orange-600 duration-200 hover:border hover:border-orange-600'>Terms & conditions</button>
        <button 
        onClick={handleLogout}
        className='px-12 py-4 flex justify-center items-center rounded-2xl bg-black text-white font-extrabold hover:text-orange-600 duration-200 hover:border hover:border-orange-600'>Logout</button>
      </div>
      </header>

      <Footer/>
    </motion.div>
  )
}

export default Profile
