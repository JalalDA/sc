import { Router } from "express";
import { createCourse, getAllCourse, getSingleCourse } from "../controllers/course";

const router = Router()

router.get('/', getAllCourse)
router.get("/:course_id", getSingleCourse)
router.post("/", createCourse)

export default router