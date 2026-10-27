import mongoose, { Schema } from "mongoose";

const couponSchema=new Schema({

},{timestamps:true})




export const couponModel=mongoose.model("coupon",couponSchema)