import { Router } from "express";
import { getAllUser, getSingleUser, updatePhotoUser, updateUser } from "../controllers/user";
import verfyToken from "../middlewares/verifyToken";
import { upload } from "../middlewares/upload";

const router = Router()

router.get('/', getAllUser)
router.get("/single", verfyToken, getSingleUser)
router.patch("/", verfyToken, updateUser)
router.patch("/photo", verfyToken, upload.single("photo"), updatePhotoUser)

export default router