import { configDotenv } from "dotenv"
import { DBConnection } from "../src/DB/connection.js"
import express from "express"
import * as AllRouter from"./index.routes.js"
export const bootstrap=()=>{

configDotenv()

DBConnection();

const app=express()

app.use(express.json());

app.use("/auth",AllRouter.AuthRouter);
app.use("/user",AllRouter.UserRouter);
app.use("/category",AllRouter.CategoryRouter);
app.use("/subCategory",AllRouter.SubCateogoryRouter);
app.use("/brand",AllRouter.BrandRouter);

//url missmatch handling
app.use((req,res,next)=>{
    return next(new Error("invalid URL"))
})

//global error middleware
app.use((err,req,res,next)=>{
    res.json({message:err.message})
})

app.listen(process.env.PORT,()=>{
    console.log("listening ");
    
})

}