import express from "express";
import { getAnimeNewsController, getTrendingAnimeNewsController } from "../controllers/animeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get("/anime-news" , verifyToken , getAnimeNewsController);
router.get("/trending-anime-news" , verifyToken , getTrendingAnimeNewsController);

export default router;