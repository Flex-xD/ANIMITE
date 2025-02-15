import express , {Request , Response} from "express";
import dotenv from "dotenv";
import jikan from "jikanjs";
import cookieParser from "cookie-parser";
import {connectDB} from "./config/db.js";
import axios from "axios";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/" , async (req:Request , res:Response) => {
    const data = await axios.get("https://api.jikan.moe/v4/anime/{id}/full");
    console.log(data.data) 
})

app.listen(port , () => {
    console.log(`Server running on PORT : ${port}`);
    connectDB();
})
