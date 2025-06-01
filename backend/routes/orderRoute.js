import express from 'express';
import {updateStatus, userOrders, allOrders, placeOrderRazorpay, placeOrderStripe, placeOrder, verifyRazorpay} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features  
orderRouter.post('/list',adminAuth,allOrders); // --> here the end point will be list
orderRouter.post('/status',adminAuth,updateStatus); // --> here the end point will be status

// Payment Features 
orderRouter.post('/place',authUser,placeOrder); // --> here the end point will be place
orderRouter.post('/stripe',authUser,placeOrderStripe); // --> here the end point will be stripe
orderRouter.post('/razorpay',authUser,placeOrderRazorpay); // --> here the end point will be razorpay

// User Features
orderRouter.post('/userorders',authUser,userOrders); // --> here the end point will be usersorders

// verify payments
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay); // --> here the end point will be verifyRazorpay

export default orderRouter
