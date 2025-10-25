const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./Routes/user')
const restaurantRouter=require('./Routes/restaurant')
const {handleRestaurantSignup}=require('./controllers/restaurant')
const {handleAddNewItems}=require('./controllers/fooditem')
const {connectToDB}=require('./connection')
const cors=require('cors');
const cookieparser=require('cookie-parser')
const multer=require('multer')
const dotenv=require('dotenv');
const { db } = require('./Models/RestaurantModel');

dotenv.config()

const app=express();
const PORT=7000;
connectToDB('mongodb://127.0.0.1:27017/quickbite')
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

app.post('/api/restaurant/signup',upload.single('image'),handleRestaurantSignup)
app.post('/api/restaurant/:id/newitem',upload.single('image'),handleAddNewItems)


app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

