import mongoose, { Schema } from "mongoose";

const subCategorySchema=new Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    slug:{
        type:String,
        lowercase:true
    },

    category_id:{
        type:Schema.Types.ObjectId,
        ref:"category",
        required:true
    }

},{})


export const subCategoryModel=mongoose.model("subcategory",subCategorySchema)