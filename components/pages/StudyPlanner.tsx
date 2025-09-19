
import React, { useState } from 'react';
import { STUDY_PLANNER_INSTRUCTION } from '../../constants';
import { generateOneOffContent } from '../../services/geminiService';
import StudyPlannerLoader from '../StudyPlannerLoader';

interface StudyPlannerProps {
    language: string;
}

const StudyPlanner: React.FC<StudyPlannerProps> = ({ language }) => {
    const [formData, setFormData] = useState({
        examName: '',
        subjects: '',
        examDate: '',
        studyHours: '',
    });
    const [studyPlan, setStudyPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.examName && formData.subjects && formData.examDate && formData.studyHours;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setError(null);
        setStudyPlan(null);

        const userPrompt = `
            Please create a study plan based on the following details:
            - Exam/Goal: ${formData.examName}
            - Subjects: ${formData.subjects}
            - Exam Date: ${formData.examDate}
            - Daily Study Hours: ${formData.studyHours}
        `;

        const finalSystemInstruction = `${STUDY_PLANNER_INSTRUCTION}\n\nIMPORTANT: You must generate the plan and all communication in the user's preferred language, which is: ${language}.`;

        try {
            const plan = await generateOneOffContent(finalSystemInstruction, userPrompt);
            setStudyPlan(plan);
        } catch (err) {
            console.error(err);
            setError("Sorry, I couldn't generate a plan. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStartOver = () => {
        setFormData({ examName: '', subjects: '', examDate: '', studyHours: '' });
        setStudyPlan(null);
        setError(null);
    };

    if (isLoading) {
        return <StudyPlannerLoader />;
    }

    if (studyPlan) {
        return (
            <div className="p-4 sm:p-8 bg-gray-100 dark:bg-gray-900 h-full overflow-y-auto">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Your Study Plan for {formData.examName}</h1>
                         <button
                            onClick={handleStartOver}
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            New Plan
                        </button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {studyPlan.split('**').map((part, index) =>
                            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
    // Form View
    return (
        <div className="flex items-center justify-center h-full p-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <i className="fas fa-calendar-days text-5xl text-blue-500 mb-4"></i>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Your Study Plan</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Fill in the details below, and I'll generate a personalized schedule to help you ace your exams.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="examName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam / Goal Name</label>
                        <input type="text" name="examName" id="examName" value={formData.examName} onChange={handleInputChange} placeholder="e.g., FSC Chemistry Finals" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjects</label>
                        <input type="text" name="subjects" id="subjects" value={formData.subjects} onChange={handleInputChange} placeholder="e.g., Physics, Maths, English" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate subjects with a comma.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Date</label>
                            <input type="date" name="examDate" id="examDate" value={formData.examDate} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gamma-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" min={new Date().toISOString().split('T')[0]}/>
                        </div>
                        <div>
                            <label htmlFor="studyHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Study Hours</label>
                            <input type="number" name="studyHours" id="studyHours" value={formData.studyHours} onChange={handleInputChange} placeholder="e.g., 4" min="1" max="16" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}

                    <button type="submit" disabled={!isFormValid || isLoading} className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-200">
                        {isLoading ? 'Generating...' : 'Generate My Plan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudyPlanner;