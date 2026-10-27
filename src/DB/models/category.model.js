import mongoose, { Schema } from "mongoose";


const categorySchema=new Schema({
    name:{
        type:String,
        required:[true,"name must be provided"],
        minlength:[3,"category name must be atleast 3 characters"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:{
       secure_url:{
        type:String,
        required:true
       },
       public_id:{
        type:String,
        required:true
       }
    }

},{timestamps:true})



export const categoryModel=mongoose.model("category",categorySchema)