const nodemailer=require('nodemailer');
const UserModel=require('../Models/UserModel')
const bcrypt=require('bcrypt')
const {setUser,getUser}=require('../Authentication/jwtAuth')

const transporter=nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user:'guptachirag965@gmail.com',
            pass:'pwqufjneklttqzts'
        }
    }
)  

const sendmail=(to,sub,msg)=>{
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    })
}

async function handleVerifyEmail(req,res) {
    const body=req.body;
  const otp=Math.floor(Math.random()*10000) + 1000;
  sendmail(body.email,'Otp Verification for Your Quickbite Account'
    ,`<h2>Dear ${body.fullName}</h2><br><br>

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
        Password:hashedPassword
    })

    return res.json({message:'Account Created'})
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
    res.cookie('token',token, {
  httpOnly: true,     
  secure: true,       
  sameSite: "none",    
  maxAge: 1000 * 60 * 60 * 24,
});

return res.json({success:'Logged in'})

}

async function handleGetUser(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:'Not logged in'})
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:'Not logged in'});
    }
    return res.json({success:'Logged in'});
}

async function handleExtraDetails(req,res) {
    
}

module.exports={handleVerifyEmail,handleUserSignup,handleUserSignin,handleGetUser,handleExtraDetails}