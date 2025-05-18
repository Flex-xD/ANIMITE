import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import Parser from "rss-parser";
import { fetchFromAnilist } from "../utils/utils.js";
import { AnimeNews } from "../types/types.js";
import { ApiError } from "../middlewares/handleError.js";

const parser = new Parser();

const AnimeIdSchema = z.object({
  id: z.string().transform((val) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) throw new Error("Invalid anime ID");
    return parsed;
  }),
});

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
  };
}

const createApiResponse = <T>(
  success: boolean,
  data?: T,
  error?: { message: string; statusCode: number }
): ApiResponse<T> => ({
  success,
  data,
  error,
});


export const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response) => {
    Promise.resolve(fn(req, res)).catch((error) => {
      console.error("Error:", error);
      const statusCode = error instanceof ApiError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json(
        createApiResponse(false, undefined, {
          message: error.message || "Internal server error",
          statusCode,
        }),
      );
    });
  };
};

// ? TOP RATED ANIME
export const getTopRatedAnime = asyncHandler(async (req: Request, res: Response) => {
  const query = `
    query {
      Page(perPage: 20) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title { english }
          coverImage { large }
          averageScore
        }
      }
    }
  `;

  const data = await fetchFromAnilist(query) as { data?: { Page?: { media?: any[] } } };
  if (!data?.data?.Page?.media) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No top-rated anime found");
  }

  res.status(StatusCodes.OK).json(createApiResponse(true, data.data.Page!.media));
});

// ? UPCOMING ANIME
export const getUpcomingAnime = asyncHandler(async (req: Request, res: Response) => {
  const query = `
    query {
      Page(perPage: 10) {
        media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
          id
          title { romaji }
          coverImage { large }
          startDate { year month day }
        }
      }
    }
  `;

  const data = await fetchFromAnilist(query) as { data?: { Page?: { media?: any[] } } };
  if (!data?.data?.Page?.media) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No upcoming anime found");
  }

  res.status(StatusCodes.OK).json(createApiResponse(true, data.data.Page!.media));
});

// ? CURRENTLY AIRING ANIME
export const getCurrentlyAiring = asyncHandler(async (req: Request, res: Response) => {
  const query = `
    query {
      Page(perPage: 10) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          id
          title { romaji }
          coverImage { large }
          episodes
          nextAiringEpisode {
            airingAt
            episode
          }
        }
      }
    }
  `;

  const data = await fetchFromAnilist(query) as { data?: { Page?: { media?: any[] } } };
  if (!data?.data?.Page?.media) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No currently airing anime found");
  }

  res.status(StatusCodes.OK).json(createApiResponse(true, data.data.Page!.media));
});

// ? ANIME DETAILS BY ID
export const getAnimeDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = AnimeIdSchema.parse(req.params);

  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji english native }
        coverImage { large }
        description
        genres
        averageScore
        episodes
        status
        startDate { year month day }
        endDate { year month day }
      }
    }
  `;

  const data = await fetchFromAnilist(query, { id }) as { data?: { Media?: any } };
  if (!data?.data?.Media) {
    throw new ApiError(StatusCodes.NOT_FOUND, `Anime with ID ${id} not found`);
  }

  res.status(StatusCodes.OK).json(createApiResponse(true, data.data.Media));
});

// ? LATEST ANIME NEWS
export const getLatestAnimeNews = asyncHandler(async (req: Request, res: Response) => {
  const feed = await parser.parseURL("https://www.animenewsnetwork.com/all/rss.xml");

  const recentNews: AnimeNews[] = feed.items
    .filter(
      (item): item is Required<Pick<Parser.Item, "title" | "link" | "pubDate" | "contentSnippet">> =>
        !!item.title && !!item.link && !!item.pubDate && !!item.contentSnippet &&
        new Date(item.pubDate) >= new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    )
    .map((item, idx) => ({
      mal_id: idx, 
      url: item.link,
      date: item.pubDate,
      author_username: "Unknown", 
      author_url: "", 
      title: item.title,
      content: item.contentSnippet,
      excerpt: item.contentSnippet, 
    }));

  if (!recentNews.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No recent anime news found");
  }

  res.status(StatusCodes.OK).json(createApiResponse(true, recentNews));
});