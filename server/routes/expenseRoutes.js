import express from "express";
import {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/", protect, getExpense);
router.get('/download', protect, downloadExpense);
router.delete("/:id", protect, deleteExpense);

export default router;