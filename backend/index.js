const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./Routes/user')
const restaurantRouter=require('./Routes/restaurant')
const {connectToDB}=require('./connection')
const cors=require('cors');
const cookieparser=require('cookie-parser')
const dotenv=require('dotenv')

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

app.use('/api/user',userRouter);
app.use('/api/restaurant',restaurantRouter);

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

