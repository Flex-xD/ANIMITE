import {motion} from "framer-motion";
import { Heart } from "lucide-react";
import React from "react";

export const LikeButton = React.memo(({ likes, isLiked, onToggle }: {
    likes: number;
    isLiked: boolean;
    onToggle: () => void;
}) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 ${isLiked
            ? 'bg-gradient-to-r from-pink-700/20 to-purple-700/20 text-pink-400'
            : 'bg-gradient-to-r from-blue-800/20 to-indigo-800/20 text-gray-300'
            } shadow-glow hover:shadow-glow-lg`}
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        <span className="text-sm font-medium font-exo">{likes}</span>
    </motion.button>
));