import { Router } from "express";
import { register } from "../controllers/auth";

const router = Router()

router.post('/google', register)

export default router