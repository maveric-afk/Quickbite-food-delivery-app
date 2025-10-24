const jwt=require('jsonwebtoken');
const secretUserKey='h6d5j02bdt4aw2u0'
const secretRestaurantKey='fjdhs843vw483fsf3'

function setUser(user){
    if(!user){
        return null;
    }
    const token=jwt.sign(
        {
            Name:user.FullName,
            Email:user.Email,
            Number:user.ContactNo,
        },secretUserKey
    );

    return token;
}

function getUser(token){
    if(!token){
        return null;
    }
    const user=jwt.verify(token,secretUserKey);
    return user;
}


function setRestaurant(restaurant){
    if(!restaurant){
        return null;
    }
    const token=jwt.sign({
        Name:restaurant.name,
        Email:restaurant.email,
        Address:restaurant.location
    },secretRestaurantKey);

    return token;
}

function getRestaurant(token){
    if(!token){
        return null;
    }

    const restaurant=jwt.verify(token,secretRestaurantKey);
    return restaurant;
}


module.exports={setUser,getUser,setRestaurant,getRestaurant}