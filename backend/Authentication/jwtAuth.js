const jwt=require('jsonwebtoken');
const secretKey='h6d5j02bdt4aw2u0'

function setUser(user){
    if(!user){
        return null;
    }
    const token=jwt.sign(
        {
            Name:user.FullName,
            Email:user.Email,
            Number:user.ContactNo,
        },secretKey
    );

    return token;
}

function getUser(token){
    if(!token){
        return null;
    }
    const user=jwt.verify(token,secretKey);
    return user;
}

module.exports={setUser,getUser}