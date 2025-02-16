import express , {Request , Response} from "express";
import dotenv from "dotenv";
// import jikan from "jikanjs";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import {connectDB} from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use("/api/auth"  , authRoutes);
app.use(express.json());
app.use(cookieParser());

app.listen(port , () => {
    console.log(`Server running on PORT : ${port}`);
    connectDB();
})
