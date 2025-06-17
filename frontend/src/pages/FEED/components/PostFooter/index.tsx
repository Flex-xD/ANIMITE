import React from "react";
import { Post } from "../../types/types";
import {motion} from "framer-motion";

import { LikeButton } from "../Like Button";
import { Badge } from "../Badge";
;
export const PostFooter = React.memo(({ post, onToggleLike }: {
    post: Post;
    onToggleLike: (id: string) => void;
}) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between mt-4 pt-4 border-t border-white/10"
    >
        <Badge type={post.type} />
        <LikeButton
            likes={post.likes}
            isLiked={post.likedByCurrentUser}
            onToggle={() => onToggleLike(post.id)}
        />
    </motion.div>
));