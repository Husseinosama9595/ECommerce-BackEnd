import multer from "multer";
import { customAlphabet } from "nanoid";
import path from "path"
import fs from "fs"
const nanoid=customAlphabet("abcde0123456789")


export const AllowedExtensions={
    Images:["image/png","image/jpeg","image/avif"],
    Files:["application/pdf"],
    Videos:["video/mp4"]
}
export const multerFunction=(AllowedExtensionsArr,CustomPath)=>{

    const storage=multer.diskStorage({
        destination:function(req,file,cb){
            const fullPath=path.resolve(`Media/${CustomPath}`)
            if(!fs.existsSync(fullPath)){
                 fs.mkdirSync(fullPath,{recursive:true})
            }
            cb(null,fullPath)

        },
        filename:function(req,file,cb){
            const uniqueFileName=nanoid()+file.originalname
            cb(null,uniqueFileName)
        }
        
    
    })


    const fileFilter=function(req,file,cb){

        if(AllowedExtensionsArr.includes(file.mimetype))
        {
           return cb(null,true)
        }
        cb(new Error("invalid file extension"),false)
    }
    

    const fileUpload=multer({fileFilter,storage});

    return fileUpload
}