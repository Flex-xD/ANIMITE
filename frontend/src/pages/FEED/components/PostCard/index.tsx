import { motion } from "framer-motion";
import React from "react";
import { PostHeader } from "../PostHeader";
import { ReviewStars } from "../ReviewStars";
import { PollComponent } from "../PollComponent";
import { PostFooter } from "../PostFooter";
import { Post } from "../../types/types";


export const PostCard = React.memo(({ post, onToggleLike, onVote }: {
    post: Post;
    onToggleLike: (id: string) => void;
    onVote: (postId: string, option: string) => void;
}) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:border-purple-700/30"
    >
        <PostHeader user={{ ...post.user, id: post.user.id, avatar: post.user.avatarUrl }} createdAt={post.createdAt} />
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="text-gray-200 leading-relaxed font-exo"
        >
            {post.content}
        </motion.p>
        {post.type === 'review' && post.stars && <ReviewStars rating={post.stars} />}
        {post.type === 'poll' && post.options && (
            <PollComponent
                options={post.options}
                votes={post.votes}
                userVote={post.userVote}
                onVote={option => onVote(post.id, option)}
            />
        )}
        <PostFooter post={post} onToggleLike={onToggleLike} />
    </motion.div>
));