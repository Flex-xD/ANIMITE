'use client';
import { motion } from 'framer-motion';
import { FeedItem } from "../../../constants/types";
import BlogPost from './feedItems/BlogPost';
import FanArtPost from './feedItems/FanArt';
import ListPost from './feedItems/ListPost';
import PollPost from './feedItems/PollPost';
import ReviewPost from './feedItems/ReviewPost';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

type FeedItemProps = {
    item: FeedItem;
};

const FeedItemComponent = ({ item }: FeedItemProps) => {
    const renderContent = () => {
        switch (item.type) {
            case 'blog':
                return <BlogPost content={item.content} />;
            case 'fanart':
                return <FanArtPost content={item.content} imageUrl={item.additionalData.imageUrl} />;
            case 'list':
                return <ListPost content={item.content} items={item.additionalData.items} />;
            case 'poll':
                return <PollPost content={item.content} options={item.additionalData.options} />;
            case 'review':
                return <ReviewPost content={item.content} rating={item.additionalData.rating} />;
            default:
                return <div>{(item as any).content}</div>;
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-colors"
        >
            <PostHeader user={item.user} timestamp={item.timestamp} />
            <div className="p-4">
                {renderContent()}
                <PostFooter type={item.type} likes={item.likes} />
            </div>
        </motion.article>
    );
};

export default FeedItemComponent;