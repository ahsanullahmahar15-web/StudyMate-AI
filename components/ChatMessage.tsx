import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === Role.USER;

    const messageContainerClasses = isUser
        ? 'flex justify-end'
        : 'flex justify-start';

    const messageBubbleClasses = isUser
        ? 'bg-blue-500 text-white'
        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm';
    
    const avatarIcon = isUser ? 'fa-user' : 'fa-robot';
    const avatarColor = isUser ? 'bg-blue-500' : 'bg-green-500';
    
    return (
        <div className={`${messageContainerClasses} group`}>
            <div className={`flex items-start max-w-2xl gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white ${avatarColor}`}>
                    <i className={`fas ${avatarIcon}`}></i>
                </div>
                <div
                    className={`px-5 py-3 rounded-2xl ${messageBubbleClasses} ${isUser ? 'rounded-br-none' : 'rounded-bl-none'}`}
                >
                    {message.attachment?.type.startsWith('image/') && (
                        <img
                            src={message.attachment.data}
                            alt={message.attachment.name}
                            className="mb-2 rounded-lg max-w-xs max-h-64 object-contain"
                        />
                    )}
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {message.content.split('**').map((part, index) => 
                            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;