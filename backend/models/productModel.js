// model for product
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,  required:true},  // if i dont provide name then this data will not be saved in database
    description:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    subCategory:{type:String, required:true},
    bestSeller:{type:Boolean},
    sizes:{type:Array, required:true},
    image:{type:Array, required:true},
    date:{type:Number,required:true}
})

// using this schema create one model  ====---->>  model(name, schema) is the ssyntax
const productModel = mongoose.models.product || mongoose.model("product",productSchema) // if product model already exist then use it other wise create it 

export default productModel