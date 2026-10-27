import mongoose from "mongoose";

export const DBConnection=async()=>{

   return await mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("succesfully connected to the database");
    
   }).catch((error)=>{
    console.log("error connecting to the database : ",error);    
    
   })
}