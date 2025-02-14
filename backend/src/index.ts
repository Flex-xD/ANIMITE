import express , {Request , Response} from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Server running on PORT : ${port}`);
    connectDB();
})
