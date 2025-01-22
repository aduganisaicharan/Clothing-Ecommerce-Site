import userModel from "../models/userModel.js"

// add products to user cart --> we added the logic for the add to cart 
const addToCart = async(req,res)=>{ // here we will get the userid 
    // we will use the other req body property to update the product data in the usersc cart 
    try{
        const {userId, itemId, size} = req.body
        // using this userid we will find it from usermodel we add this item id and size in cart data 
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        // we need to add this updated cart data in the userdata 
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to cart"})

    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }

}

// update user cart
const updateCart = async(req,res)=>{
    try {
        const {userId, itemId, size, quantity} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"cart updated"})

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// get user cart data
const getUserCart = async(req,res)=>{
    try {
        const {userId} = req.body;
        const userData  = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// now we integrated the cart api with frontend

export {addToCart, updateCart, getUserCart}