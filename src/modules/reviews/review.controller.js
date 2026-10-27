import { reviewModel } from "../../DB/models/review.model.js"

const get_all_reviews=async(req,res,next)=>{

    try {

        const {productId}=req.body

        const reviews=await reviewModel.findById({productId})

        if(!reviews){
            return res.json({message:"product doesn't exist, Enter valid product"})
        }

        res.json({message:"reviews for this product : ",reviews})

        
    } catch (error) {

        res.json({message:"failed to return reviews"})
        
    }

}


export {
    get_all_reviews
}