const mongoose=require('mongoose')

const restaurantSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
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
    ],
    orders:[
        {
            items:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'fooditems'
                }
            ],
            orderedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ]
},{timestamps:true})

const restaurantModel=mongoose.model('restaurant',restaurantSchema);

module.exports=restaurantModel