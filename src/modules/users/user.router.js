import { Router } from "express";
import * as UC from "./user.controller.js"
import { authentication } from "../../MiddleWares/authentication.middle.js";
import { authorization } from "../../MiddleWares/authorization.middle.js";
import { AllowedExtensions ,multerFunction} from "../../Services/multerlocally.js";
import { multerWithCloud } from "../../Services/multerCloudinary.js";
const router=Router()


router.get("/profile",authentication,authorization(["user"]),UC.get_user_profile)

router.post("/uploadLocalprofile",authentication,authorization(["user"]),multerFunction([...AllowedExtensions.Files,...AllowedExtensions.Images],"user/profile_pictures").single("image"),UC.upload_local_picture)

router.post("/upload",authentication,multerWithCloud().single("image"),UC.update_profile_picture)
export default router