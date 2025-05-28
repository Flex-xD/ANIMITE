import { PostType } from "../../types/post";

const badgeColors: Record<PostType, string> = {
    blog: "bg-purple-500/20 text-purple-400",
    normal: "bg-blue-500/20 text-blue-400",
    watchlist: "bg-cyan-500/20 text-cyan-400",
    poll: "bg-yellow-500/20 text-yellow-400",
    review: "bg-pink-500/20 text-pink-400",
};

interface BadgeProps {
    type: PostType;
}

export const Badge = ({ type }: BadgeProps) => {
    return (
        <span className={`${badgeColors[type]} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider`}>
            {type}
        </span>
    );
};