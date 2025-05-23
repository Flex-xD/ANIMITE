import { motion } from 'framer-motion';

type PollOption = {
    text: string;
    votes: number;
};

type PollPostProps = {
    content: string;
    options: PollOption[];
};

const PollPost = ({ content, options }: PollPostProps) => {
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

    return (
        <>
            <p className="mb-4 text-gray-300">{content}</p>
            <div className="mb-4 space-y-3">
                {options.map((option) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

                    return (
                        <div key={option.text} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">{option.text}</span>
                                <span className="text-gray-400">{Math.round(percentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8, type: 'spring' }}
                                />
                            </div>
                            <div className="text-xs text-gray-500 text-right">
                                {option.votes} votes
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PollPost;