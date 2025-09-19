
import React from 'react';

interface HeaderProps {
    currentPage: string;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onMenuClick }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center h-[73px] border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
             <button
                onClick={onMenuClick}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 md:hidden mr-4 -ml-2"
                aria-label="Toggle navigation"
                aria-expanded={false}
                aria-controls="sidebar"
            >
                <i className="fas fa-bars text-xl"></i>
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                {currentPage}
            </h1>
        </header>
    );
};

export default Header;
