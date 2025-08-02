import express from "express";
import {
    addIncome,
    getIncome,
    deleteIncome,
    downloadIncome,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getIncome);
router.get('/download', protect, downloadIncome);
router.delete("/:id", protect, deleteIncome);

export default router;