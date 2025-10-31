const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./Routes/user')
const restaurantRouter=require('./Routes/restaurant')
const fooditemRouter=require('./Routes/fooditem')
const {handleRestaurantSignup}=require('./controllers/restaurant')
const {handleAddNewItems}=require('./controllers/fooditem')
const {handleEditProfileImg}=require('./controllers/user')
const {connectToDB}=require('./connection')
const cors=require('cors');
const cookieparser=require('cookie-parser')
const multer=require('multer')
const dotenv=require('dotenv');
const {LoggedinUserOnly}=require('./middlewares/user')
const { db } = require('./Models/RestaurantModel');

dotenv.config()

const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)


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
        cancel_url:`http://localhost:5173/cancel`
    });

    return res.json({sessionURL:session.url})
})

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

