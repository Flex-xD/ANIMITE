import { motion } from "framer-motion";
import { Menu, Plus } from "lucide-react";
import React from "react";


export const Navbar = React.memo(({ onCreatePost, onToggleSidebar }: {
    onCreatePost: () => void;
    onToggleSidebar: () => void;
}) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onToggleSidebar}
                        className="text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-6 h-6" />
                    </motion.button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent font-futura">
                        Anime Feed
                    </h1>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCreatePost}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-700 to-cyan-800 text-white px-4 py-2 rounded-lg hover:from-purple-800 hover:to-cyan-900 transition-all duration-300 font-futura shadow-glow"
                    aria-label="Create new post"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Create Post</span>
                </motion.button>
            </div>
        </div>
    </motion.nav>
));
