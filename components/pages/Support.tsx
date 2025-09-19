
import React, { useState } from 'react';
import ChatInterface from '../ChatInterface';
import { SUPPORT_ASSISTANT_INSTRUCTION, SUPPORT_ASSISTANT_WELCOME_MESSAGE } from '../../constants';

interface FaqItem {
    question: string;
    answer: string;
}

interface SupportProps {
    language: string;
}

const faqData: FaqItem[] = [
    {
        question: "How do I create a study plan?",
        answer: "Navigate to the 'Study Planner' page from the sidebar. Fill in your exam name, subjects, the exam date, and how many hours you can study daily. Then, click 'Generate My Plan', and the AI will create a personalized schedule for you."
    },
    {
        question: "What file types can I upload?",
        answer: "You can upload images (PNG, JPEG, WEBP) and plain text files (TXT). This is perfect for sharing photos of handwritten notes, textbook problems, or your typed-up summaries."
    },
    {
        question: "How does the Notes Summarizer work?",
        answer: "Go to the 'Notes Summarizer' page. You can either paste your text directly into the chat or upload a text file or an image of your notes. The AI will read the content and provide a concise, bullet-pointed summary focusing on key information."
    },
    {
        question: "Can I save my work?",
        answer: "Currently, the Library feature is a preview. The ability to save chat histories, summaries, and plans is a planned feature for a future update. Stay tuned!"
    },
    {
        question: "How do I change the theme?",
        answer: "You can switch between Light and Dark mode on the 'Profile & Settings' page. Simply click on your preferred theme, and the app will update instantly."
    }
];

const FaqItem: React.FC<{ faq: FaqItem; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={onClick}
                className="w-full text-left p-4 focus:outline-none"
            >
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{faq.question}</h3>
                    <i className={`fas fa-chevron-down text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}></i>
                </div>
            </button>
            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

const Support: React.FC<SupportProps> = ({ language }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqClick = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const finalSystemInstruction = `${SUPPORT_ASSISTANT_INSTRUCTION}\n\nIMPORTANT: You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <div className="flex h-full bg-gray-100 dark:bg-gray-900">
            {/* Left Column: FAQs */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto">
                <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Support Center</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Find answers to common questions or chat with our assistant.</p>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        {faqData.map((faq, index) => (
                            <FaqItem
                                key={index}
                                faq={faq}
                                isOpen={openFaqIndex === index}
                                onClick={() => handleFaqClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Chat Assistant */}
            <div className="hidden lg:block w-1/2 border-l border-gray-200 dark:border-gray-700">
                <ChatInterface 
                    systemInstruction={finalSystemInstruction}
                    welcomeMessage={SUPPORT_ASSISTANT_WELCOME_MESSAGE}
                />
            </div>
        </div>
    );
};

export default Support;