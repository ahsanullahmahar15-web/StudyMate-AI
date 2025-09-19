
import React from 'react';
import ChatInterface from '../ChatInterface';
import { QUESTION_SOLVER_INSTRUCTION, QUESTION_SOLVER_WELCOME_MESSAGE } from '../../constants';

interface QuestionSolverProps {
    language: string;
    setFocusMode: (isFocused: boolean) => void;
}

const QuestionSolver: React.FC<QuestionSolverProps> = ({ language, setFocusMode }) => {
    const finalSystemInstruction = `${QUESTION_SOLVER_INSTRUCTION}\n\nIMPORTANT: You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <div className="h-full">
            <ChatInterface 
                systemInstruction={finalSystemInstruction}
                welcomeMessage={QUESTION_SOLVER_WELCOME_MESSAGE}
                setFocusMode={setFocusMode}
            />
        </div>
    );
};

export default QuestionSolver;
