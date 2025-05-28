import { User } from "../../types/post";
import { formatRelativeTime } from "../../utils/formatDate";

interface PostHeaderProps {
    user: User;
    createdAt: string;
}

export const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    return (
        <div className="flex items-center p-4 border-b border-white/10">
            <div className="relative">
                <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-3 flex-1">
                <h3 className="font-bold text-white">{user.username}</h3>
                <p className="text-xs text-white/60">{formatRelativeTime(createdAt)}</p>
            </div>
            <button className="text-white/50 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </button>
        </div>
    );
};