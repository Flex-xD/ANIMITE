import React, { useState } from 'react';
import { FiMenu, FiX, FiHome, FiSettings, FiUser, FiCalendar } from 'react-icons/fi';

interface SidebarItem {
    icon: React.ReactNode;
    text: string;
    href: string;
}

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItems: SidebarItem[] = [
        { icon: <FiHome />, text: 'Home', href: '#' },
        { icon: <FiUser />, text: 'Profile', href: '#' },
        { icon: <FiCalendar />, text: 'Calendar', href: '#' },
        { icon: <FiSettings />, text: 'Settings', href: '#' },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`
        h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out relative
        ${isCollapsed ? 'w-20' : 'w-64'}
        `}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="
                absolute -right-4 top-5 w-8 h-8 rounded-full bg-gray-800 text-white
                border-2 border-white flex items-center justify-center cursor-pointer z-10
                hover:bg-gray-700 transition-colors"
            >
                {isCollapsed ? <FiMenu size={18} /> : <FiX size={18} />}
            </button>

            {/* Sidebar Content */}
            <div className="p-5">
                {/* Sidebar Header */}
                {!isCollapsed && (
                    <div className="mb-8 text-center">
                        <h3 className="text-xl font-semibold">Menu</h3>
                    </div>
                )}

                {/* Sidebar Menu */}
                <ul className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className={`
                            flex items-center p-3 rounded-md transition-colors
                            hover:bg-gray-700
                        ${isCollapsed ? 'justify-center' : ''}
                `}
                            >
                                <span className={`${isCollapsed ? 'text-2xl' : 'text-xl mr-3'}`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-sm font-medium">{item.text}</span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;