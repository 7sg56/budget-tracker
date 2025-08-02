import express from "express";
import {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { testBypass } from "../middleware/testBypass.js";

const router = express.Router();

// 🚨 DEVELOPMENT ONLY - Switch between protect and testBypass
// Use testBypass for testing without JWT tokens
// Use protect for production
const auth = testBypass; // Change to 'protect' when you want real auth

router.post("/add", auth, addExpense);
router.get("/", auth, getExpense);
router.get('/download', auth, downloadExpense);
router.delete("/:id", auth, deleteExpense);

export default router;