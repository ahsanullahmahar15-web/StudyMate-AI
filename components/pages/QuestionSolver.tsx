
import React from 'react';
import ChatInterface from '../ChatInterface';
import { QUESTION_SOLVER_INSTRUCTION, QUESTION_SOLVER_WELCOME_MESSAGE } from '../../constants';

interface QuestionSolverProps {
    language: string;
}

const QuestionSolver: React.FC<QuestionSolverProps> = ({ language }) => {
    const finalSystemInstruction = `${QUESTION_SOLVER_INSTRUCTION}\n\nIMPORTANT: You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <div className="h-full">
            <ChatInterface 
                systemInstruction={finalSystemInstruction}
                welcomeMessage={QUESTION_SOLVER_WELCOME_MESSAGE}
            />
        </div>
    );
};

export default QuestionSolver;