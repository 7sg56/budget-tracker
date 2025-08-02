import xlsx from "xlsx";
import Income from "../models/Income.js";

// Add income source
export const addIncome = async (req, res) => {
    const userId = req.user._id; 

    try {
        const { icon, source, amount, date } = req.body;
        
        // Validation Checks
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            source,
            amount,
            icon, 
            date: new Date(date) 
        })

        await newIncome.save();
        return res.status(201).json(newIncome);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }

}

// Get all income sources
export const getIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

// Download income data as CSV
export const downloadIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD

        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_data.xlsx");
        res.download("income_data.xlsx");
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}

// Delete an income source
export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id)
        return res.status(204).json({ message: "Income source deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
}


