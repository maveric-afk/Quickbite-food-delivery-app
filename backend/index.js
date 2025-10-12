const express=require('express');
const mongoose=require('mongoose');
const {connectToDB}=require('./connection')

const app=express();
const PORT=7000;
connectToDB('mongodb://127.0.0.1:27017/quickbite')
.then((res)=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log('Error in connecting MongoDB');
})

app.listen(()=>{
    console.log(`Server started at Port ${PORT}`);
})

