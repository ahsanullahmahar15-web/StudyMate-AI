
import React from 'react';

interface SidebarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const NavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => {
    return (
        <li>
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClick(); }}
                className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
                    isActive
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                <i className={`fas ${icon} w-6 text-center text-lg`}></i>
                <span className="ml-4 font-medium">{label}</span>
            </a>
        </li>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { icon: 'fa-table-columns', label: 'Dashboard' },
        { icon: 'fa-circle-question', label: 'Question Solver' },
        { icon: 'fa-file-lines', label: 'Notes Summarizer' },
        { icon: 'fa-calendar-days', label: 'Study Planner' },
        { icon: 'fa-book-bookmark', label: 'Library' },
        { icon: 'fa-user-gear', label: 'Profile & Settings' },
        { icon: 'fa-headset', label: 'Support' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 flex-shrink-0 shadow-lg flex flex-col">
             <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center h-[73px]">
                <i className="fas fa-brain text-3xl text-blue-500 mr-3"></i>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Study Assistant
                </h1>
            </div>
            <nav className="flex-1 p-4">
                <ul>
                    {navItems.map(item => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.label}
                            onClick={() => setCurrentPage(item.label)}
                        />
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    © 2024 AI Study Assistant
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;