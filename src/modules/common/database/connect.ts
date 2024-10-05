import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const mongoURI =
        process.env.MONGO_URI || 'mongodb://localhost:27017/authDB';

    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
