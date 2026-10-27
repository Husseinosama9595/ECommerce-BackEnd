import { Router } from "express";
import * as CC from "./category.controller.js";
import { multerWithCloud } from "../../Services/multerCloudinary.js";
const router=Router()


router.get("/getAllCategory",CC.getAllCategories)
router.post("/addCategory",multerWithCloud().single("image"),CC.addCategories)
router.route("/:_id").get(CC.getCategory).patch(CC.updateCategory).delete(CC.deleteCategory)

export default router