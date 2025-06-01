import {v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js'
// function for adding product
const addProduct = async(req,res)=>{
    // to add a product we will create middleware using multer = if we send any file as form data will be piled using multer 
    try{
        const {name, description, category, price, subCategory, sizes, bestSeller} = req.body; // product details ;
        // console.log(bestSeller)
        // we get product images using req.files 
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        console.log(image1,image2, image3, image4)
        // we cannot store these images in database hence we store these in cloudinary and the url from that will be stored in database 
        const images = [image1,image2, image3, image4].filter((item)=>item!==undefined);
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        // to save all these data in mongodb 

        const productData = {
            name, 
            description, 
            category, 
            price:Number(price), 
            subCategory,
            bestSeller: bestSeller,
            sizes:JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()
        }
        console.log(productData)

        const product = new productModel(productData)
        await product.save()  
        res.json({
            success:true,
            message:"Product Added"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

// function for list products
const listProducts = async(req,res)=>{
    try{
        const products = await productModel.find({});
        // console.log(products);
        res.json({
            success:true,products
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

// function for removing products
const removeProduct = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"product removed"})
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

// function for single products
const singleProduct = async(req,res)=>{
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product})
    }catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

export {addProduct,removeProduct, listProducts, singleProduct}