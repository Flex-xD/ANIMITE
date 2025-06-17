import {motion} from "framer-motion";
import React from "react";

export const PollComponent = React.memo(({ options, votes = {}, userVote, onVote }: {
    options: string[];
    votes?: { [key: string]: number };
    userVote?: string;
    onVote: (option: string) => void;
}) => {
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 mt-4"
        >
            {options.map(option => {
                const voteCount = votes[option] || 0;
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                const isSelected = userVote === option;

                return (
                    <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !userVote && onVote(option)}
                        disabled={!!userVote}
                        className={`w-full p-4 rounded-lg backdrop-blur-md border transition-all duration-300 ${isSelected
                            ? 'border-purple-700 bg-gradient-to-r from-purple-700/20 to-cyan-800/20'
                            : userVote
                                ? 'border-gray-600 bg-gray-800/20'
                                : 'border-gray-500/30 bg-gradient-to-r from-blue-800/20 to-indigo-800/20 hover:border-purple-600 hover:bg-purple-700/10'
                            } shadow-glow`}
                        aria-label={`Vote for ${option}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-left font-medium text-white font-exo">{option}</span>
                            {userVote && (
                                <span className="text-sm text-gray-300 font-exo">
                                    {voteCount} ({percentage.toFixed(1)}%)
                                </span>
                            )}
                        </div>
                        {userVote && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 w-full bg-gray-800/50 rounded-full h-2"
                            >
                                <div className="bg-gradient-to-r from-purple-700 to-cyan-800 h-2 rounded-full" />
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </motion.div>
    );
});