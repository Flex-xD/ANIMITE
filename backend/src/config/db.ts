import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MongoURI is not defined !")
        }
        const conn  = await mongoose.connect(mongoURI);
        console.log(`Connected To DB : ${conn.connection.host}`);
    } catch (error) {
        console.error("Error in the connectDB : " , error);
        process.exit(1);
    }
}