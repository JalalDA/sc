import { Router } from "express";
import { getAllUser, getSingleUser } from "../controllers/user";

const router = Router()

router.get('/', getAllUser)
router.get("/:user_id", getSingleUser)

export default router