import mongoose from "mongoose";

const DB_URL = 'mongodb+srv://mts_krummel:lautaro2004@taskinproject.ojqijot.mongodb.net/'

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
};