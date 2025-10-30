import React, { useState } from 'react'
import api from '../api/axios'
import { motion } from 'framer-motion'


const CartItem = ({_id,itemImg,name,quantity,discountprice}) => {
    const [quan,setQuan]=useState(quantity);

      const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  function handleQuantityIncrement(e){
    api.patch(`/api/user/cart/add/${_id}`)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      setQuan(res.data.currentQuantity)
    })
  }

  function handleQuantityDecrement(e){
    api.patch(`/api/user/cart/remove/${_id}`)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      else if(res.data.null){
        toast.error(res.data.null);
      }
      setQuan(res.data.currentQuantity)
    })
  }

    return (
        <motion.div
            key={_id}
            variants={itemVariants}
            className="flex gap-4 rounded-lg bg-black p-4 shadow-sm transition-shadow hover:shadow-md"
        >
            <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${itemImg}`}
                alt={name}
                className="h-20 w-20 rounded-md object-cover"
            />
            <div className="flex-1">
                <h3 className="font-semibold text-white">{name}</h3>
                <p className="text-sm text-gray-300">
                    Quantity: <span className="font-medium">{quan}</span>
                </p>
                <p className="mt-1 text-lg font-bold text-orange-600">
                    Rs.{(discountprice * quan).toFixed(2)}
                </p>
            </div>
            <div>
                <span
                    onClick={handleQuantityIncrement}
                    className="cursor-pointer bg-orange-600 p-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                >
                    +
                </span>
                <span
                    className="bg-orange-600 p-2 text-sm font-medium text-white transition-colors"
                >
                    {quan}
                </span>
                <span
                    onClick={handleQuantityDecrement}
                    className="cursor-pointer bg-orange-600 p-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
                >
                    -
                </span>
            </div>
        </motion.div>
    )
}

export default CartItem
