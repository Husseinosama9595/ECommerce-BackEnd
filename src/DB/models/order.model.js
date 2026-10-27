import mongoose, { Schema } from "mongoose";

const orderSchema=new Schema({
    
},{timestamps:true})




export const orderModel=mongoose.model("order",orderSchema);