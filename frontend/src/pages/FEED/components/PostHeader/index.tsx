import React from "react";
import {motion} from "framer-motion";
import { User } from "../../../../constants/types";
import { formatDate } from "../../functions";

export const PostHeader = React.memo(({ user, createdAt }: { user: User; createdAt: string }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-3 mb-4"
    >
        <img
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            className="w-12 h-12 rounded-full ring-2 ring-purple-700/20 shadow-glow"
        />
        <div>
            <h3 className="font-semibold text-white text-lg font-exo">{user.username}</h3>
            <p className="text-sm text-gray-300 font-exo">{formatDate(createdAt)}</p>
        </div>
    </motion.div>
));