const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    ProfileImg:{
        type:String,
        required:false
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
        required:false,
    },
    LiveOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'fooditems',
        
    }],
    PastOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'fooditems',
        
    }]
},{timestamps:true})

const UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel

