import { Post } from "../../types/post";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 transition-all hover:shadow-2xl">
            <PostHeader user={post.user} createdAt={post.createdAt} />
            <PostBody post={post} />
            <PostFooter
                post={post}
                onLike={() => onLike(post.id)}
            />
        </div>
    );
};