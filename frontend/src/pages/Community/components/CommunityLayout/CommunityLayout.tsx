import { ReactNode, useState } from 'react';
import CommunitySidebar from '../CommunitySideBar/CommunitySidebar';
import CommunityNavbar from '../CommunityNavbar/CommunityNavbar';

type CommunityLayoutProps = {
    children: ReactNode;
};

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <CommunitySidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <CommunityNavbar
                    isSidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                {children}
            </div>
        </div>
    );
};

export default CommunityLayout;