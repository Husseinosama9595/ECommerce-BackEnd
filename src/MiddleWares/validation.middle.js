export const validationMiddle=(schema)=>{
    return (req,res,next)=>{
try {
    const data={...req.body,...req.params,...req.query}
    const result=schema.validate(data,{abortEarly:false})

    
      if (result.error) {
        const errorMessage = result.error.details.map(
          (cb) => cb.message
        );

        return next(new Error(errorMessage.join(", ")));
      }
      
    // res.json({result})
    return next()
} catch (error) {
    return next(error)
}
    }
}