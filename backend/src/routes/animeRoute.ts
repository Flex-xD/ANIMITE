import express from "express";
import { getAnimeNewsController } from "../controllers/animeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get("/anime-news" , verifyToken , getAnimeNewsController);

export default router;