const restaurantModel = require('../Models/RestaurantModel')
const nodemailer = require('nodemailer')
const bcrypt=require('bcrypt')
const {setRestaurant,getRestaurant}=require('../Authentication/jwtAuth')

const transporter = nodemailer.createTransport({
    secure: false,
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:`${process.env.SMTP_RESTAURANT_USER}`,
        pass: `${process.env.SMTP_RESTAURANT_PASS}`
    }
})

function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    })
}



async function handleRestaurantSignin(req, res) {
    const body=req.body;
    const restaurant=await restaurantModel.find({email:body.email});
    if(!restaurant[0]){
        return res.json({error:'No restaurant found'});
    }
    const matchPassword=await bcrypt.compare(body.password,restaurant[0].password);
    if(!matchPassword){
        return res.json({error:'Wrong Credentials'});
    }

    const token=setRestaurant(restaurant[0]);
    res.cookie('token',token,{
  httpOnly: true,     
  secure: true,       
  sameSite: "none",    
  maxAge: 1000 * 60 * 60 * 24,
});

return res.json({success:'Logged in'})
}


async function handleRestaurantSignup(req, res) {
    const body=req.body;
    const hashedPassword=await bcrypt.hash(body.password,10);
    await restaurantModel.create({
        image:req.file.path,
        name:body.name,
        email:body.email,
        password:hashedPassword,
        location:body.address
    })

    return res.json({success:'Account created'})
}


async function handleVerifyEmail(req, res) {
    const body = req.body;
    const otp = Math.floor(Math.random() * 9999) + 1000;
    sendMail(body.email, 'Otp verification for Quickbite'
        ,
        `<h2>Dear ${body.name}</h2><br>
You are just one step away to Join Quickbite.<br>
Your One-Time Password (OTP) is<br><br> <h1><b>${otp}</b></h1>.
Please use this code to complete your verification.
This OTP is valid for the next 2 minutes.

If you didn't request this, please ignore this email.
<br><br>
Best regards,<br>
<b>QuickBite</b>
`
    );

    return res.json({otp:otp})
}


async function handleGetRestaurant(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:'Not logged in'})
    }
    const restaurant=getRestaurant(token);
    if(!restaurant){
        return res.json({error:'Not logged in'});
    }
    const restaurantData=await restaurantModel.find({_id:restaurant.Id});
    return res.json({success:'Logged in',restaurant:restaurantData[0]});
}

async function handleLogout(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:'Not Logged in'});
    }
    const restaurant=getRestaurant(token);
    if(!restaurant){
         return res.json({error:'Not Logged in'});
    }
    res.cookie('token','');
    return res.json({success:'Logged out'})
}

async function handleGetAllRestaurants(req,res) {
    const allRestaurants=await restaurantModel.find({});
    return res.json({allRestaurants:allRestaurants})
}

async function handleGetRestaurantWithId(req,res) {
    const id=req.params?.id;
    const restaurant=await restaurantModel.find({_id:id});
    return res.json({restaurant:restaurant[0]})
}

module.exports = { handleRestaurantSignin, handleGetRestaurantWithId,handleRestaurantSignup, handleVerifyEmail,handleGetRestaurant,handleLogout ,handleGetAllRestaurants}