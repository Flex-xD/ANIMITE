import { motion } from 'framer-motion';
import { AnimeData } from '../../../hooks/useAnimeData';

interface AnimeCardProps {
    anime: AnimeData;
    onClick: () => void;
}

export const AnimeCard = ({ anime, onClick }: AnimeCardProps) => {
    const title = anime.title.english || anime.title.romaji || anime.title.native || 'Unknown Title';

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-300 border border-gray-800 hover:border-pink-500/30"
        >
            <div className="relative aspect-[3/4]">
                <img
                    src={anime.coverImage.large}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {anime.averageScore && (
                    <div className="absolute bottom-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {anime.averageScore}%
                    </div>
                )}
            </div>
            <div className="p-3">
                <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
                {anime.startDate?.year && (
                    <p className="text-xs text-gray-400 mt-1">
                        {anime.startDate.year}
                        {anime.status === 'RELEASING' && ' • Airing'}
                        {anime.status === 'NOT_YET_RELEASED' && ' • Upcoming'}
                    </p>
                )}
            </div>
        </motion.div>
    );
};