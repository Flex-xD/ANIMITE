import express from "express"; 
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use("/api/auth" , authRoutes);

app.listen(port , () => {
    console.log(`Server running at PORT:${port}`);
    connectDb();
})