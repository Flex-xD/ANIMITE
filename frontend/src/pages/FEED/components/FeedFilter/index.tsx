import { useState } from "react";
import { PostType } from "../../types/post";

interface FeedFilterProps {
    onFilterChange: (type?: PostType, searchQuery?: string) => void;
    onToggleLoadMore: (useLoadMore: boolean) => void;
}

export const FeedFilter = ({ onFilterChange, onToggleLoadMore }: FeedFilterProps) => {
    const [activeFilter, setActiveFilter] = useState<PostType | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [useLoadMore, setUseLoadMore] = useState(false);

    const postTypes: PostType[] = ["blog", "normal", "watchlist", "poll", "review"];

    const handleFilterClick = (type: PostType | "all") => {
        setActiveFilter(type);
        onFilterChange(type === "all" ? undefined : type, searchQuery);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange(activeFilter === "all" ? undefined : activeFilter as PostType, searchQuery);
    };

    const toggleLoadMore = () => {
        const newValue = !useLoadMore;
        setUseLoadMore(newValue);
        onToggleLoadMore(newValue);
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-purple-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Load More Toggle */}
                <div className="flex items-center">
                    <span className="text-sm text-white/70 mr-2">Load More:</span>
                    <button
                        onClick={toggleLoadMore}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${useLoadMore ? 'bg-purple-600' : 'bg-gray-600'}`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${useLoadMore ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
                <button
                    onClick={() => handleFilterClick("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === "all" ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                    All Posts
                </button>
                {postTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleFilterClick(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${activeFilter === type ? getActiveFilterClass(type) : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper function for active filter colors
const getActiveFilterClass = (type: PostType): string => {
    const colors = {
        blog: "bg-purple-500 text-white",
        normal: "bg-blue-500 text-white",
        watchlist: "bg-cyan-500 text-white",
        poll: "bg-yellow-500 text-white",
        review: "bg-pink-500 text-white",
    };
    return colors[type];
};