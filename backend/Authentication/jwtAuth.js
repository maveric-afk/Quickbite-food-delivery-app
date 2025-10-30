const jwt=require('jsonwebtoken');

function setUser(user){
    if(!user){
        return null;
    }
    const token=jwt.sign(
        {
            Id:user._id,
            Name:user.FullName,
            Email:user.Email,
            Number:user.ContactNo,
        },process.env.JWT_SECRET_USER_KEY
    );

    return token;
}

function getUser(token){
    if(!token){
        return null;
    }
    const user=jwt.verify(token,process.env.JWT_SECRET_USER_KEY);
    return user;
}


function setRestaurant(restaurant){
    if(!restaurant){
        return null;
    }
    const token=jwt.sign({
        Id:restaurant._id,
        Name:restaurant.name,
        Email:restaurant.email,
        Address:restaurant.location
    },process.env.JWT_SECRET_RESTAURANT_KEY);

    return token;
}

function getRestaurant(token){
    if(!token){
        return null;
    }

    const restaurant=jwt.verify(token,process.env.JWT_SECRET_RESTAURANT_KEY);
    return restaurant;
}


module.exports={setUser,getUser,setRestaurant,getRestaurant}