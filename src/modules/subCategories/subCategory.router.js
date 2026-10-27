import { Router } from "express";
import * as SCC from "./subCategory.controller.js"
const router=Router()


router.get("/",SCC.getAllSubCategories)
router.post("/addSubCategory",SCC.addSubCategories)
router.route("/:_id").get(SCC.getSubCategory).delete(SCC.deleteSubCategory).patch(SCC.updateSubCategory)
export default router