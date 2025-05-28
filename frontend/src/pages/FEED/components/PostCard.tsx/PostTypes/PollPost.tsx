interface PollPostProps {
    content: string;
    options?: string[];
    votes?: number[];
}

export const PollPost = ({ content, options = [], votes = [] }: PollPostProps) => {
    const totalVotes = votes.reduce((sum, vote) => sum + vote, 0);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{content}</h3>
            <div className="space-y-3">
                {options.map((option, index) => {
                    const percentage = totalVotes > 0 ? Math.round((votes[index] / totalVotes) * 100) : 0;
                    return (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/80">{option}</span>
                                <span className="text-yellow-400">{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-xs text-white/50">{totalVotes} votes</p>
        </div>
    );
};