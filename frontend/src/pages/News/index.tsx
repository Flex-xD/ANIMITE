import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimeNewsCard from './components/AnimeNewsCard.tsx';
import { AnimeWithNews, TrendingAnimeResponse } from '../../constants/news/index.ts';

const TrendingAnimeNews: React.FC = () => {
    const [animeData, setAnimeData] = useState<AnimeWithNews[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the backend
    useEffect(() => {
        const fetchTrendingAnimeNews = async () => {
            try {
                const response = await axios.get<TrendingAnimeResponse>(
                    'http://localhost:5000/api/anime/trending-anime-news',
                    {
                        params: {
                            animeLimit: 5, // Adjust as needed
                            newsLimit: 3,  // Adjust as needed
                        },
                    }
                );
                setAnimeData(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trending anime news. Please try again later.');
                setLoading(false);
            }
        };

        fetchTrendingAnimeNews();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl font-semibold text-gray-600">Loading...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
                    Trending Anime News
                </h1>
                {animeData.length === 0 ? (
                    <p className="text-center text-gray-600">No trending anime found.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {animeData.map((anime) => (
                            <AnimeNewsCard key={anime.anime.id} anime={anime} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingAnimeNews;