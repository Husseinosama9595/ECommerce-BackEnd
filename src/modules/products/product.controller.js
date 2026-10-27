import { productModel } from "../../DB/models/product.model.js";





const add_product=async(req,res,next)=>{
    try {
        const {name,price,description,size,color,available}=req.body

        
        
    } catch (error) {
        // res.json({message:"failed to add product",error})
        return next(error)
    }
}

const get_product_data=async(req,res,next)=>{
    try {
        const {productId}=req.body;

        const product=await productModel.findById(productId);

        if(!product){
            // return res.json({message:"product doesnt exist, enter valid product id"})
            return next(new Error("product doesnt exist, enter valid product id"))
        }

        res.json({message:"product details : ",product});



    } catch (error) {
        // res.json({message:"failed to retrieve product data"})
        return next(error)
    }
}

export {
    get_product_data,
    add_product
}