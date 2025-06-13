import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Heart, Plus, Search, Trash2, Star, ChevronDown, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { Post, User } from './types/types';
import { apiClient } from './middlewares/apiClient';
import { formatDate } from './functions';



// Components
const Badge = React.memo(({ type }: { type: Post['type'] }) => {
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

const LikeButton = React.memo(({ likes, isLiked, onToggle }: {
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

const PostHeader = React.memo(({ user, createdAt }: { user: User; createdAt: string }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-3 mb-4"
    >
        <img
            src={user.avatarUrl}
            alt={`${user.username}'s avatar`}
            className="w-12 h-12 rounded-full ring-2 ring-purple-700/20 shadow-glow"
        />
        <div>
            <h3 className="font-semibold text-white text-lg font-exo">{user.username}</h3>
            <p className="text-sm text-gray-300 font-exo">{formatDate(createdAt)}</p>
        </div>
    </motion.div>
));

const PostFooter = React.memo(({ post, onToggleLike }: {
    post: Post;
    onToggleLike: (id: string) => void;
}) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between mt-4 pt-4 border-t border-white/10"
    >
        <Badge type={post.type} />
        <LikeButton
            likes={post.likes}
            isLiked={post.likedByCurrentUser}
            onToggle={() => onToggleLike(post.id)}
        />
    </motion.div>
));

const PollComponent = React.memo(({ options, votes = {}, userVote, onVote }: {
    options: string[];
    votes?: { [key: string]: number };
    userVote?: string;
    onVote: (option: string) => void;
}) => {
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 mt-4"
        >
            {options.map(option => {
                const voteCount = votes[option] || 0;
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                const isSelected = userVote === option;

                return (
                    <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !userVote && onVote(option)}
                        disabled={!!userVote}
                        className={`w-full p-4 rounded-lg backdrop-blur-md border transition-all duration-300 ${isSelected
                            ? 'border-purple-700 bg-gradient-to-r from-purple-700/20 to-cyan-800/20'
                            : userVote
                                ? 'border-gray-600 bg-gray-800/20'
                                : 'border-gray-500/30 bg-gradient-to-r from-blue-800/20 to-indigo-800/20 hover:border-purple-600 hover:bg-purple-700/10'
                            } shadow-glow`}
                        aria-label={`Vote for ${option}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-left font-medium text-white font-exo">{option}</span>
                            {userVote && (
                                <span className="text-sm text-gray-300 font-exo">
                                    {voteCount} ({percentage.toFixed(1)}%)
                                </span>
                            )}
                        </div>
                        {userVote && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 w-full bg-gray-800/50 rounded-full h-2"
                            >
                                <div className="bg-gradient-to-r from-purple-700 to-cyan-800 h-2 rounded-full" />
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </motion.div>
    );
});

const ReviewStars = React.memo(({ rating }: { rating: number }) => (
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

const PostCard = React.memo(({ post, onToggleLike, onVote }: {
    post: Post;
    onToggleLike: (id: string) => void;
    onVote: (postId: string, option: string) => void;
}) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:border-purple-700/30"
    >
        <PostHeader user={post.user} createdAt={post.createdAt} />
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="text-gray-200 leading-relaxed font-exo"
        >
            {post.content}
        </motion.p>
        {post.type === 'review' && post.stars && <ReviewStars rating={post.stars} />}
        {post.type === 'poll' && post.options && (
            <PollComponent
                options={post.options}
                votes={post.votes}
                userVote={post.userVote}
                onVote={option => onVote(post.id, option)}
            />
        )}
        <PostFooter post={post} onToggleLike={onToggleLike} />
    </motion.div>
));

const PostModal = React.memo(({ isOpen, onClose, onSubmit }: {
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

const Navbar = React.memo(({ onCreatePost, onToggleSidebar }: {
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

const FeedFilter = React.memo(({ selectedType, onTypeChange, searchTerm, onSearchChange, useLoadMore, onToggleLoadMore }: {
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

const Sidebar = React.memo(({ isOpen, onClose, myPosts, likedPosts, onDeletePost }: {
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

// Main App Component
const AnimeFeedPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [useLoadMore, setUseLoadMore] = useState(false);
    const [loadMoreCount, setLoadMoreCount] = useState(1);

    const loadMoreRef = useRef<HTMLDivElement>(null);
    const POSTS_PER_PAGE = 40;
    const currentUser = 'AnimeReviewer';

    // Memoized sidebar data
    const myPosts = useMemo(() => posts.filter(post => post.user.username === currentUser), [posts]);
    const likedPosts = useMemo(() => posts.filter(post => post.likedByCurrentUser), [posts]);

    // Memoized filtered posts
    const filteredPosts = useMemo(
        () =>
            posts.filter(post => {
                const matchesType = selectedType === 'all' || post.type === selectedType;
                const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesType && matchesSearch;
            }),
        [posts, selectedType, searchTerm]
    );

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((value: string) => setSearchTerm(value), 300),
        []
    );

    // Load initial posts
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await apiClient.get('/posts');
                setPosts(response.data);
                setDisplayedPosts(response.data.slice(0, POSTS_PER_PAGE));
            } catch (error) {
                console.error('Failed to load posts:', error);
                setError('Failed to load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    // Update displayed posts
    useEffect(() => {
        setDisplayedPosts(
            useLoadMore ? filteredPosts.slice(0, POSTS_PER_PAGE * loadMoreCount) : filteredPosts
        );
    }, [filteredPosts, useLoadMore, loadMoreCount]);

    // Infinite scroll
    useEffect(() => {
        if (useLoadMore) return;

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 1000
            ) {
                if (displayedPosts.length < filteredPosts.length) {
                    setDisplayedPosts(prev => [
                        ...prev,
                        ...filteredPosts.slice(prev.length, prev.length + 10),
                    ]);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedPosts, filteredPosts, useLoadMore]);

    /** Toggle like for a post */
    const handleToggleLike = useCallback(async (postId: string) => {
        try {
            setPosts(prev =>
                prev.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            likedByCurrentUser: !post.likedByCurrentUser,
                            likes: post.likedByCurrentUser ? post.likes - 1 : post.likes + 1,
                        }
                        : post
                )
            );
        } catch (error) {
            console.error('Failed to update like:', error);
        }
    }, []);

    /** Handle poll voting */
    const handleVote = useCallback(async (postId: string, option: string) => {
        try {
            setPosts(prev =>
                prev.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            userVote: option,
                            votes: {
                                ...post.votes,
                                [option]: (post.votes?.[option] || 0) + 1,
                            },
                        }
                        : post
                )
            );
            console.log('Vote recorded!');
        } catch (error) {
            console.error('Failed to record vote:', error);
        }
    }, []);

    /** Create a new post */
    const handleCreatePost = useCallback(async (postData: Partial<Post>) => {
        try {
            const response = await apiClient.post('/posts', postData);
            const newPost: Post = {
                id: response.data.data.id,
                type: postData.type!,
                user: {
                    username: currentUser,
                    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser}`,
                },
                createdAt: new Date().toISOString(),
                content: postData.content!,
                stars: postData.stars,
                options: postData.options,
                votes: postData.options
                    ? Object.fromEntries(postData.options.map(opt => [opt, 0]))
                    : undefined,
                likes: 0,
                likedByCurrentUser: false,
            };
            setPosts(prev => [newPost, ...prev]);
            console.log('Post created successfully!');
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    }, []);

    /** Delete a post */
    const handleDeletePost = useCallback(async (postId: string) => {
        try {
            await apiClient.delete(`/posts/${postId}`);
            setPosts(prev => prev.filter(post => post.id !== postId));
            console.log('Post deleted successfully!');
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    }, []);

    /** Load more posts */
    const handleLoadMore = useCallback(() => {
        setLoadMoreCount(prev => prev + 1);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900/40 to-blue-950 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-16 h-16 border-4 border-purple-700/30 border-t-cyan-800 rounded-full shadow-glow"
                    aria-label="Loading"
                />
                <p className="text-gray-300 mt-4 font-futura">Initializing anime feed...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900/40 to-blue-950 flex items-center justify-center">
                <p className="text-gray-300 text-lg font-futura">{error}</p>
            </div>
        );
    }

    const showLoadMoreButton = useLoadMore && displayedPosts.length < filteredPosts.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900/40 to-blue-950">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@400;600&display=swap');
          .font-futura { font-family: 'Orbitron', sans-serif; }
          .font-exo { font-family: 'Exo 2', sans-serif; }
          .shadow-glow { box-shadow: 0 0 15px rgba(147, 51, 234, 0.3); }
          .shadow-glow-lg { box-shadow: 0 0 25px rgba(147, 51, 234, 0.5); }
          .hover\\:shadow-glow-lg:hover { box-shadow: 0 0 25px rgba(147, 51, 234, 0.5); }
        `}
            </style>
            <Navbar
                onCreatePost={() => setIsModalOpen(true)}
                onToggleSidebar={() => setIsSidebarOpen(true)}
            />
            <div className="flex max-w-7xl mx-auto">
                <div className={`flex-1 p-4 ${isSidebarOpen ? 'lg:pr-80' : 'lg:pr-0'}`}>
                    <FeedFilter
                        selectedType={selectedType}
                        onTypeChange={setSelectedType}
                        searchTerm={searchTerm}
                        onSearchChange={debouncedSearch}
                        useLoadMore={useLoadMore}
                        onToggleLoadMore={setUseLoadMore}
                    />
                    <div className="space-y-6">
                        <AnimatePresence>
                            {displayedPosts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onToggleLike={handleToggleLike}
                                    onVote={handleVote}
                                />
                            ))}
                        </AnimatePresence>
                        {displayedPosts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-12"
                            >
                                <p className="text-gray-300 text-lg font-exo">No posts found matching your criteria.</p>
                            </motion.div>
                        )}
                        {showLoadMoreButton && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-8"
                                ref={loadMoreRef}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLoadMore}
                                    className="bg-gradient-to-r from-purple-700 to-cyan-800 text-white px-8 py-3 rounded-lg hover:from-purple-800 hover:to-cyan-900 transition-all duration-300 font-exo shadow-glow"
                                    aria-label="Load more posts"
                                >
                                    Load More Posts
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                </div>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    myPosts={myPosts}
                    likedPosts={likedPosts}
                    onDeletePost={handleDeletePost}
                />
            </div>
            <PostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePost}
            />
        </div>
    );
};

export default AnimeFeedPage;