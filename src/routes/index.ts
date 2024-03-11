import { Router } from "express";
import authRouter from './auth'
import userRouter from './user'
import courseRouter from './course'
import transactionRouter from './transaction'
import userCourseRouter from './usercourse'
import articlesRouter from './articles'
import lessonRouter from './lesson'
import applyRouter from './apply'
import commentRouter from './comment'
import categoryRouter from './categories'

const router = Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use("/course", courseRouter)
router.use("/transaction", transactionRouter)
router.use("/usercourse", userCourseRouter)
router.use("/articles", articlesRouter)
router.use("/lesson", lessonRouter)
router.use("/apply", applyRouter)
router.use('/comment', commentRouter)
router.use('/category', categoryRouter)

router.get("/ping", (req, res)=>{
    res.send("PONG!!!")
})

export default router