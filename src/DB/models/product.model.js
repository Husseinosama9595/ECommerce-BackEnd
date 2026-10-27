import mongoose, { Schema } from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:[3],
        maxlength:[30]
    },
    price:{
        type:Number,
        required:true,
        
    },
    description:{
        type:String,
        required:true
        
    },
    size:[String],
    color:[String],
    available:Boolean,
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true

    }


},{timestamps:true})



export const productModel=mongoose.model("product",productSchema)