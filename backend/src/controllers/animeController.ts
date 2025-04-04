import { Request, Response } from "express";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AnimeNews } from "../types/types.js";



const handleApiError = (message: string, statusCode: number) => {
    return {
        success: false,
        message,
        statusCode
    }
}


export const getAnimeNewsController = async (req: Request, res: Response) => {
    try {
        const baseURL = process.env.JIKAN_API_URL as string;
        const limit = parseInt(req.query.limit as string) || 5;
        const animeName = req.query.anime as string || undefined;

        if (!baseURL) {
            res.status(StatusCodes.NOT_FOUND).json(
                handleApiError("Jikan API URL not found", StatusCodes.NOT_FOUND)
            )
        }
        if (limit < 1 || limit > 5) {
            res.status(StatusCodes.BAD_REQUEST).json(
                handleApiError("Limit must be between 1 and 5", StatusCodes.BAD_REQUEST)
            )
        }
        if (!animeName) {
            return res.status(StatusCodes.LENGTH_REQUIRED).json(
                handleApiError("Anime name is required !", StatusCodes.LENGTH_REQUIRED)
            )
        }

        const animeSearchResponse = await axios.get(`${baseURL}/anime` , {
            params:{q:animeName , limit:1}
        })

        const anime = animeSearchResponse.data.data[0];
        if(!anime) {
            res.status(StatusCodes.NOT_FOUND).json(
                handleApiError("Anime not found !", StatusCodes.NOT_FOUND)
            )
        }
        const animeId = anime.mal_id;

        const newsResponse = await axios.get(`${baseURL}/anime/${animeId}/news`);

        const newsList = newsResponse.data.data || [];

        const formattedNews = newsList.slice(0, limit).map((item: any) => ({
            id: item.mal_id,
            title: item.title,
            url: item.url,
            date: new Date(item.date).toISOString(),
            author: {
                username: item.author_username,
                url: item.author_url
            },
            excerpt: item.excerpt,
            thumbnail: item.images?.jpg?.image_url || null
        }));

        return res.status(StatusCodes.OK).json({
            success: true,
            anime: {
                id: animeId,
                title: anime.title,
                image: anime.images?.jpg?.image_url,
                url: anime.url
            },
            count: formattedNews.length,
            data: formattedNews
        });

    } catch (error) {
        console.error(error);
        const status = axios.isAxiosError(error) && error.response?.status
            ? error.response.status
            : StatusCodes.INTERNAL_SERVER_ERROR;

        return res.status(status).json(
            handleApiError(error instanceof Error ? error.message : "Internal Server Error", status)
        );
    }
};