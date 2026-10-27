import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({

},{timestamps:true})



export const cartModel=mongoose.model("cart",cartSchema)
