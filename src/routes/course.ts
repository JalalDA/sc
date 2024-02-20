import { Router } from "express";
import { createCourse, getAllCourse, getSingleCourse, updateCourse, updateImageCourse } from "../controllers/course";
import { upload } from "../middlewares/upload";

const router = Router()

router.get('/', getAllCourse)
router.get("/:course_id", getSingleCourse)
router.post("/", createCourse)
router.patch("/:id", updateCourse)
router.patch("/photo/:id", upload.single("photo"), updateImageCourse)

export default router