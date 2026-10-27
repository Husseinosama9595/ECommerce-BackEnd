import { categoryModel } from "../../DB/models/category.model.js"
import cloudinary from "../../Services/cloudinary.config.js"
import slugify from 'slug'
const getCategory=async(req,res,next)=>{
    try {

        const {_id}=req.params
        const Category=await categoryModel.findById({_id})
        if(!Category){
            return next(new Error("enter valid Category"))
        }
        res.json({message:"category:",Category})
        
    } catch (error) {
        return next(error)
    }
}

const getAllCategories=async(req,res,next)=>{
    try {
        const Category=await categoryModel.find()
        if(!Category){
            return next(new Error("enter valid Category"))
        }
        res.json({message:"categories:",Category})
        
    } catch (error) {
        return next(error)
    }
}


const addCategories=async(req,res,next)=>{

    try {
        const{name}=req.body;
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,
            {
                folder:`ECommerce/Category/${name}/Category_images`,
                overwrite:true,
                public_id:"Category Images"
            }
        )
        const Categories=await categoryModel.create({
            name,
            slug:slugify(name),
            image:{
                public_id,
                secure_url
            }
        })

        res.status(201).json({message:"category: ",Categories})

        
    } catch (error) {
        return next(error)
    }
}

const updateCategory=async(req,res,next)=>{
    try {
        const{_id}=req.params
        const {name}=req.body
        const Category=await categoryModel.findByIdAndUpdate({_id},{name,slug:slugify(name)},{new:true})
        if(!Category){
            return next(new Error("enter valid Category"))
        }
        res.json({message:"categories:",Category})
        
    } catch (error) {
        return next(error)
    }
}


const deleteCategory=async(req,res,next)=>{
    try {
        const {_id}=req.params
        const Category=await categoryModel.findByIdAndDelete({_id})
        if(!Category){
            return next(new Error("enter valid Category"))
        }
        res.json({message:"succesfully deleted:"})
        
    } catch (error) {
        return next(error)
    }
}



export {
    getAllCategories,
    addCategories,
    updateCategory,
    deleteCategory,
    getCategory
}