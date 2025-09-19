
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const setFocusMode = (isFocused: boolean) => {
        if (window.innerWidth >= 768) { // md breakpoint in Tailwind
            setIsSidebarOpen(!isFocused);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <Dashboard language={language} setFocusMode={setFocusMode} />;
            case 'Question Solver':
                return <QuestionSolver language={language} setFocusMode={setFocusMode} />;
            case 'Notes Summarizer':
                return <NotesSummarizer language={language} setFocusMode={setFocusMode} />;
            case 'Study Planner':
                return <StudyPlanner language={language} setFocusMode={setFocusMode} />;
            case 'Library':
                return <Library />;
            case 'Profile & Settings':
                return <Profile 
                            language={language} 
                            setLanguage={setLanguage} 
                            subscriptionPlan={subscriptionPlan}
                            setSubscriptionPlan={setSubscriptionPlan}
                            setFocusMode={setFocusMode}
                        />;
            case 'Support':
                return <Support language={language} setFocusMode={setFocusMode} />;
            default:
                return <Dashboard language={language} setFocusMode={setFocusMode} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 overflow-hidden">
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)} 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
                    aria-hidden="true"
                />
            )}
            <Sidebar 
                currentPage={currentPage} 
                setCurrentPage={(page) => {
                    setCurrentPage(page);
                    if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                    }
                }} 
                isOpen={isSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentPage={currentPage} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
