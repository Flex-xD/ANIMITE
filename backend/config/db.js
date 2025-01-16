import mongoose from "mongoose";

export const connectDb = async (req , res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Server connected to Database : ",conn.connection.host);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}