
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession } from '../services/geminiService';
import { Role, Message } from '../types';
import ChatMessage from './ChatMessage';
import Loader from './Loader';

interface ChatInterfaceProps {
    systemInstruction: string;
    welcomeMessage: string;
    setFocusMode: (isFocused: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ systemInstruction, welcomeMessage, setFocusMode }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: Role.MODEL,
            content: welcomeMessage,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const chatSessionRef = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const allowedTextTypes = ['text/plain'];
            const allowedTypes = [...allowedImageTypes, ...allowedTextTypes];

            if (allowedTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                setFocusMode(true); // Enter focus mode on file select
                if (allowedImageTypes.includes(selectedFile.type)) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFilePreview(reader.result as string);
                    };
                    reader.readAsDataURL(selectedFile);
                } else {
                    setFilePreview(null); // No image preview for text files
                }
            } else {
                setError("Unsupported file type. Please upload an image (JPEG, PNG, WEBP) or a text file (TXT).");
                if(fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (!inputValue.trim()) {
            setFocusMode(false); // Exit focus mode if input is also empty
        }
    };

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!inputValue.trim() && !file) || isLoading) return;

        let attachmentForUi;
        if (file && file.type.startsWith('image/')) {
            attachmentForUi = { name: file.name, type: file.type, data: filePreview! };
        }

        const userMessage: Message = { role: Role.USER, content: inputValue.trim(), attachment: attachmentForUi };
        setMessages((prev) => [...prev, userMessage]);

        const fileToSend = file;
        const textToSend = inputValue.trim();
        setInputValue('');
        setFile(null);
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsLoading(true);
        setError(null);

        try {
            if (!chatSessionRef.current) {
                chatSessionRef.current = createChatSession(systemInstruction);
            }

            const parts: ({ inlineData: { mimeType: string; data: string; } } | { text: string })[] = [];
            let promptText = textToSend;

            if (fileToSend) {
                if (fileToSend.type.startsWith('image/')) {
                    const base64Data = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve((reader.result as string).split(',')[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(fileToSend);
                    });
                    parts.push({ inlineData: { mimeType: fileToSend.type, data: base64Data } });
                } else if (fileToSend.type === 'text/plain') {
                    const textContent = await fileToSend.text();
                    const defaultPrompt = "Summarize the following document, highlighting key points, definitions, and formulas:";
                    promptText = `Based on the content of "${fileToSend.name}" provided below, please respond to the user's request.\n\n--- DOCUMENT START ---\n${textContent}\n--- DOCUMENT END ---\n\nUSER REQUEST: ${promptText || defaultPrompt}`;
                }
            }
            
            if (promptText) {
                parts.push({ text: promptText });
            }

            const stream = await chatSessionRef.current.sendMessageStream({ message: parts });

            let modelResponse = '';
            setMessages((prev) => [...prev, { role: Role.MODEL, content: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelResponse;
                    return newMessages;
                });
            }

        } catch (err) {
            console.error(err);
            const errorMessage = "Sorry, I encountered an error. Please try again. If the problem persists, check your API key and network connection.";
            setError(errorMessage);
            setMessages((prev) => [...prev, { role: Role.MODEL, content: errorMessage }]);
        } finally {
            setIsLoading(false);
            setFocusMode(false); // Exit focus mode on completion
        }
    }, [inputValue, isLoading, file, filePreview, systemInstruction, setFocusMode]);
    
    const handleFormFocus = () => setFocusMode(true);
    const handleFormBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
             if (!inputValue.trim() && !file) {
                setFocusMode(false);
            }
        }
    };


    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && <Loader />}
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div 
                    className="max-w-4xl mx-auto"
                    onFocus={handleFormFocus}
                    onBlur={handleFormBlur}
                >
                    {error && <div className="text-red-500 text-center p-2 mb-2">{error}</div>}
                    {file && (
                        <div className="relative p-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 w-fit">
                            <div className="flex items-center space-x-3">
                                {filePreview ? (
                                    <img src={filePreview} alt="Preview" className="h-14 w-14 rounded-md object-cover" />
                                ) : (
                                    <i className="fas fa-file-alt text-3xl text-gray-500 dark:text-gray-400 pl-3"></i>
                                )}
                                <span className="text-sm text-gray-800 dark:text-gray-200 truncate pr-6">{file.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="absolute top-1 right-1 bg-gray-400 dark:bg-gray-600 rounded-full h-5 w-5 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                                aria-label="Remove file"
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2 sm:space-x-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/webp, text/plain"
                            className="hidden"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            aria-label="Attach file"
                        >
                            <i className="fas fa-paperclip text-lg"></i>
                        </button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question or upload a file..."
                            className="flex-1 w-full px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || (!inputValue.trim() && !file)}
                            className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                        >
                            <i className="fas fa-paper-plane text-lg"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
