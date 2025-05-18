import express from "express";
import { getAnimeDetails, getCurrentlyAiring, getLatestAnimeNews, getTopRatedAnime, getUpcomingAnime } from "../controllers/animeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/top-rated-anime", getTopRatedAnime);
router.post("/upcoming-anime", getUpcomingAnime)
router.post("/currently-airing", getCurrentlyAiring)
router.post("/anime-details/:id", getAnimeDetails)
router.post("/latest-anime-news", getLatestAnimeNews)


export default router;