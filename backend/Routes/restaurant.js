const express=require('express')
const {handleRestaurantSignin,handleVerifyEmail,handleGetRestaurant,handleLogout,handleGetAllRestaurants,handleGetRestaurantWithId}=require('../controllers/restaurant')
const router=express.Router();
const {LoggedinOnly}=require('../middlewares/restaurant')

router.get('/',handleGetRestaurant)
router.get('/logout',handleLogout)
router.get('/all',handleGetAllRestaurants)
router.get('/:id',handleGetRestaurantWithId)

router.post('/verifyemail',handleVerifyEmail)
router.post('/signin',handleRestaurantSignin)


module.exports=router