import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

// Save mongoURI connection string to variable
const db = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(db);

        console.log('MongoDB  Conected');
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
}

export default connectDB;