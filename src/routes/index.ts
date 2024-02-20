import { Router } from "express";
import authRouter from './auth'
import userRouter from './user'
import courseRouter from './course'
import transactionRouter from './transaction'
import userCourseRouter from './usercourse'

const router = Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use("/course", courseRouter)
router.use("/transaction", transactionRouter)
router.use("/usercourse", userCourseRouter)

router.get("/ping", (req, res)=>{
    res.send("PONG!!!")
})

export default router