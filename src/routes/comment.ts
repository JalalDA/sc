import { Router } from "express";
import { createComment, deleteComment, getCommentByArticleId, updateComment } from "../controllers/comment";
import verfyToken from "../middlewares/verifyToken";

const router = Router()

router.get(`/:articles_id`, getCommentByArticleId)
router.post('/', verfyToken, createComment)
router.patch('/', updateComment)
router.patch("/delete/", deleteComment)

export default router