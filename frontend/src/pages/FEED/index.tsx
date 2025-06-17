import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { Post } from './types/types';
import { apiClient } from './middlewares/apiClient';
import { Navbar } from './components/Navbar';
import { FeedFilter } from './components/FilterFeed';
import { PostCard } from './components/PostCard';
import { Sidebar } from './components/Sidebar';
import { PostModal } from './components/PostModal';

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