import mongoose from "mongoose";

const DB_URL = 'mongodb://localhost/taskinproject'

export const connectDB = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
};