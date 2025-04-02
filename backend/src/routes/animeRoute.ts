import express from "express";
import AnimeNewsController, { getAnimeNewsController } from "../controllers/animeController.js";
const router = express.Router();


router.get("/anime-news" , AnimeNewsController.getLatestAnimeNews);

export default router;