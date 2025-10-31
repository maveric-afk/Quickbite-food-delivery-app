const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./Routes/user')
const restaurantRouter=require('./Routes/restaurant')
const fooditemRouter=require('./Routes/fooditem')
const {handleRestaurantSignup,handleAddingOrders}=require('./controllers/restaurant')
const {handleAddNewItems}=require('./controllers/fooditem')
const {handleEditProfileImg}=require('./controllers/user')
const {connectToDB}=require('./connection')
const cors=require('cors');
const cookieparser=require('cookie-parser')
const multer=require('multer')
const dotenv=require('dotenv');
const {LoggedinUserOnly}=require('./middlewares/user')
const { db } = require('./Models/RestaurantModel');
const UserModel = require('./Models/UserModel');
const { getUser } = require('./Authentication/jwtAuth');
const restaurantModel = require('./Models/RestaurantModel');
const fooditemModel = require('./Models/FoodItemModel');

dotenv.config()

const stripe=require('stripe')("sk_test_51SNoXkRqgyn51fCGuB0UXm0kJxhSWL2SdbDc9UrzneruL6fsdKy2ZPfdl1ic6O93OqZ9GUc9xFqP6hqP67pzZW6c00qEaCE8bm")


const app=express();
const PORT=process.env.PORT || 7000;

connectToDB(process.env.MONGO_URI)
.then((res)=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log('Error in connecting MongoDB');
})

app.use(express.urlencoded({extended:false}));


//we dont need parsed body for this route
app.post('/api/stripe-webhook',express.raw({ type: "application/json" }),async(req,res)=>{
     const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_4EUpN9tA17RenMvTwIE69D0h6yXBWN2Q');
    } catch (err) {
      console.log("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const userId=session.metadata.userId;
        console.log("💰 Payment successful!", session);
        const userData=await UserModel.find({_id:userId})
        const cart=userData[0].Cart;
        await UserModel.updateOne({_id:userId},{$set:{Cart:[],LiveOrders:cart}});
        
        for(const item of cart){
            await handleAddingOrders(item,userId);
        }
        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object;
        console.log("❌ Payment failed!", paymentIntent);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send({ received: true });

})

app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(cookieparser());


const allowedOrigins=[
    'http://localhost:5173',
    'http://localhost:5174'
]
app.use(cors(
    {
    origin: allowedOrigins,
    credentials: true, 
  }
));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage:storage})

app.use('/api/user',userRouter);
app.use('/api/restaurant',restaurantRouter);
app.use('/api/fooditem',fooditemRouter);

app.post('/api/restaurant/signup',upload.single('image'),handleRestaurantSignup)
app.post('/api/restaurant/:id/newitem',upload.single('image'),handleAddNewItems)

app.patch('/api/user/editprofileimg',upload.single('profileImg'),handleEditProfileImg)

//payment gateway
app.post('/api/create-checkout-session',async(req,res)=>{
    const {cartItems}=req.body;
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"})
    }
    const user=getUser(token);
    if(!user){
         return res.json({error:"Not logged in"})
    }

    const lineItems=cartItems.map((item)=>({
        price_data:{
            currency:'inr',
            product_data:{
                name:item.name,
            },
            unit_amount:item.discountprice*100,
        },
        quantity:item.quantity,
    }));

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card",'sepa_debit','bancontact'],
        line_items:lineItems,
        mode:'payment',
        success_url:`http://localhost:5173/success`,
        cancel_url:`http://localhost:5173/cancel`,
        metadata: {
             userId: user.Id.toString(),
         },
    });

    return res.json({sessionURL:session.url})
})


app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

