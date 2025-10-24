import React from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Profile = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    api.get('/api/user/logout')
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
  return (
    <div>
      <button
      onClick={handleLogout}
      className="relative bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded-xl">
        Logout
      </button>
    </div>
  )
}

export default Profile
