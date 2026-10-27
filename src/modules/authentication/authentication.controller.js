import { userModel } from "../../DB/models/user.model.js"
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { RoleTypes } from "../../MiddleWares/authentication.middle.js";
import { sendEmail, Subjects } from "../../Services/SendingEmailService.js";
import { signUP_Temp } from "../../Services/EmailTemplate.js";
const Register=async(req,res,next)=>{
    try {
        const {name,email,password,phone,confirmPassword,gender,role}=req.body
        
        const checkEmail=await userModel.findOne({email})

        if(checkEmail){
            // return res.json({message:"email already exists please choose another one"})
            return next(new Error("email already exists please choose another one"))

        }

        if(password!=confirmPassword){
        //    return res.json({message:"password doesnt match the confirmed password"})
              return next(new Error("password doesnt match the confirmed password"))
        }

        const hashedPassword=await bcrypt.hash(password,+process.env.SALT_ROUNDS)
        const encryptedPhone=CryptoJS.AES.encrypt(phone,process.env.PHONE_KEY).toString()

        const user=await userModel.create({
            name,
            email,
            password:hashedPassword,
            phone:encryptedPhone,
            gender,
            role})
            
            const token=jwt.sign({email},process.env.EMAIL_KEY,{expiresIn:60*60})
            const link=`${process.env.BASE_URL}/activate_Account/${token}`


            await sendEmail(
               email,
               Subjects.register,
               signUP_Temp(name,link)
            )

            res.json({message:"succesfully registered",user})

    } catch (error) {
        // res.json({message:"failure to register",error})
        return next(error)
    }
}

const activate_Account=async(req,res,next)=>{
    try {
        const {token}=req.params
        const email=jwt.verify(token,process.env.EMAIL_KEY)
        const user=await userModel.findOne({email})

        if(!user){
            // return res.json({message:"email doesnt existtttttttttttt"})
            return next(new Error("email doesnt exist"))

        }
        user.confirmEmail=true;
        await user.save()
        res.json({message:"account activated confirmed"})

    } catch (error) {
        // res.json({message:"activated failed"})
        return next(error)
    }
}

const Login=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        
        const user=await userModel.findOne({email})

        if(!user){
            // return res.json({message:"email doesnt exist "})
            return next(new Error("email doesn't exist"))

        }


        if(user.confirmEmail==false){
            // return res.json({message:"please activate your account first before trying to login"})
            return next(new Error("please activate your account first before trying to login"))

        }
        const checkPassword=await bcrypt.compare(password,user.password)

        if(!checkPassword){
        //    return res.json({message:"password incorrect, please reenter your correct password"})
              return next(new Error("password incorrect, please reenter your correct password"))

        }


        const token=jwt.sign({id:user._id,},user.role==RoleTypes.user?process.env.USER_KEY:process.env.ADMIN_KEY,{expiresIn:60*60})

        user.token=token;
        await user.save()





        res.json({message:"user logged in succesfully",token})

    } catch (error) {
        // res.json({message:"failure to login",error})
        return next(error)
    }
}

export {
    Register,
    Login,
    activate_Account
}