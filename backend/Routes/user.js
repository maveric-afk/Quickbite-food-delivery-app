const express=require('express');
const {handleVerifyEmail,handleUserSignin,handleUserSignup,handleGetUser,handleExtraDetails}=require('../controllers/user');

const router=express.Router();

router.get('/',handleGetUser);

router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin);
router.post('/verifyemail',handleVerifyEmail);
router.post('/extradetails',handleExtraDetails);

module.exports=router