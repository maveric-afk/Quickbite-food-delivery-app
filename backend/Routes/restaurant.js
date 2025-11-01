const express=require('express')
const {handleRestaurantSignin,handleVerifyEmail,handleGetRestaurant,handleLogout,handleGetAllRestaurants,handleGetRestaurantWithId,handleClearOrder}=require('../controllers/restaurant')
const router=express.Router();
const {LoggedinRestaurantOnly}=require('../middlewares/restaurant')
const {LoggedinUserOnly}=require('../middlewares/user')

router.get('/',handleGetRestaurant)
router.get('/logout',handleLogout)
router.get('/all',handleGetAllRestaurants)
router.get('/:id',handleGetRestaurantWithId)

router.post('/verifyemail',handleVerifyEmail)
router.post('/signin',handleRestaurantSignin)

router.patch('/clearorder',handleClearOrder)


module.exports=router