import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get',authUser, getUserCart) // first token will be verified and using that token we will get userId in body 
cartRouter.post('/update',authUser, updateCart)
cartRouter.post('/add',authUser, addToCart)

export default cartRouter