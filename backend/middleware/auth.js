// we will authenticate user whenever user add to cart or update or place the order 
// this middleware will convett the user token into user id 
import jwt from 'jsonwebtoken';

const authUser = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:'Not authorized, Login again'})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET); // now it will decode the token and we get the user id 
        req.body.userId = token_decode.id
        next()
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }

}
export default authUser

// we will add this middle ware in cartroute 