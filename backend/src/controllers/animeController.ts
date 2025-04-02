import { Request, Response } from "express";
import axios from "axios";

export const getAnimeNewsController = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}


interface AnimeNews {
    title: string;
    date: string;
    url: string;
    // Add other properties if needed
}

class AnimeNewsController {
    private static animeIds = [38000, 21, 52991]; // Example: Demon Slayer, One Piece, My Hero Academia

    // Utility to add delay between requests (respects Jikan's ~1 req/sec limit)
    private static delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static async getLatestAnimeNews(req: Request, res: Response): Promise<Response> {
        try {
            const newsPromises = AnimeNewsController.animeIds.map(async (id, index) => {
                // Stagger requests to avoid hitting rate limits
                await AnimeNewsController.delay(index * 1000); // 1 sec delay per request
                return axios.get<{ data: AnimeNews[] }>(`https://api.jikan.moe/v4/anime/${id}/news`)
                    .catch(() => ({ data: [] })); // Fallback for failed requests
            });

            const responses = await Promise.all(newsPromises);
            const allNews = responses.flatMap(res => res.data || []);
            const sortedNews = allNews
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10);

            return res.status(200).json({ success: true, news: sortedNews });
        } catch (error) {
            console.error("Error fetching anime news:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

export default AnimeNewsController;