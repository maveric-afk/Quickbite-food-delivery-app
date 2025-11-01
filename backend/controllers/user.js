const nodemailer=require('nodemailer');
const Brevo=require('@getbrevo/brevo')
const UserModel=require('../Models/UserModel')
const bcrypt=require('bcrypt')
const {setUser,getUser}=require('../Authentication/jwtAuth');
const fooditemModel = require('../Models/FoodItemModel');

const apiInstance=new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey=process.env.SMTP_PASS
// const transporter=nodemailer.createTransport(
//     {
//         host:'smtp-relay.brevo.com',
//         port:587,
//         auth:{
//             user:process.env.SMTP_USER,
//             pass:process.env.SMTP_PASS
//         }
//     }
// )  

const sendmail=async(to,sub,msg)=>{
    try {
        const sendSmtpMail={
        sender:{email:'guptachirag965@gmail.com',name:"Quickbite"},
        to:[{email:to}],
        subject:sub,
        htmlContent:msg
    }
    const data=await apiInstance.sendTransacEmail(sendSmtpMail);
    console.log('Email sent: ',data.messageId || data)
    } catch (error) {
        console.error('Email failed',error)
    }
}

async function handleVerifyEmail(req,res) {
    const body=req.body;
  const otp=Math.floor(Math.random()*9999) + 1000;
  await sendmail(body.email,'Otp Verification for Your Quickbite Account'
    ,`<h2>Dear ${body.fullName}</h2><br>

Your One-Time Password (OTP) is<br><br> <h1><b>${otp}</b></h1>.
Please use this code to complete your verification.
This OTP is valid for the next 2 minutes.

If you didn't request this, please ignore this email.
<br><br>
Best regards,<br>
<b>QuickBite</b><br>
Chirag Gupta`)

return res.json({otp:otp});
}

async function handleUserSignup(req,res) {
    const body=req.body;
    const hashedPassword=await bcrypt.hash(body.password,10);
    await UserModel.create({
        Email:body.email,
        FullName:body.fullName,
        Password:hashedPassword,
        ContactNo:body.contactno
    })

    return res.json({success:'Account Created'})
}
async function handleUserSignin(req,res) {
    const body=req.body;
    const user=await UserModel.find({Email:body.email});
    if(!user[0]){
        return res.json({error:'No user found'});
    }
    const matchPassword=await bcrypt.compare(body.password,user[0].Password);
    if(!matchPassword){
        return res.json({error:'Credentials do not match'});
    }

    const token=setUser(user[0]);
    res.cookie('tokenA',token, {
  httpOnly: true,     
  secure: true,       
  sameSite: "none",    
  maxAge: 1000 * 60 * 60 * 24,
});

return res.json({success:'Logged in'})

}

async function handleGetUser(req,res) {
    const token=req.cookies?.tokenA;
    if(!token){
        return res.json({error:'Not logged in'})
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:'Not logged in'});
    }
    const userData=await UserModel.find({_id:user.Id})
    return res.json({success:'Logged in',user:userData[0]});
}

async function handleGetUserWithID(req,res) {
    const id=req.params?.id;
    const userwithId=await UserModel.find({_id:id});
    return res.json({user:userwithId[0]})
}

async function handleLogout(req,res) {
    const token=req.cookies?.tokenA;
    if(!token){
        return res.json({error:'Not Logged in'});
    }
    const user=getUser(token);
    if(!user){
         return res.json({error:'Not Logged in'});
    }
     res.cookie('tokenA','',{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  });
    return res.json({success:'Logged out'})
}

async function handleEditProfileImg(req,res) {
    const file=req.file;
    console.log(file)
    const token=req.cookies?.tokenA;
     if(!token){
        return res.json({error:'Not logged in'});
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:'Not logged in'});
    }

    await UserModel.updateOne({_id:user.Id},{$set:{ProfileImg:file.path}});
    return res.json({success:'Profile image changed'});
}

async function handleAddItemCart(req,res) {
    const token=req.cookies?.tokenA;
    const itemId=req.params.id;
    if(!token){
        return res.json({error:'Not logged in'})
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:'Not logged in'})
    }
    const userData=await UserModel.find({_id:user.Id});
    let cart=userData[0].Cart;
    
    let contains=false;
    let quantity;
    for(let i=0;i<cart.length;i++){
        if(cart[i].itemId==itemId){
            contains=true;
            quantity=cart[i].quantity;
            break;
        }
    }

    if(contains){
        await UserModel.updateOne({_id:userData[0]._id,'Cart.itemId': itemId},{$inc:{'Cart.$.quantity':1}})
        quantity++;
    }

    else
    {
            await UserModel.updateOne({_id:userData[0]._id},{$push:{Cart:{itemId:itemId,quantity:1}}});
            quantity=1;
    }
    return res.json({success:'Added',currentQuantity:quantity})
    
}

async function handleRemoveItemCart(req,res) {
    const token=req.cookies?.tokenA;
    const itemId=req.params.id;
    if(!token){
        return res.json({error:"Not logged in"})
    }
    const user=getUser(token)
    if(!user){
        return res.json({error:"Not logged in"})
    }
    const userData=await UserModel.find({_id:user.Id});
    let cart=userData[0].Cart;
    let contains=false;
    let quantity;
    for(let i=0;i<cart.length;i++){
        if(cart[i].itemId==itemId){
            contains=true;
            quantity=cart[i].quantity;
            break;
        }
    }

    if(contains){
        if(quantity>1){
            await UserModel.updateOne({_id:userData[0]._id,'Cart.itemId':itemId},{$inc:{'Cart.$.quantity':-1}})
            quantity--;
        }
        else if(quantity==1){
            await UserModel.updateOne({_id:userData[0]._id},{$pull:{Cart:{itemId:itemId}}});
            quantity=0;
        }
        return res.json({success:'Removed',currentQuantity:quantity})
    }
    else{
        return res.json({null:'Item not added yet',currentQuantity:0})
    }
}

async function handleEditUserAddress(req,res) {
    const body=req.body;
    const token=req.cookies?.tokenA;
    if(!token){
        return res.json({error:"Not logged in"})
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:"Not logged in"})
    }
    const userData=await UserModel.find({_id:user.Id});
    await UserModel.updateOne({_id:user.Id},{$set:{Address:body.address}})
    return res.json({success:"Details updated"})
}


module.exports={handleVerifyEmail,handleUserSignup,handleUserSignin,handleGetUser,handleLogout,handleEditProfileImg,handleRemoveItemCart,handleAddItemCart,handleEditUserAddress,handleGetUserWithID}