import { Router } from "express";
import { createLesson, getLessonByCourseId } from "../controllers/lesson";

const router = Router()

router.post(`/`, createLesson)
router.post("/course", getLessonByCourseId)

export default router