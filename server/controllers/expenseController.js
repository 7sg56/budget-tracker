import xlsx from "xlsx";
import Expense from "../models/Expense.js";

// Add expense
export const addExpense = async (req, res) => {
    const userId = req.user._id; 

    try {
        const { icon, category, amount, date } = req.body;
        
        // Validation Checks - date is optional since it has default value
        if (!category || !amount) {
            return res.status(400).json({ message: "Category and amount are required" });
        }

        const newExpense = new Expense({
            userId,
            category,
            amount,
            icon,
            ...(date && { date: new Date(date) }) // Only include date if provided
        })

        await newExpense.save();
        return res.status(201).json(newExpense);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }

}

// Get all expense categories
export const getExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

// Download expense data as CSV
export const downloadExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD

        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_data.xlsx");
        res.download("expense_data.xlsx");
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        return res.status(204).json({ message: "Expense deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}


