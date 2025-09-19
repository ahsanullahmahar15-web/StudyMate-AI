
import React from 'react';
import ChatInterface from '../ChatInterface';
import { DASHBOARD_INSTRUCTION, DASHBOARD_WELCOME_MESSAGE } from '../../constants';

interface DashboardProps {
    language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
    const finalSystemInstruction = `${DASHBOARD_INSTRUCTION}\n\nIMPORTANT: You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <div className="h-full">
            <ChatInterface 
                systemInstruction={finalSystemInstruction}
                welcomeMessage={DASHBOARD_WELCOME_MESSAGE}
            />
        </div>
    );
};

export default Dashboard;