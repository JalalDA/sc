import { Router } from "express";
import { createLesson, getLessonByCourseId, getSingleLesson, updateLessonById } from "../controllers/lesson";

const router = Router()

router.get('/:id', getSingleLesson)
router.post(`/`, createLesson)
router.post("/course", getLessonByCourseId)
router.patch('/', updateLessonById)

export default router