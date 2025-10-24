const express=require('express')
const {handleRestaurantSignin,handleRestaurantSignup,handleVerifyEmail,handleGetRestaurant,handleLogout}=require('../controllers/restaurant')
const router=express.Router();

router.get('/',handleGetRestaurant)
router.get('/logout',handleLogout)

router.post('/verifyemail',handleVerifyEmail)
router.post('/signup',handleRestaurantSignup)
router.post('/signin',handleRestaurantSignin)

module.exports=router