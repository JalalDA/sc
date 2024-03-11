import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory } from "../controllers/categories";

const router = Router();

router.post(`/`, createCategory)
router.get('/', getAllCategory)
router.patch('/', deleteCategory)

export default router