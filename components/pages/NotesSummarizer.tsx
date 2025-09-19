
import React from 'react';
import ChatInterface from '../ChatInterface';
// FIX: Corrected typo in imported constant name. It was 'NOTES_SUMMARMARIZER_INSTRUCTION' and has been changed to 'NOTES_SUMMARIZER_INSTRUCTION'.
import { NOTES_SUMMARIZER_INSTRUCTION, NOTES_SUMMARIZER_WELCOME_MESSAGE } from '../../constants';

interface NotesSummarizerProps {
    language: string;
}

const NotesSummarizer: React.FC<NotesSummarizerProps> = ({ language }) => {
    const finalSystemInstruction = `${NOTES_SUMMARIZER_INSTRUCTION}\n\nIMPORTANT: You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <div className="h-full">
            <ChatInterface 
                systemInstruction={finalSystemInstruction}
                welcomeMessage={NOTES_SUMMARIZER_WELCOME_MESSAGE}
            />
        </div>
    );
};

export default NotesSummarizer;