import { Router } from "express";
import * as BC from "./brand.controller.js"
import { multerWithCloud } from "../../Services/multerCloudinary.js";
const router=Router()

router.post("/addBrand",multerWithCloud().single("image"),BC.addBrand);
router.get("/getBrand",BC.getBrand);
router.get("/:subcategory_id",BC.getAllBrands);
router.delete("/deleteBrand",BC.deleteBrand);
router.patch("/updateBrand",BC.updateBrand);

export default router