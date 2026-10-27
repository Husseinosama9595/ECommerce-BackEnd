import slugify from "slug"
import { brandModel } from "../../DB/models/brand.model.js"
import cloudinary from "../../Services/cloudinary.config.js"
import { subCategoryModel } from "../../DB/models/subCategory.model.js"

const addBrand=async(req,res,next)=>{
try {
    const {name,subcategory_id}=req.body
    const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
        folder:`ECommerce/brands/${name}/logo_images`,
        overwrite:true,
        public_id:"Logo"
    })

    const subCategoryCheck=await subCategoryModel.findById(subcategory_id)
    if(!subCategoryCheck){
        return next(new Error("brand must relate to a subcategory"))
    }

    const brand=await brandModel.create({
        name,
        logo:{
            public_id,
            secure_url
        },
        subcategory_id,
        slug:slugify(name)
    })
    res.status(201).json({message:`Brand ${name} succesfully added`,brand})
    
} catch (error) {
    return next(error)
    
}
}



const getAllBrands=async(req,res,next)=>{
    try {
        const{subcategory_id}=req.params
            
        const subCategoryCheck=await subCategoryModel.findById(subcategory_id)
        if(!subCategoryCheck){
            return next(new Error("invalid subcategory"))
        }
        const brand=await brandModel.find().populate("subcategory_id","name -_id")

        if(!brand){
            return next(new Error("no brand exists"))
        }
        res.status(201).json({message:"brands succesfully retrieved : ",brand})
            
    } catch (error) {
        return next(error)
    }
}



const getBrand=async(req,res,next)=>{
    try {
        const{brand_id,subcategory_id}=req.body
            
        const subCategoryCheck=await subCategoryModel.findById(subcategory_id)
        if(!subCategoryCheck){
            return next(new Error("invalid subcategory"))
        }
        const brand=await brandModel.findById({_id:brand_id}).populate("subcategory_id","name -_id")

        if(!brand){
            return next(new Error("brand doesnt exist"))
        }
        res.status(201).json({message:"brand succesfully retrieved: ",brand})
            
    } catch (error) {
        return next(error)
    }
}


const deleteBrand=async(req,res,next)=>{
    try {
        const{brand_id,subcategory_id}=req.body
            
        const subCategoryCheck=await subCategoryModel.findById(subcategory_id)
        if(!subCategoryCheck){
            return next(new Error("invalid subcategory"))
        }
        const brand=await brandModel.findByIdAndDelete({_id:brand_id},{returnDocument:"after"})

        if(!brand){
            return next(new Error("brand doesnt exist"))
        }
        res.status(201).json({message:"brand succesfully deleted: "})
            
    } catch (error) {
        return next(error)
    }
}


const updateBrand=async(req,res,next)=>{
    try {
        const{brand_id,subcategory_id,name}=req.body
            
        const subCategoryCheck=await subCategoryModel.findById(subcategory_id)
        if(!subCategoryCheck){
            return next(new Error("invalid subcategory"))
        }
        const brand=await brandModel.findByIdAndUpdate({_id:brand_id},{
            name,
            slug:slugify(name)
        },{returnDocument:"after"}).populate("subcategory_id","name -_id")

        if(!brand){
            return next(new Error("brand doesnt exist"))
        }
        res.status(201).json({message:"brand succesfully updated: ",brand})
            
    } catch (error) {
        return next(error)
    }
}



export {
    addBrand,
    getAllBrands,
    getBrand,
    deleteBrand,
    updateBrand
}