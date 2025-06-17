import React from "react";
import {motion} from "framer-motion";
import { Post } from "../../types/types";

export const Badge = React.memo(({ type }: { type: Post['type'] }) => {
    const getBadgeConfig = (type: Post['type']) => {
        switch (type) {
            case 'blog': return { label: 'BLOG', className: 'from-purple-700 to-pink-800' };
            case 'review': return { label: 'REVIEW', className: 'from-yellow-600 to-orange-700' };
            case 'poll': return { label: 'POLL', className: 'from-cyan-800 to-blue-800' };
            case 'watchlist': return { label: 'WATCHLIST', className: 'from-green-700 to-teal-700' };
            case 'normal': return { label: 'POST', className: 'from-blue-800 to-indigo-800' };
        }
    };

    const config = getBadgeConfig(type);
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${config.className} shadow-glow border border-white/10`}
        >
            {config.label}
        </motion.span>
    );
});