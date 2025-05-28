import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { ChevronLeft, Search } from 'lucide-react';
import { Community } from '../../../../constants/types';

type CommunitySidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const mockCommunities: Community[] = [
    { id: '1', name: 'Cyberpunk Edgerunners', members: 12500, icon: 'CE' },
    { id: '2', name: 'HeheHAHA', members: 2330, icon: 'SW' },
    { id: '3', name: 'Edgerunners', members: 340, icon: 'HH' },
    { id: '4', name: 'NAruto and sasuke lovers', members: 500, icon: 'GF' },
];

const CommunitySidebar = ({ isOpen, onClose }: CommunitySidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(mockCommunities);

    useEffect(() => {
        const filtered = mockCommunities.filter(community =>
            community.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCommunities(filtered);
    }, [searchQuery]);

    return (
        <motion.div
            initial={{ width: isOpen ? 280 : 0 }}
            animate={{ width: isOpen ? 280 : 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`h-full flex-shrink-0 bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50 overflow-hidden ${isOpen ? 'px-4 py-6' : ''}`}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col"
                    >
                        {/* Sidebar content */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Cyber Communities
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                                onClick={onClose}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="relative mb-6">
                            <Input
                                type="text"
                                placeholder="Search communities..."
                                className="pl-10 bg-gray-700/50 border-gray-600 focus:ring-2 focus:ring-purple-500/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {filteredCommunities.length > 0 ? (
                                <ul className="space-y-2">
                                    {filteredCommunities.map((community) => (
                                        <CommunityListItem
                                            key={community.id}
                                            community={community}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <NoResults />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const CommunityListItem = ({ community }: { community: Community }) => (
    <motion.li
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
    >
        <div className="flex items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors border border-gray-600/30 hover:border-purple-500/30">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold mr-3">
                {community.icon}
            </div>
            <div>
                <h3 className="font-medium text-white">{community.name}</h3>
                <p className="text-xs text-gray-400">{community.members.toLocaleString()} members</p>
            </div>
        </div>
    </motion.li>
);

const NoResults = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <Search className="w-8 h-8 mb-2" />
        <p>No communities found</p>
    </div>
);

export default CommunitySidebar;