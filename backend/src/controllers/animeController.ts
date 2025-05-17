import { Request, Response } from "express";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AnimeNews } from "../types/types.js";
import { fetchFromAnilist } from "../utils/utils.js";

const handleApiError = (message: string, statusCode: number) => {
    return {
        success: false,
        message,
        statusCode
    }
}


// * TOP RATED ANIME
export const getTopRatedAnime = async (req: Request, res: Response) => {
    const query = `
    query {
        Page(perPage: 10) {
            media(type: ANIME, sort: SCORE_DESC) {
                id
                title { romaji }
                coverImage { large }
                averageScore
            }
        }
    }
`;
    const data = await fetchFromAnilist(query);
    res.json(data.data.Page.media);
};

// * UPCOMING ANIME
export const getUpcomingAnime = async (req: Request, res: Response) => {
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
    const data = await fetchFromAnilist(query);
    res.json(data.data.Page.media);
};

// * CURRENTLY AIRING ANIME 
export const getCurrentlyAiring = async (req: Request, res: Response) => {
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
    const data = await fetchFromAnilist(query);
    res.json(data.data.Page.media);
};

// * ANIME DETAILS BY ID
export const getAnimeDetails = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

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
    const data = await fetchFromAnilist(query, { id });
    res.json(data.data.Media);
};

// * LATEST ANIME NEWS 

export const getLatestAnimeNews = async (req: Request, res: Response) => {
  const response = await axios.get("https://api.jikan.moe/v4/anime?q=&order_by=popularity&limit=6");
  res.json(response.data.data);
};
