import { Router } from "express";
import { craeteUserCourse, getAllUserCourse, getSingleUserCourse } from "../controllers/usercourse";
import verfyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/", verfyToken, getAllUserCourse)
router.get("/:user_id", getSingleUserCourse)
router.post(`/`, craeteUserCourse)


export default router