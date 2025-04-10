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

export const getTrendingAnimeNewsController = async (req: Request, res: Response) => {
    try {
        const baseURL = process.env.JIKAN_API_URL as string;

        const animeLimit = parseInt(req.query.animeLimit as string) || 5;
        const newsLimit = parseInt(req.query.newsLimit as string) || 3;

        if (!baseURL) {
            return res.status(StatusCodes.NOT_FOUND).json(
                handleApiError("Jikan API URL not found", StatusCodes.NOT_FOUND)
            );
        }

        if (animeLimit < 1 || animeLimit > 10) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                handleApiError("animeLimit must be between 1 and 10", StatusCodes.BAD_REQUEST)
            );
        }

        if (newsLimit < 1 || newsLimit > 5) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                handleApiError("newsLimit must be between 1 and 5", StatusCodes.BAD_REQUEST)
            );
        }
        const trendingResponse = await axios.get(`${baseURL}/top/anime`, {
            params: { limit: animeLimit, filter: 'airing' } 
        });

        const trendingAnimes = trendingResponse.data.data || [];
        const newsResults = await Promise.all(trendingAnimes.map(async (anime: any) => {
            try {
                const newsResponse = await axios.get(`${baseURL}/anime/${anime.mal_id}/news`);
                const newsList = newsResponse.data.data || [];

                const formattedNews = newsList.slice(0, newsLimit).map((item: any) => ({
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

                return {
                    anime: {
                        id: anime.mal_id,
                        title: anime.title,
                        image: anime.images?.jpg?.image_url,
                        url: anime.url
                    },
                    newsCount: formattedNews.length,
                    news: formattedNews
                };
            } catch (err) {
                console.error(`Failed to fetch news for ${anime.title}`, err);
                return null;
            }
        }));

        const filteredResults = newsResults.filter(Boolean); // remove failed ones

        return res.status(StatusCodes.OK).json({
            success: true,
            totalTrending: filteredResults.length,
            data: filteredResults
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