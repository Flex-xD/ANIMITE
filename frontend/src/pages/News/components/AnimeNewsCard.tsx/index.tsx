import React from 'react';
import { AnimeWithNews, NewsItem } from '../../../../constants/news';


interface AnimeNewsCardProps {
    anime: AnimeWithNews;
}

const AnimeNewsCard: React.FC<AnimeNewsCardProps> = ({ anime }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
            {/* Anime Header */}
            <div className="relative">
                <img
                    src={anime.anime.image}
                    alt={anime.anime.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-xl font-semibold text-white truncate">
                        {anime.anime.title}
                    </h2>
                </div>
            </div>

            {/* News List */}
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Latest News ({anime.newsCount})
                </h3>
                {anime.news.length === 0 ? (
                    <p className="text-gray-500">No news available.</p>
                ) : (
                    <ul className="space-y-4">
                        {anime.news.map((news: NewsItem) => (
                            <li key={news.id} className="border-b pb-4 last:border-b-0">
                                {news.thumbnail && (
                                    <img
                                        src={news.thumbnail}
                                        alt={news.title}
                                        className="w-20 h-20 object-cover rounded float-left mr-4"
                                    />
                                )}
                                <div>
                                    <a
                                        href={news.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        {news.title}
                                    </a>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(news.date).toLocaleDateString()} by{' '}
                                        <a
                                            href={news.author.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {news.author.username}
                                        </a>
                                    </p>
                                    <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                                        {news.excerpt}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AnimeNewsCard;