
import React from 'react';

interface PagePlaceholderProps {
    title: string;
    icon: string;
    description: string;
}

const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ title, icon, description }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100 dark:bg-gray-900">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                <i className={`fas ${icon} text-5xl text-blue-500`}></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{title}</h1>
            <p className="max-w-md text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
};

export default PagePlaceholder;
