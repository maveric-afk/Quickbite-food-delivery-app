const express=require('express');
const {handleVerifyEmail,handleUserSignin,handleUserSignup,handleGetUser,handleLogout}=require('../controllers/user');

const router=express.Router();

router.get('/',handleGetUser);
router.get('/logout',handleLogout)

router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin);
router.post('/verifyemail',handleVerifyEmail);

module.exports=router