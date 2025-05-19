import { useState, useEffect } from 'react';
import { API_ROUTES } from '../constants/Anime routes';
import { apiClient } from '../lib/axios';
import { AnimeData, AnimeNews } from '../constants/types';

export const useAnimeData = () => {
    const [topRated, setTopRated] = useState<AnimeData[]>([]);
    const [upcoming, setUpcoming] = useState<AnimeData[]>([]);
    const [currentlyAiring, setCurrentlyAiring] = useState<AnimeData[]>([]);
    const [news, setNews] = useState<AnimeNews[]>([]);
    const [loading, setLoading] = useState({
        topRated: true,
        upcoming: true,
        currentlyAiring: true,
        news: true,
    });
    const [error, setError] = useState({
        topRated: '',
        upcoming: '',
        currentlyAiring: '',
        news: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: topRatedData } = await apiClient.post(API_ROUTES.TOP_RATED);
                setTopRated(topRatedData.data || []);
            } catch (err) {
                setError(prev => ({ ...prev, topRated: err instanceof Error ? err.message : 'Unknown error' }));
            } finally {
                setLoading(prev => ({ ...prev, topRated: false }));
            }

            try {
                // Fetch upcoming anime
                const { data: upcomingData } = await apiClient.post(API_ROUTES.UPCOMING);
                setUpcoming(upcomingData.data || []);
            } catch (err) {
                setError(prev => ({ ...prev, upcoming: err instanceof Error ? err.message : 'Unknown error' }));
            } finally {
                setLoading(prev => ({ ...prev, upcoming: false }));
            }

            try {
                // Fetch currently airing anime
                const { data: airingData } = await apiClient.post(API_ROUTES.CURRENTLY_AIRING);
                setCurrentlyAiring(airingData.data || []);
            } catch (err) {
                setError(prev => ({ ...prev, currentlyAiring: err instanceof Error ? err.message : 'Unknown error' }));
            } finally {
                setLoading(prev => ({ ...prev, currentlyAiring: false }));
            }

            try {
                // Fetch news
                const { data: newsData } = await apiClient.post(API_ROUTES.LATEST_NEWS);
                setNews(newsData.data || []);
            } catch (err) {
                setError(prev => ({ ...prev, news: err instanceof Error ? err.message : 'Unknown error' }));
            } finally {
                setLoading(prev => ({ ...prev, news: false }));
            }
        };

        fetchData();
    }, []);

    const fetchAnimeDetails = async (id: number): Promise<AnimeData | null> => {
        try {
            const { data } = await apiClient.post(`${API_ROUTES.ANIME_DETAILS}/${id}`);
            return data.data || null;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return {
        topRated,
        upcoming,
        currentlyAiring,
        news,
        loading,
        error,
        fetchAnimeDetails,
    };
};