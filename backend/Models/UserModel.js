const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    ProfileImg:{
        type:String,
    },
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'normal'
    },
    ContactNo:{
        type:Number,
        required:true,
    },
    Address:{
        type:String,
    },
    Cart:[
       {
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'fooditems',
        },
        quantity:{
            type:Number,
            required:true,
        }
       } 
    ],
    LiveOrders:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'fooditems',
        },
        quantity:{
            type:Number,
            required:true,
        }
       } 
    ],
    PastOrders:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'fooditems',
        },
        quantity:{
            type:Number,
            required:true,
        }
       } 
    ]
},{timestamps:true})

const UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel

