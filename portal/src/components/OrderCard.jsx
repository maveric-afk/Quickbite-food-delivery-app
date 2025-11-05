import { Mail, MapPin, Phone, User } from "lucide-react";
import api from '../api/axios'
import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function OrderCard({orderId,userId,items=[]}) {
  const [user,setUser]=useState({});
  const [allfoodItems,setAllfoodItems]=useState([])

  useEffect(()=>{
    api.get(`/api/user/${userId}`)
    .then((res)=>{
      if(res.data.user){
        setUser(res.data.user)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(() => {
    api.get('/api/fooditem/all')
      .then((res) => {
       if(res.data.allfoodItems) {
          setAllfoodItems(res.data.allfoodItems);
        }
      })
  }, [])

  const navigate=useNavigate()
  function handleClearOrder() {
    api.patch('/api/restaurant/clearorder',{orderId:orderId,userId:userId,items:items})
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/login')
      }
      else if(res.data.success){
        toast.success(res.data.success)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const OrderedItems=[];
  items.forEach((item,ind)=>{
    allfoodItems.forEach((fooditem,ind)=>{
      if(fooditem._id==item.itemId){
        fooditem.quantity=item.quantity;
        OrderedItems.push(fooditem);
      }
    })
  })

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-gray-200 rounded-lg shadow-sm shadow-black hover:shadow-md transition-shadow duration-300 overflow-hidden">
        {/* Main container - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Food Items */}
          <div className="p-6 lg:border-r border-gray-200">
            <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-3">
              {OrderedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-around gap-2 items-center p-1 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <img src={item.itemImg.startsWith('http')?`${item.itemImg}`:`${import.meta.env.VITE_API_BASE_URL}/${item.itemImg}`} className="h-16 w-16 md:h-28 md:w-28 rounded-2xl" />
                  </div>
                  <div>
                  <p className="text-gray-700 text-[12px] md:text-[16px] font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-700 text-[12px] md:text-[16px] font-medium">
                    x {item.quantity}
                  </p>
                  <p className="text-gray-900 text-[12px] md:text-[16px] font-semibold">
                    Rs.{item.discountprice}
                  </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
            onClick={handleClearOrder}
            className="bg-orange-500 mt-4 text-white font-bold duration-200 hover:bg-orange-600 rounded-2xl p-1 md:p-2">
              Clear
            </button>
          </div>

          {/* Right Side - User Details */}
          <div className="p-6 bg-gray-100">
            <h2 className="text-sm md:text-lg font-semibold text-gray-900  mb-4">
              Delivery Details
            </h2>
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="text-gray-900 text-[12px] md:text-[16px] font-medium">
                    {user.FullName}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                  <p className="text-gray-900 text-[12px] md:text-[16px] font-medium">
                    {user.Address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 text-[12px] md:text-[16px] font-medium break-all">
                    {user.Email}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                  <p className="text-gray-900 text-[12px] md:text-[16px] font-medium">
                    {user.ContactNo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
