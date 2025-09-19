
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-start">
             <div className="flex items-start max-w-2xl gap-3">
                 <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white bg-green-500">
                    <i className="fas fa-robot"></i>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
