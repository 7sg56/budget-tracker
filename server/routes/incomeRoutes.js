import express from "express";
import {
    addIncome,
    getIncome,
    deleteIncome,
    downloadIncome,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { testBypass } from "../middleware/testBypass.js";

const router = express.Router();

// 🚨 DEVELOPMENT ONLY - Switch between protect and testBypass

const auth = testBypass; // Change to 'protect' when you want real auth

router.post("/add", auth, addIncome);
router.get("/", auth, getIncome);
router.get('/download', auth, downloadIncome);
router.delete("/:id", auth, deleteIncome);

export default router;