export const authorization=(role=[])=>{

    return (req,res,next)=>{
     try {
           if(!role.includes(req.user.role)){
            //  res.json({message:"forbidden user"})
            return next(new Error("forbidden user"))
        }
        return next()
        
     } catch (error) {
      //   res.json({message:"authorization error",error})
      return next(error)
        
     }
    }
}