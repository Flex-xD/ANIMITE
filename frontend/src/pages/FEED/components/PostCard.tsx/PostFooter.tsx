import { Badge } from "lucide-react";
import { Post } from "../../types/post";
import { LikeButton } from "./LikeButton";


interface PostFooterProps {
    post: Post;
    onLike: () => void;
}

export const PostFooter = ({ post, onLike }: PostFooterProps) => {
    return (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <LikeButton
                    liked={post.likedByCurrentUser}
                    likeCount={post.likes}
                    onClick={onLike}
                />
            </div>
            <Badge type={post.type} />
        </div>
    );
};