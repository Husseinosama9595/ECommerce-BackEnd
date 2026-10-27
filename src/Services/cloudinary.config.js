import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name:"vectrrvn",
    // cloud_name:process.env.CLOUD_NAME,
    // api_key:process.env.CLOUDINARY_API_KEY,
    api_key:"639398518917898",
    // api_secret:process.env.CLOUDINARY_API_SECRET
     api_secret:"RDAhB0_HzNKp_tOSkzkDHqRc1nw"
})


export default cloudinary

