import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBadgeColor, getTypeLabel } from '../utils/utils';
import { FeedItemType } from '../../../constants/types';
import { useState } from 'react';

type PostFooterProps = {
    type: FeedItemType;
    likes: number;
};

const PostFooter = ({ type, likes }: PostFooterProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <Badge className={`${getBadgeColor(type)} flex items-center gap-1`}>
                {getTypeLabel(type)}
            </Badge>

            <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 ${isLiked ? 'text-pink-500' : 'text-gray-400'}`}
                onClick={handleLike}
            >
                <motion.div
                    animate={{
                        scale: isLiked ? [1, 1.3, 1] : 1,
                        rotate: isLiked ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.div>
                <span>{likeCount}</span>
            </Button>
        </div>
    );
};

export default PostFooter;