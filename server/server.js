import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/mongoDb.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";



const app = express();

const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

