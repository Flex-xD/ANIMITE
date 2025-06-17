import React, { useMemo, useState } from "react";
import { Post } from "../../types/types";
import { Search, Trash2, X } from "lucide-react";
import { formatDate } from "../../functions";
import {motion} from "framer-motion";

export const Sidebar = React.memo(({ isOpen, onClose, myPosts, likedPosts, onDeletePost }: {
    isOpen: boolean;
    onClose: () => void;
    myPosts: Post[];
    likedPosts: Post[];
    onDeletePost: (id: string) => void;
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'my' | 'liked'>('my');

    const filteredMyPosts = useMemo(
        () => myPosts.filter(post => post.content.toLowerCase().includes(searchTerm.toLowerCase())),
        [myPosts, searchTerm]
    );

    const filteredLikedPosts = useMemo(
        () => likedPosts.filter(post => post.content.toLowerCase().includes(searchTerm.toLowerCase())),
        [likedPosts, searchTerm]
    );

    return (
        <>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-80 bg-gray-900/50 backdrop-blur-lg border-l border-white/10 z-50"
            >
                <div className="p-6 h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white font-futura">My Activity</h2>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="text-gray-300 hover:text-white transition-colors"
                            aria-label="Close sidebar"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </div>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" aria-hidden="true" />
                        <motion.input
                            whileFocus={{ borderColor: '#9333ea' }}
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-900/30 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-purple-700 focus:border-transparent font-futura"
                            aria-label="Search activity"
                        />
                    </div>
                    <div className="flex space-x-2 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('my')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 font-futura ${activeTab === 'my'
                                ? 'bg-gradient-to-r from-purple-700/20 to-cyan-800/20 text-purple-300 border border-purple-700/30 shadow-glow'
                                : 'bg-gradient-to-r from-blue-800/20 to-indigo-800/20 text-gray-300 hover:bg-purple-700/10'
                                }`}
                            aria-pressed={activeTab === 'my'}
                        >
                            My Posts ({myPosts.length})
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab('liked')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 font-futura ${activeTab === 'liked'
                                ? 'bg-gradient-to-r from-purple-700/20 to-cyan-800/20 text-purple-300 border border-purple-700/30 shadow-glow'
                                : 'bg-gradient-to-r from-blue-800/20 to-indigo-800/20 text-gray-300 hover:bg-purple-700/10'
                                }`}
                            aria-pressed={activeTab === 'liked'}
                        >
                            Liked ({likedPosts.length})
                        </motion.button>
                    </div>
                    <div className="space-y-4">
                        {(activeTab === 'my' ? filteredMyPosts : filteredLikedPosts).map(post => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-900/30 border border-white/10 rounded-lg p-4 shadow-glow"
                            >
                                <div className="flex items-start space-x-3">
                                    <img
                                        src={post.user.avatarUrl}
                                        alt={`${post.user.username}'s avatar`}
                                        className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-purple-700/20"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 truncate font-futura">
                                            {post.content.substring(0, 80)}...
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 font-futura">
                                            {formatDate(post.createdAt)}
                                        </p>
                                    </div>
                                    {activeTab === 'my' && (
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => onDeletePost(post.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                                            aria-label={`Delete post by ${post.user.username}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
});
