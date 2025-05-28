import { useState } from "react";
import { Post } from "../../types/post";
import { fetchPosts } from "../../api/apiClient";
import { useEffect } from "react";
import { formatRelativeTime } from "../../utils/formatDate";

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState<"myPosts" | "likedPosts">("myPosts");
    const [searchQuery, setSearchQuery] = useState("");
    const [myPosts, setMyPosts] = useState<Post[]>([]);
    const [likedPosts, setLikedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                // Simulate fetching user's posts
                const posts = await fetchPosts();
                setMyPosts(posts.slice(0, 5));
                setLikedPosts(posts.filter(post => post.likedByCurrentUser).slice(0, 5));
            } catch (error) {
                console.error("Failed to load posts", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const filteredPosts = (activeTab === "myPosts" ? myPosts : likedPosts).filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`bg-gray-900/80 backdrop-blur-md border-r border-gray-800 h-full fixed md:relative z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Collapse button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center border border-gray-700 z-10"
            >
                {isCollapsed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                )}
            </button>

            {/* Sidebar content */}
            <div className="h-full overflow-y-auto p-4">
                {!isCollapsed ? (
                    <>
                        {/* Search */}
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search your posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-700 mb-4">
                            <button
                                onClick={() => setActiveTab("myPosts")}
                                className={`px-4 py-2 text-sm font-medium ${activeTab === "myPosts" ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                My Posts
                            </button>
                            <button
                                onClick={() => setActiveTab("likedPosts")}
                                className={`px-4 py-2 text-sm font-medium ${activeTab === "likedPosts" ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                Liked Posts
                            </button>
                        </div>

                        {/* Posts list */}
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">
                                    No {activeTab === "myPosts" ? "posts" : "liked posts"} found
                                </div>
                            ) : (
                                filteredPosts.map(post => (
                                    <div key={post.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-purple-500/50 transition-colors">
                                        <div className="flex items-start space-x-3">
                                            <img
                                                src={post.user.avatarUrl}
                                                alt={post.user.username}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-white truncate">{post.content.split('\n')[0]}</h4>
                                                <p className="text-xs text-gray-400">{formatRelativeTime(post.createdAt)}</p>
                                            </div>
                                            {activeTab === "myPosts" && (
                                                <button className="text-gray-400 hover:text-red-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    // Collapsed view
                    <div className="flex flex-col items-center pt-8 space-y-6">
                        <button
                            onClick={() => setActiveTab("myPosts")}
                            className={`p-2 rounded-lg ${activeTab === "myPosts" ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:bg-gray-800'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setActiveTab("likedPosts")}
                            className={`p-2 rounded-lg ${activeTab === "likedPosts" ? 'bg-pink-500/20 text-pink-400' : 'text-gray-400 hover:bg-gray-800'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};