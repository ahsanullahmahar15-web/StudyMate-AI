
import React from 'react';

interface HeaderProps {
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center h-[73px] border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {currentPage}
            </h1>
        </header>
    );
};

export default Header;
