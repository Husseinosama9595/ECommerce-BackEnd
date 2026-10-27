import { Router } from "express";
import * as PC from "./product.controller.js"

const router=Router()


router.get("/product/:productId",PC.get_product_data)

export default router