const express=require('express')
const {handleRestaurantSignin,handleVerifyEmail,handleGetRestaurant,handleLogout}=require('../controllers/restaurant')
const router=express.Router();
const {LoggedinOnly}=require('../middlewares/restaurant')

router.get('/',handleGetRestaurant)
router.get('/logout',handleLogout)

router.post('/verifyemail',handleVerifyEmail)
router.post('/signin',handleRestaurantSignin)

module.exports=router