import express from "express";
import { testBypass } from "../middleware/testBypass.js";
import { protect } from "../middleware/authMiddleware.js";
import { getHomeData } from "../controllers/homeController.js";


const router = express.Router();

// 🚨 DEVELOPMENT ONLY - Switch between protect and testBypas
const auth = protect; // Change to 'protect' when you want real auth


router.get("/", auth, getHomeData);

export default router;