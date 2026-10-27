import mongoose, { Schema } from "mongoose";
import { RoleTypes } from "../../MiddleWares/authentication.middle.js";

const userScehma =new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"name must be atleast 3 characters"],
        maxlength:[30,"name must be maximum 30 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        match:[/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/,"password must contain 1 number (0-9) password must contain 1 uppercase letters password must contain 1 lowercase letters password must contain 1 special character password is 8-64 characters with no space"]
    },
    gender:{
        type:String,
        enum:{
            values:["male","female"],
            message:"gender must be male or female only"
        },
        default:"male",

    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    address:[{
        type:String,
        allowNull:false,
    }],

    phone:{
        type:String,
        required:true,
        // match:/^\+20(10|11|12|15)[0-9]{8}$/
    },
    role:{
        type:String,
        enum:{
            values:Object.values(RoleTypes),
            message:"role must be user or admin or user"
        },
        default:"user",

    },
    token:{
        type:String
    },
    image:{
        secure_url:{
            type:String,
            default:null
        },
        public_id:{
            type:String,
            default:null
        }

    }
},{timestamps:true})

export const userModel=mongoose.model("user",userScehma);