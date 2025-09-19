
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/pages/Dashboard';
import QuestionSolver from './components/pages/QuestionSolver';
import NotesSummarizer from './components/pages/NotesSummarizer';
import StudyPlanner from './components/pages/StudyPlanner';
import Library from './components/pages/Library';
import Support from './components/pages/Support';
import Profile from './components/pages/Profile';

export type SubscriptionPlan = 'Free' | 'Premium';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const [language, setLanguage] = useState('English');
    const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('Free');

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <Dashboard language={language} />;
            case 'Question Solver':
                return <QuestionSolver language={language} />;
            case 'Notes Summarizer':
                return <NotesSummarizer language={language} />;
            case 'Study Planner':
                return <StudyPlanner language={language} />;
            case 'Library':
                return <Library />;
            case 'Profile & Settings':
                return <Profile 
                            language={language} 
                            setLanguage={setLanguage} 
                            subscriptionPlan={subscriptionPlan}
                            setSubscriptionPlan={setSubscriptionPlan}
                        />;
            case 'Support':
                return <Support language={language} />;
            default:
                return <Dashboard language={language} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentPage={currentPage} />
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
