const {getRestaurant}=require('../Authentication/jwtAuth')


function LoggedinOnly(req,res,next) {
  const token=req.cookies?.token;
  if(!token){
    return res.json({loginError:'Not logged in'});
  }
  const restaurant=getRestaurant(token);
  if(!restaurant){
    return res.json({loginError:'Not logged in'});
  } 

  next(); 
}

module.exports={LoggedinOnly}