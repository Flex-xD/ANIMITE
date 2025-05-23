'use client';
import { Button } from '../../../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../../../components/ui/avatar';
import { Menu } from 'lucide-react';

type CommunityNavbarProps = {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
};

const CommunityNavbar = ({ isSidebarOpen, onToggleSidebar }: CommunityNavbarProps) => {
    return (
        <nav className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 p-4 flex items-center justify-between">
            <div className="flex items-center">
                {!isSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-gray-700/50 mr-2"
                        onClick={onToggleSidebar}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                )}
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    CyberAnime Network
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="outline" className="bg-transparent border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
                    Create Post
                </Button>
                <Avatar className="border-2 border-cyan-400/50">
                    <AvatarImage src="/avatars/user.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default CommunityNavbar;