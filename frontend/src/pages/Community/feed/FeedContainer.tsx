import { FeedItem } from '../../../constants/types';
import FeedItemComponent from './FeedItem';

type FeedContainerProps = {
    feedItems: FeedItem[];
};

const FeedContainer = ({ feedItems }: FeedContainerProps) => {
    return (
        <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-8">
                {feedItems.map((item) => (
                    <FeedItemComponent key={item.id} item={item} />
                ))}
            </div>
        </main>
    );
};

export default FeedContainer;