import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}} // when we create user using mongoose then this cartdata will be unavailable
    // because mongoose neglect the property where we have one empty object that's why we used minimize:false hence it will create now 
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel                