import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";


export const getHomeData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Last 30 days income
        const last30DaysIncome = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        // Calculate total for last 30 days income
        const last30DaysIncomeTotal = last30DaysIncome.reduce((sum, income) => sum + income.amount, 0);

        // Last 30 days expense
        const last30DaysExpense = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        // Calculate total for last 30 days expense
        const last30DaysExpenseTotal = last30DaysExpense.reduce((sum, expense) => sum + expense.amount, 0);

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            )
        ].sort((a, b) => b.date - a.date); // sort latest first

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: last30DaysExpenseTotal,
                transactions: last30DaysExpense
            },
            last30DaysIncome: {
                total: last30DaysIncomeTotal,
                transactions: last30DaysIncome
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}