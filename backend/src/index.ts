import express , {Request , Response} from "express";
import dotenv from "dotenv";
// import jikan from "jikanjs";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import communityRoutes from "./routes/communityRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import {connectDB} from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173" , 
    credentials:true
}))

app.use(cookieParser());
app.use("/api/auth"  , authRoutes);
app.use("/api/blog" , blogRoutes);
app.use("/api/community" , communityRoutes)


app.listen(port , () => {
    console.log(`Server running on PORT : ${port}`);
    connectDB();
});
