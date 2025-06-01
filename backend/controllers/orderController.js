import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

const currency = 'inr'
const deliverycharge = 10

// GATE WAY INITIALIZATION
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


// placing orders using cash on delivery method
const placeOrder = async(req,res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount, 
            address,
            paymentMethod:"COD", 
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({
            success:true,
            message:"Order Placed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


// placing orders using Stripe
const placeOrderStripe = async(req,res)=>{

}


// placing orders using Razorpay
const placeOrderRazorpay = async(req,res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount, 
            address,
            paymentMethod:"Razorpay", 
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    message: error.message
                });
            }
            res.json({
                success: true,
                order
            });
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const verifyRazorpay = async(req,res)=>{
    try{
        const {userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo);
        if(orderInfo.status == 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true}) // here we are updating the payment status of the order
            await userModel.findByIdAndUpdate(userId, {cartData:{}}) // here we are clearing the cart data of the user
            res.json({success:true, message:'Payment  Successful'});
        }
        else{
            res.json({success:false, message:'Payment Failed'});
        }
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


// controller function using this we will diaplay all the orders on our admin panel 

// All orders data for admin panel 
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({}) 
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// User order data for frontend 
// display the orders for the particular user i.e my orders page 
const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body; // using this userid we can find all the orders  
        const orders = await orderModel.find({userId})
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// update order status from admin panel
const updateStatus  = async(req,res)=>{
    try {
        const{orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status}) // status sent will be updated in database 
        res.json({success:true, message:'Status updated'})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export {verifyRazorpay, updateStatus, userOrders, allOrders, placeOrderRazorpay, placeOrderStripe, placeOrder}

// using this controller function we will create routes 