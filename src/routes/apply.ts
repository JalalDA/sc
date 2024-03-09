import { Router } from "express";
import { createApply, getAllApply, getSingleApply } from "../controllers/apply";
import { uploadFile } from "../middlewares/upload";

const router = Router()

router.post(`/`, uploadFile.single("file"), createApply)
router.get("/", getAllApply)
router.get("/:apply_id", getSingleApply)

export default router