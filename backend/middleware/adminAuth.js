// we will add this middleware for those api where we need the admin permission like adding product removing product and to display the orders and some other apis
import jwt from 'jsonwebtoken'

const adminAuth = async(req, res, next)=>{
    try{
        const {token} = req.headers // when we call api from adminauth then in headers we add the token that we getting from the admin login
        // if token is available then continue else we generate response that user is not authorized to access this api  
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)// we use jwt.verify method to decode the token now we get string and we store it in variable
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){ // if not matching then user is not authorized
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// created the admin auth middleware and now we export it
export default adminAuth