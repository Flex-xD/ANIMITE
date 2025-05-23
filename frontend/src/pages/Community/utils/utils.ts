import { FeedItemType } from '../../../constants/types';

export const getBadgeColor = (type: FeedItemType): string => {
    switch (type) {
        case 'blog': return 'bg-purple-500/20 text-purple-400';
        case 'fanart': return 'bg-pink-500/20 text-pink-400';
        case 'list': return 'bg-cyan-500/20 text-cyan-400';
        case 'poll': return 'bg-blue-500/20 text-blue-400';
        case 'review': return 'bg-yellow-500/20 text-yellow-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
};

export const getTypeLabel = (type: FeedItemType): string => {
    switch (type) {
        case 'blog': return 'Blog';
        case 'fanart': return 'Fan Art';
        case 'list': return 'List';
        case 'poll': return 'Poll';
        case 'review': return 'Review';
        default: return 'Post';
    }
};