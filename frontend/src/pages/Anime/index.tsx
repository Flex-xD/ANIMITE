import { useState } from 'react';
import { useAnimeData } from '../../hooks/useAnimeData';

import { motion } from 'framer-motion';
import { Skeleton } from '../../components/ui/skeleton';
import { AnimeData } from '../../constants/types';
import { SectionHeader } from './components/SectionHeader';
import { AnimeCard } from './components/AnimeCard';
import { NewsCard } from './components/NewsCard';
import { AnimeDetailsModal } from './components/AnimeDetailsModal';

// ! ADD ANIME DETAILS ONE TOO

export const Anime = () => {
    const {
        topRated,
        upcoming,
        currentlyAiring,
        news,
        loading,
        error,
        fetchAnimeDetails,
    } = useAnimeData();

    const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnimeClick = async (id: number) => {
        const animeDetails = await fetchAnimeDetails(id);
        if (animeDetails) {
            setSelectedAnime(animeDetails);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/0 via-purple-900/0 to-purple-900/20 pointer-events-none" />

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                            Anime Dashboard
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            Explore the world of anime with the latest updates, top-rated shows, and news.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16 space-y-16">
                {/* Currently Airing Section */}
                <section>
                    <SectionHeader title="Currently Airing" subtitle="Popular anime airing right now" />

                    {loading.currentlyAiring ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="aspect-[3/4] rounded-lg bg-gray-800/50" />
                            ))}
                        </div>
                    ) : error.currentlyAiring ? (
                        <p className="text-red-400">{error.currentlyAiring}</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {currentlyAiring.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    onClick={() => handleAnimeClick(anime.id)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Top Rated Section */}
                <section>
                    <SectionHeader title="Top Rated" subtitle="Highest scored anime of all time" />

                    {loading.topRated ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="aspect-[3/4] rounded-lg bg-gray-800/50" />
                            ))}
                        </div>
                    ) : error.topRated ? (
                        <p className="text-red-400">{error.topRated}</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {topRated.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    onClick={() => handleAnimeClick(anime.id)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Upcoming Section */}
                <section>
                    <SectionHeader title="Upcoming Anime" subtitle="Highly anticipated shows coming soon" />

                    {loading.upcoming ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="aspect-[3/4] rounded-lg bg-gray-800/50" />
                            ))}
                        </div>
                    ) : error.upcoming ? (
                        <p className="text-red-400">{error.upcoming}</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {upcoming.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    onClick={() => handleAnimeClick(anime.id)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* News Section */}

                {/* MAKE A DIFFERNT PAGE FOR THIS ONE AND ELABORATE IT MORE ! */}
                <section className="space-y-8">
                    <SectionHeader
                        title="Latest Anime News"
                        subtitle="Stay updated with the latest in the anime world"
                    />

                    {loading.news ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-48 rounded-xl bg-gray-800/50" />
                            ))}
                        </div>
                    ) : error.news ? (
                        <p className="text-red-400">{error.news}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item) => (
                                <NewsCard key={item.mal_id} newsItem={item} />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Anime Details Modal */}
            <AnimeDetailsModal
                anime={selectedAnime}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};