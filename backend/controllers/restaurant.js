const restaurantModel = require('../Models/RestaurantModel')
const nodemailer = require('nodemailer')
const Brevo=require('@getbrevo/brevo')
const bcrypt = require('bcrypt')
const { setRestaurant, getRestaurant } = require('../Authentication/jwtAuth')
const fooditemModel = require('../Models/FoodItemModel')
const UserModel = require('../Models/UserModel')

const apiInstance=new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey=process.env.SMTP_RESTAURANT_PASS
// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_RESTAURANT_PASS
//     }
// })

const sendmail=async(to,sub,msg)=>{
    try {
        const sendSmtpMail={
        sender:{email:'guptachirag965@gmail.com',name:"Quickbite"},
        to:[{email:to}],
        subject:sub,
        htmlContent:msg
    }
    const data=await apiInstance.sendTransacEmail(sendSmtpMail);
    console.log('Email sent: ',data.messageId || data)
    } catch (error) {
        console.error('Email failed',error)
    }
}

async function handleRestaurantSignin(req, res) {
    const body = req.body;
    const restaurant = await restaurantModel.find({ email: body.email });
    if (!restaurant[0]) {
        return res.json({ error: 'No restaurant found' });
    }
    const matchPassword = await bcrypt.compare(body.password, restaurant[0].password);
    if (!matchPassword) {
        return res.json({ error: 'Wrong Credentials' });
    }

    const token = setRestaurant(restaurant[0]);
    res.cookie('tokenB', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json({ success: 'Logged in' })
}


async function handleRestaurantSignup(req, res) {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await restaurantModel.create({
        image: req.file.path,
        name: body.name,
        email: body.email,
        password: hashedPassword,
        location: body.address
    })

    return res.json({ success: 'Account created' })
}


async function handleVerifyEmail(req, res) {
    const body = req.body;
    const otp = Math.floor(Math.random() * 9999) + 1000;
    await sendmail(body.email, 'Otp verification for Quickbite'
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

    return res.json({ otp: otp })
}


async function handleGetRestaurant(req, res) {
    const token = req.cookies?.tokenB;
    if (!token) {
        return res.json({ error: 'Not logged in' })
    }
    const restaurant = getRestaurant(token);
    if (!restaurant) {
        return res.json({ error: 'Not logged in' });
    }
    const restaurantData = await restaurantModel.find({ _id: restaurant.Id });
    return res.json({ success: 'Logged in', restaurant: restaurantData[0] });
}

async function handleLogout(req, res) {
    const token = req.cookies?.tokenB;
    if (!token) {
        return res.json({ error: 'Not Logged in' });
    }
    const restaurant = getRestaurant(token);
    if (!restaurant) {
        return res.json({ error: 'Not Logged in' });
    }
    res.cookie('tokenB','',{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  });
    return res.json({ success: 'Logged out' })
}

async function handleGetAllRestaurants(req, res) {
    const allRestaurants = await restaurantModel.find({});
    return res.json({ allRestaurants: allRestaurants })
}

async function handleGetRestaurantWithId(req, res) {
    const id = req.params?.id;
    const restaurant = await restaurantModel.find({ _id: id });
    return res.json({ restaurant: restaurant[0] })
}

async function handleAddingOrders(item, userId) {
    let itemId = item.itemId;
    const itemData = await fooditemModel.find({ _id: itemId });
    const restaurant = await restaurantModel.find({ _id: itemData[0].restaurant });
   
    const restaurantOrders = restaurant[0].orders;
    let contains=false;
    for(let i=0;i<restaurantOrders.length;i++){
        let someOrder=restaurantOrders[i];
        if(someOrder.orderedBy==userId){
            contains=true;
            break;
        }
    }
    if(contains){
        await restaurantModel.updateOne({_id:restaurant[0]._id,'orders.orderedBy':userId},{$push:{'orders.$.items':item}})
    }
    else{
        await restaurantModel.updateOne({_id:restaurant[0]._id},{$push:{orders:{items:[],orderedBy:userId}}});
        await restaurantModel.updateOne({_id:restaurant[0]._id,'orders.orderedBy':userId},{$push:{'orders.$.items':item}});
    }
}


async function handleClearOrder(req,res) {
    const token=req.cookies?.tokenB;
    if(!token){
        return res.json({error:"Not logged in"})
    }
    const restaurant=getRestaurant(token);
    if(!restaurant){
        return res.json({error:"Not logged in"})
    }
    const body=req.body;
    await restaurantModel.updateOne({_id:restaurant.Id},{$pull:{orders:{_id:body.orderId}}});
    for(const item of body.items){
        await UserModel.updateOne({_id:body.userId},{$pull:{LiveOrders:{itemId:item.itemId}}})
    }
    return res.json({success:"Order cleared"})
}

module.exports = { handleRestaurantSignin, handleGetRestaurantWithId, handleRestaurantSignup, handleVerifyEmail, handleGetRestaurant, handleLogout, handleGetAllRestaurants, handleAddingOrders,handleClearOrder }