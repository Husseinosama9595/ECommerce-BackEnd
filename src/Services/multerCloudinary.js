import multer from "multer"

export const multerWithCloud=()=>{

const storage=multer.diskStorage({

})


    const fileUpload=multer({storage})
    return fileUpload;

}