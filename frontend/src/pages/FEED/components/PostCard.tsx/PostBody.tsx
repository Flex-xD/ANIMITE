import { Post } from "../../types/post";
import { PollPost } from "./PollPost";
import { BlogPost } from "./PostTypes/BlogPost";
import { NormalPost } from "./PostTypes/NormalPost";
import { ReviewPost } from "./PostTypes/ReviewPost";
import { WatchlistPost } from "./PostTypes/WatchListPost";


interface PostBodyProps {
    post: Post;
}

export const PostBody = ({ post }: PostBodyProps) => {
    const renderPostContent = () => {
        switch (post.type) {
            case "blog":
                return <BlogPost content={post.content} />;
            case "normal":
                return <NormalPost content={post.content} />;
            case "watchlist":
                return <WatchlistPost content={post.content} />;
            case "poll":
                return <PollPost content={post.content} options={post.options} votes={post.votes} />;
            case "review":
                return <ReviewPost content={post.content} stars={post.stars} />;
            default:
                return <NormalPost content={post.content} />;
        }
    };

    return (
        <div className="p-4">
            {renderPostContent()}
        </div>
    );
};