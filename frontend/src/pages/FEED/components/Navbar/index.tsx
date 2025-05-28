import { PostModal } from "../PostModal";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo/Brand */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        AnimeFeed
                    </span>
                </Link>

                {/* Search (hidden on mobile) */}
                <div className="hidden md:block flex-1 max-w-md mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    <PostModal onPostCreated={() => window.location.reload()} />

                    {/* User avatar */}
                    <button className="relative">
                        <img
                            src="https://i.pravatar.cc/150?img=5"
                            alt="User avatar"
                            className="w-9 h-9 rounded-full border-2 border-purple-500/50 hover:border-purple-500 transition-colors"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
};