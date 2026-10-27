import mongoose, { Schema } from "mongoose";

const reviewSchema=new Schema({

    rating:{
        type:Number,
        min:0,
        max:5,
        required:true

    },
    comment:{
        type:String,

    },
    userId:{
        type:Schema.ObjectId,
        ref:"user",
    },
    productId:{
        type:Schema.ObjectId,
        ref:"product"
    }
},{timestamps:true})






export const reviewModel=mongoose.model("review",reviewSchema)