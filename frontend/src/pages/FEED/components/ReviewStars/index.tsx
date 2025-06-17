import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

export const ReviewStars = React.memo(({ rating }: { rating: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-1 mt-2"
    >
        {[1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                className={`w-5 h-5 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}`}
                aria-hidden="true"
            />
        ))}
        <span className="ml-2 text-sm text-gray-300 font-exo">({rating}/5)</span>
    </motion.div>
));
