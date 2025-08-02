import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database connected successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.log("Database connection error:", err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("Database disconnected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/auth-code`);
        
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        console.error("Please check:");
        console.error("1. Your internet connection");
        console.error("2. MongoDB Atlas IP whitelist settings");
        console.error("3. Your MONGODB_URI in .env file");
        process.exit(1);
    }
}

export default connectDB;