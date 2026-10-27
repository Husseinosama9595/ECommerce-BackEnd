import Joi from "joi";


export const registerSchema=Joi.object({
    name:Joi.string().required().min(3).max(30),
    email:Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
    password:Joi.string().required().pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/),
    phone:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")),
    gender:Joi.string().valid("male","female"),
    role:Joi.string().valid("user","admin")

}).required()



export const loginSchema=Joi.object({
    email:Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
    password:Joi.string().required().pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/)

}).required()