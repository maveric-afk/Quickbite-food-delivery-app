const {getUser}=require('../Authentication/jwtAuth')

function LoggedinUserOnly(req,res,next){
    const token=req.cookies?.token;
    if(!token){
        return res.json({loginError:'Not logged in'});
    }
    const user=getUser(token);
    if(!user){
        return res.json({loginError:'Not logged in'});
    }

    next();
}

module.exports={LoggedinUserOnly}