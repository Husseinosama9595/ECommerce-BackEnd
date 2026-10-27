import slugify from "slug"
import { subCategoryModel } from "../../DB/models/subCategory.model.js"
import { categoryModel } from "../../DB/models/category.model.js"

const addSubCategories=async(req,res,next)=>{
    try {
        const{name,category_id}=req.body
        const CategoryExist=await categoryModel.findById(category_id)
        if(!CategoryExist){
            return next(new Error("No category to add a subCategory"))
        }
        const subCategories=await subCategoryModel.create({
            name,
            slug:slugify(name),
            category_id
             }) 

             res.status(201).json({message:"SubCategory succesfully added",subCategories})
    } catch (error) {
        return next(error)
        
    }
}

const getAllSubCategories=async(req,res,next)=>{
    try {
        const{category_id}=req.body
        const CategoryExist=await categoryModel.findById(category_id)
        if(!CategoryExist){
            return next(new Error("No category to add a subCategory"))
        }
        const subCategories=await subCategoryModel.find().populate("category_id","name -_id")
        if(!subCategories){
            return next(new Error("no subCategory exists"))
        }
        res.json({message:"Subcategories: ",subCategories})
        
    } catch (error) {
        return next(error)
    }
}


const getSubCategory=async(req,res,next)=>{
    try {


        const{_id}=req.params
        const{category_id}=req.body
        const CategoryExist=await categoryModel.findById(category_id)
        if(!CategoryExist){
            return next(new Error("No category to add a subCategory"))
        }
        const subCategory=await subCategoryModel.findById({_id}).populate("category_id","name -_id")
        if(!subCategory){
            return next(new Error("invalid subCategory"))
        }
        res.json({message:"Subcategory: ",subCategory})
        
    } catch (error) {
        return next(error)
    }
}

const updateSubCategory=async(req,res,next)=>{
    try {
        const {_id}=req.params
        const{name,category_id}=req.body
        const CategoryExist=await categoryModel.findById(category_id)
        if(!CategoryExist){
            return next(new Error("No category to add a subCategory"))
        }
        const subCategory=await subCategoryModel.findByIdAndUpdate({_id},{name,slug:slugify(name)},{new:true})

        if(!subCategory){
            return next(new Error("enter valid subCategory"))
        }
        res.json({message:"SubCategory name updated succesfully :",subCategory})
        
    } catch (error) {
        return next(error)
        
    }
}

const deleteSubCategory=async(req,res,next)=>{
    try {
        const {_id}=req.params
        const{category_id}=req.body
        const CategoryExist=await categoryModel.findById(category_id)
        if(!CategoryExist){
            return next(new Error("No category to add a subCategory"))
        }
        const subCategory=await subCategoryModel.findByIdAndDelete({_id})

        if(!subCategory){
            return next(new Error("enter valid subCategory to delete"))
        }
        res.json({message:"SubCategory Deleted succesfully :"})
        
    } catch (error) {
        return next(error)
        
    }
}






export {
    addSubCategories,
    getAllSubCategories,
    deleteSubCategory,
    updateSubCategory,
    getSubCategory
}