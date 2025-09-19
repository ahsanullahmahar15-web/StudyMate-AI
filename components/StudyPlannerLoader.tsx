
import React, { useState, useEffect } from 'react';

const messages = [
    "Crafting your personalized study plan...",
    "Balancing subjects and breaks for optimal focus...",
    "Scheduling your revision sessions...",
    "Organizing your path to success...",
];

const StudyPlannerLoader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100 dark:bg-gray-900">
            <div className="relative flex items-center justify-center h-24 w-24 mb-6">
                <div className="absolute h-full w-full bg-blue-500 rounded-full opacity-75 animate-ping"></div>
                <i className="fas fa-calendar-days text-5xl text-blue-500 z-10"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Generating Your Plan</h1>
            <p className="max-w-md text-gray-600 dark:text-gray-400 transition-opacity duration-500">
                {messages[messageIndex]}
            </p>
        </div>
    );
};

export default StudyPlannerLoader;
