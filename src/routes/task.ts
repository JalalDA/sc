import { Router } from "express";
import { createTask, deleteTask, getAllTask, getSingleTask, getTaskByCoursId, updateTask } from "../controllers/task";

const router = Router();

router.post('/', createTask)
router.get("/", getAllTask)
router.get("/course_id", getTaskByCoursId)
router.get("/:task_id", getSingleTask)
router.patch("/delete", deleteTask)
router.patch("/:task_id", updateTask)


export default router