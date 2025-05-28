interface LikeButtonProps {
    liked: boolean;
    likeCount: number;
    onClick: () => void;
}

export const LikeButton = ({ liked, likeCount, onClick }: LikeButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center space-x-1 group"
        >
            <div className={`p-1 rounded-full group-hover:bg-pink-500/20 transition-colors ${liked ? 'text-pink-500' : 'text-white/60'}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={liked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={liked ? 0 : 2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <span className={`text-sm ${liked ? 'text-pink-500' : 'text-white/60'}`}>
                {likeCount}
            </span>
        </button>
    );
};