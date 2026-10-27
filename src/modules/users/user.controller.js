import CryptoJS from "crypto-js";
import cloudinary from "../../Services/cloudinary.config.js";
const get_user_profile=async(req,res,next)=>{
    try {
        
        const {user}=req
        user.phone=CryptoJS.AES.decrypt(user.phone,process.env.PHONE_KEY).toString(CryptoJS.enc.Utf8);

        res.json({message:"user profile : ",user})
        
    } catch (error) {
        // res.json({message:"failed to retrieve user profile",error})
        return next(error)
    }
}


const upload_local_picture=async(req,res,next)=>{
    try {
        
        const {user}=req
        user.phone=CryptoJS.AES.decrypt(user.phone,process.env.PHONE_KEY).toString(CryptoJS.enc.Utf8);

        res.json({message:"user profile : ",data:req.file})
        
    } catch (error) {
        // res.json({message:"failed to retrieve user profile",error})
        return next(error)
    }
}

const update_profile_picture=async(req,res,next)=>{
    try {
        const user=req.user
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:`Ecommerce/users/${user.name}/Profile_Pictures`,
            public_id:"Profile_Picture",           
            overwrite:true,
        })

        user.image={
            secure_url,public_id
        }
        await user.save()

         res.status(201).json({message:"profile picture uploaded succesfully",user})
        
    } catch (error) {
        return next(error)
    }
}

export {
    get_user_profile,
    update_profile_picture,
    upload_local_picture
};
