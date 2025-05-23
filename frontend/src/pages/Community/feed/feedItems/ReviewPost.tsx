import { Star } from 'lucide-react';

type ReviewPostProps = {
    content: string;
    rating: number;
};

const ReviewPost = ({ content, rating }: ReviewPostProps) => {
    return (
        <>
            <div className="mb-3 flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                ))}
                <span className="ml-2 text-sm text-yellow-400">
                    {rating}.0 rating
                </span>
            </div>
            <p className="mb-4 text-gray-300">{content}</p>
        </>
    );
};

export default ReviewPost;