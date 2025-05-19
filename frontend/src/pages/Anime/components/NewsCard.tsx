import { motion } from 'framer-motion';
import { AnimeNews } from '../../../hooks/useAnimeData';

interface NewsCardProps {
    newsItem: AnimeNews;
}

export const NewsCard = ({ newsItem }: NewsCardProps) => {
    const formattedDate = new Date(newsItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-5 shadow-lg border border-gray-800 hover:border-pink-500/30 transition-all duration-300"
        >
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex flex-col h-full">
                    <h3 className="text-lg font-bold text-white mb-2 hover:text-pink-400 transition-colors">
                        {newsItem.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">{newsItem.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center">
                        <span className="text-xs text-gray-400">{formattedDate}</span>
                        <span className="text-xs bg-pink-900/50 text-pink-300 px-2 py-1 rounded-full">
                            Read More
                        </span>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};