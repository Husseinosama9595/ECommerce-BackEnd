import { Router } from "express";
import * as UC from "./authentication.controller.js"
import { validationMiddle } from "../../MiddleWares/validation.middle.js";
import * as AuthMiddle from "./authentication.validation.js"

const router =Router()

router.post("/register",validationMiddle(AuthMiddle.registerSchema),UC.Register);
router.post("/login",validationMiddle(AuthMiddle.loginSchema),UC.Login);
router.get("/activate_Account/:token",UC.activate_Account)

export default router