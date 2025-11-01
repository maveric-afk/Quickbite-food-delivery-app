const express=require('express');
const {handleVerifyEmail,handleUserSignin,handleUserSignup,handleGetUser,handleLogout,handleAddItemCart,handleRemoveItemCart,handleEditUserAddress,handleGetUserWithID}=require('../controllers/user');

const router=express.Router();

router.get('/',handleGetUser);
router.get('/:id',handleGetUserWithID)
router.get('/logout',handleLogout)

router.patch('/cart/add/:id',handleAddItemCart)
router.patch('/cart/remove/:id',handleRemoveItemCart);
router.patch('/address',handleEditUserAddress)

router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin);
router.post('/verifyemail',handleVerifyEmail);



module.exports=router