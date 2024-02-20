import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import path from 'path';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary
})

const limit = {
    fileSize: 3e6
}

export const upload = multer({
    storage: storage,
    limits: limit,
    fileFilter(req, file, callback) {
        const extName = path.extname(file.originalname)
        const allowedExt = /jpg|png|jpeg/
        if(!allowedExt.test(extName)){
            return callback(new Error("Please insert jpg or png oly"))
        }
        callback(null, true)
    },
    
})