import { useState, useEffect } from "react";
import { fetchPosts } from "../../api/apiClient";
import { Post, PostType } from "../../types/post";
import { FeedFilter } from "../FeedFilter";
import { PostCard } from "../PostCard.tsx";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.ts";

export const FeedPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useLoadMore, setUseLoadMore] = useState(false);
    const [page, setPage] = useState(1);

    const loadPosts = async (pageNum: number = 1, filter?: PostType, searchQuery?: string) => {
        try {
            setLoading(true);
            const newPosts = await fetchPosts({ type: filter, searchQuery });

            if (pageNum === 1) {
                setPosts(newPosts);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
            }
        } catch (err) {
            setError("Failed to load posts. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadPosts();
    }, []);

    // Handle filter changes
    const handleFilterChange = (type?: PostType, searchQuery?: string) => {
        setPage(1);
        loadPosts(1, type, searchQuery);
    };

    // Handle load more
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadPosts(nextPage);
    };

    // Infinite scroll hook
    const { bottomRef } = useInfiniteScroll(() => {
        if (!useLoadMore && !loading) {
            handleLoadMore();
        }
    });

    // Toggle like
    const handleLike = async (postId: string) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likedByCurrentUser: !post.likedByCurrentUser,
                    likes: post.likedByCurrentUser ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Anime Feed
                </span>
            </h1>
            <p className="text-white/70 text-center mb-8">Discover and share your anime experiences</p>

            <FeedFilter
                onFilterChange={handleFilterChange}
                onToggleLoadMore={setUseLoadMore}
            />

            {loading && page === 1 ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-center">
                    {error}
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {posts.map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onLike={handleLike}
                            />
                        ))}
                    </div>

                    {useLoadMore && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}

                    {/* Infinite scroll detector */}
                    <div ref={bottomRef} className="h-1" />
                </>
            )}
        </div>
    );
};