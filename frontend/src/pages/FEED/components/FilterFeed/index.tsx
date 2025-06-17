import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import React from "react";

export const FeedFilter = React.memo(({ selectedType, onTypeChange, searchTerm, onSearchChange, useLoadMore, onToggleLoadMore }: {
    selectedType: string;
    onTypeChange: (type: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    useLoadMore: boolean;
    onToggleLoadMore: (enabled: boolean) => void;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-glow mb-6"
    >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" aria-hidden="true" />
                    <motion.input
                        whileFocus={{ borderColor: '#9333ea' }}
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={e => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/30 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-700 focus:border-transparent font-exo"
                        aria-label="Search posts"
                    />
                </div>
                <div className="relative">
                    <motion.select
                        whileFocus={{ borderColor: '#9333ea' }}
                        value={selectedType}
                        onChange={e => onTypeChange(e.target.value)}
                        className="appearance-none bg-gray-900/30 border border-gray-500/30 rounded-lg px-4 py-3 pr-10 text-white focus:ring-2 focus:ring-purple-700 focus:border-transparent font-exo"
                        aria-label="Filter by post type"
                    >
                        <option value="all">All Posts</option>
                        <option value="blog">Blogs</option>
                        <option value="review">Reviews</option>
                        <option value="poll">Polls</option>
                        <option value="watchlist">Watchlists</option>
                        <option value="normal">Normal Posts</option>
                    </motion.select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5 pointer-events-none" aria-hidden="true" />
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 text-sm text-gray-300 font-exo">
                    <motion.input
                        whileFocus={{ borderColor: '#9333ea' }}
                        type="checkbox"
                        checked={useLoadMore}
                        onChange={e => onToggleLoadMore(e.target.checked)}
                        className="rounded border-gray-600 bg-gray-900/30 text-purple-700 focus:ring-purple-700"
                        aria-label="Toggle load more button"
                    />
                    <span>Load More Button</span>
                </label>
            </div>
        </div>
    </motion.div>
));