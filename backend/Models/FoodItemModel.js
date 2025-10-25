const mongoose=require('mongoose');

const fooditemSchema=new mongoose.Schema({
    itemImg:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    actualprice:{
        type:Number,
        required:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'restaurants'
    },
    rating:{
        type:Number,
    },
    discountprice:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
},{timestamps:true})

const fooditemModel=mongoose.model('fooditem',fooditemSchema);

module.exports=fooditemModel