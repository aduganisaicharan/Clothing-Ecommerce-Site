import express from 'express'
import {addProduct,removeProduct, listProducts, singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

// use this express package to create one router 
const productRouter = express.Router(); // using this product router we will create multiple routes 
// we add this multer middleware that process the multipart form data
productRouter.post('/add',adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]),addProduct);// using fields we process multipart form data // use this middleware in appproduct route because on this route we have to send multiple images that will be passed using the multiple middle ware
productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts)
// hence we created these 4 routes using this controller function

// export productrouter that we will use this in express server

export default productRouter














 // multipart form data
 // multer
 // 