import { motion, AnimatePresence } from 'framer-motion';
import { AnimeData } from '../../../hooks/useAnimeData';
import { Button } from '../../../components/ui/button';
import { X } from 'lucide-react';

interface AnimeDetailsModalProps {
    anime: AnimeData | null;
    onClose: () => void;
}

export const AnimeDetailsModal = ({ anime, onClose }: AnimeDetailsModalProps) => {
    if (!anime) return null;

    const title = anime.title.english || anime.title.romaji || anime.title.native || 'Unknown Title';
    const startDate = anime.startDate?.year
        ? `${anime.startDate.year}-${anime.startDate.month?.toString().padStart(2, '0')}-${anime.startDate.day?.toString().padStart(2, '0')}`
        : 'Unknown';
    const endDate = anime.endDate?.year
        ? `${anime.endDate.year}-${anime.endDate.month?.toString().padStart(2, '0')}-${anime.endDate.day?.toString().padStart(2, '0')}`
        : 'Unknown';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-300"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    <div className="grid md:grid-cols-2 gap-8 p-6">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                            <img
                                src={anime.coverImage.large}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            {anime.averageScore && (
                                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-3 py-1 rounded-full">
                                    Score: {anime.averageScore}%
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">{title}</h2>

                            <div className="flex flex-wrap gap-2">
                                {anime.genres?.map(genre => (
                                    <span key={genre} className="text-xs bg-pink-900/30 text-pink-300 px-2 py-1 rounded-full">
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Status</p>
                                    <p className="text-white capitalize">{anime.status?.toLowerCase()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Episodes</p>
                                    <p className="text-white">{anime.episodes || 'Unknown'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Start Date</p>
                                    <p className="text-white">{startDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">End Date</p>
                                    <p className="text-white">{endDate}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-400 mb-2">Synopsis</p>
                                <p className="text-gray-300 text-sm">
                                    {anime.description || 'No description available.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};