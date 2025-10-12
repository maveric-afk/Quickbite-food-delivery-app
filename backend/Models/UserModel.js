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
    UserName:{
        type:String,
        required:true,
        unique:true
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
    ContactNo:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    LiveOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        
    }],
    PastOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        
    }]
},{timestamps:true})

const UserModel=mongoose.Model('user',UserSchema);

module.exports=UserModel

