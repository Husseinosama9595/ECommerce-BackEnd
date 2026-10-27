import { userModel } from "../DB/models/user.model.js";
import jwt from "jsonwebtoken"

export const RoleTypes={
    user:"user",
    admin:"admin"
}

export const authentication =async(req,res,next)=>{
    const [bearer,token]=req.headers.token.split(" ");
     let tokenSignature=undefined;
       try {

        switch (bearer) {
            case "user":
                tokenSignature=process.env.USER_KEY;

                break;

                case "admin" :
                    tokenSignature=process.env.ADMIN_KEY;
                    break;
        
            default:
                // return res.json({message:"role must be user or admin"})
                return next(new Error("role must be user or admin"))

                
        }        
                const tokenVerify=jwt.verify(token,tokenSignature)
        
                const user=await userModel.findById(tokenVerify.id);
        
                if(!user){
                //   return  res.json({message:"user not found"})
                     return next(new Error("user not found"))

                }

                req.user=user;
                return next()
        
        
       } catch (error) {
        
        if(error.name=="TokenExpiredError"&& error.message=="jwt expired"){

            const find_user=await userModel.findOne({token})
            if(!find_user){

                // return res.json({message:"profile doesnt exist"})
                return next(new Error("profile doesn't exist"))


            }
            const refreshtoken=jwt.sign({id:find_user._id},(find_user.role==RoleTypes.user)?process.env.USER_KEY:process.env.ADMIN_KEY,{expiresIn:"1w"})

            find_user.token=refreshtoken;
            await find_user.save()
            return res.json({message:"refreshed token",refreshtoken})
        }



        // res.json({message:"authentication failed",error});
        return next(error)
        
       }
    
}