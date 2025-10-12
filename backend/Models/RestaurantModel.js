const mongoose=require('mongoose')

const restaurantSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
    },
    fooditems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'fooditems'
        }
    ]
},{timestamps:true})

const restaurantModel=mongoose.Model('restaurant',restaurantSchema);

module.exports=restaurantModel