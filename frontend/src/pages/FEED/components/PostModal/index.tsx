import React, { useState } from "react";
import { Post } from "../../types/types";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion";
import { Star, X } from "lucide-react";

export const PostModal = React.memo(({ isOpen, onClose, onSubmit }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (postData: Partial<Post>) => void;
}) => {
    const [postType, setPostType] = useState<Post['type']>('normal');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState(5);
    const [pollOptions, setPollOptions] = useState(['', '']);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const postData: Partial<Post> = {
            type: postType,
            content,
            ...(postType === 'review' && { stars }),
            ...(postType === 'poll' && { options: pollOptions.filter(opt => opt.trim()) }),
        };
        onSubmit(postData);
        setContent('');
        setStars(5);
        setPollOptions(['', '']);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-glow"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent font-futura">
                            Create New Post
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="text-gray-300 hover:text-white transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3 font-futura">Post Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {(['normal', 'blog', 'review', 'poll', 'watchlist'] as const).map(type => (
                                    <motion.button
                                        key={type}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setPostType(type)}
                                        className={`p-3 rounded-lg border transition-all duration-300 capitalize font-futura ${postType === type
                                            ? 'border-purple-700 bg-gradient-to-r from-purple-700/20 to-cyan-800/20 text-purple-300 shadow-glow'
                                            : 'border-gray-500/30 bg-gradient-to-r from-blue-800/20 to-indigo-800/20 text-gray-300 hover:border-purple-600 hover:bg-purple-700/10'
                                            }`}
                                        aria-pressed={postType === type}
                                    >
                                        {type}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="post-content" className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                                Content
                            </label>
                            <motion.textarea
                                id="post-content"
                                whileFocus={{ borderColor: '#9333ea' }}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full p-4 bg-gray-900/30 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-700 focus:border-transparent resize-none font-futura"
                                rows={4}
                                required
                                aria-required="true"
                            />
                        </div>

                        {postType === 'review' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">Rating</label>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <motion.button
                                            key={rating}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            onClick={() => setStars(rating)}
                                            className="transition-colors"
                                            aria-label={`Rate ${rating} stars`}
                                        >
                                            <Star
                                                className={`w-8 h-8 ${rating <= stars ? 'text-yellow-500 fill-current' : 'text-gray-600'}`}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {postType === 'poll' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">Poll Options</label>
                                {pollOptions.map((option, index) => (
                                    <motion.input
                                        key={index}
                                        whileFocus={{ borderColor: '#9333ea' }}
                                        type="text"
                                        value={option}
                                        onChange={e => {
                                            const newOptions = [...pollOptions];
                                            newOptions[index] = e.target.value;
                                            setPollOptions(newOptions);
                                        }}
                                        placeholder={`Option ${index + 1}`}
                                        className="w-full p-3 bg-gray-900/30 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-700 focus:border-transparent mb-2 font-futura"
                                        aria-label={`Poll option ${index + 1}`}
                                    />
                                ))}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setPollOptions([...pollOptions, ''])}
                                    className="text-purple-600 hover:text-purple-500 transition-colors text-sm font-futura"
                                    aria-label="Add poll option"
                                >
                                    + Add Option
                                </motion.button>
                            </div>
                        )}

                        <div className="flex space-x-4 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-futura"
                                aria-label="Cancel post creation"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-700 to-cyan-800 text-white rounded-lg hover:from-purple-800 hover:to-cyan-900 transition-all duration-300 font-futura shadow-glow"
                                aria-label="Submit post"
                            >
                                Post
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});