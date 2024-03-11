import { Router } from "express";
import { createArticles, getArticles, getSingleArticles, updateArticles } from "../controllers/articles";
import verfyToken from "../middlewares/verifyToken";

const router = Router()

router.post('/', verfyToken, createArticles)
router.get("/", getArticles)
router.get("/:id", getSingleArticles)
router.patch("/", updateArticles)

export default router