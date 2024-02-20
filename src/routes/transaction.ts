import { Router } from "express";
import { createSnapTransaction, createTransaction, getTransactionByUserId, webhookTransaction } from "../controllers/transaction";
import verfyToken from "../middlewares/verifyToken";

const router = Router()

router.get("/user", verfyToken, getTransactionByUserId)
router.post('/', createTransaction)
router.post("/snap", verfyToken, createSnapTransaction)
router.post("/weebhook", webhookTransaction)

export default router