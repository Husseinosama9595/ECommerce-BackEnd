import mongoose, { Schema } from "mongoose";

const brandSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:[2,"Brand name must be atleast 2 characters"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    logo:{
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    subcategory_id:{
        type:Schema.ObjectId,
        ref:"subcategory",
        required:true
    }


},{})


export const brandModel=mongoose.model("brand",brandSchema)