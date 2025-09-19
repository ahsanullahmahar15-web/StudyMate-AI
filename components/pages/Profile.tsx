
import React, { useState, useEffect } from 'react';
import ChatInterface from '../ChatInterface';
import { PROFILE_ASSISTANT_INSTRUCTION, PROFILE_ASSISTANT_WELCOME_MESSAGE } from '../../constants';
import { SubscriptionPlan } from '../../App';
import PaymentModal from '../PaymentModal';
import { verifyPayment } from '../../services/paymentService';
import api from '../../services/apiService';

interface ProfileData {
    name: string;
    email: string;
    classLevel: string;
    subjects: string;
}

interface StatusMessage {
    type: 'success' | 'error' | 'info';
    text: string;
}

interface ProfileProps {
    language: string;
    setLanguage: (language: string) => void;
    subscriptionPlan: SubscriptionPlan;
    setSubscriptionPlan: (plan: SubscriptionPlan) => void;
    setFocusMode: (isFocused: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ language, setLanguage, subscriptionPlan, setSubscriptionPlan, setFocusMode }) => {
    const [profile, setProfile] = useState<ProfileData>({
        name: 'Ali Khan',
        email: 'ali.khan@example.com',
        classLevel: 'FSC - 2nd Year',
        subjects: 'Physics, Chemistry, Maths',
    });
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastTransactionId, setLastTransactionId] = useState<string | null>(null);

    const languages = [
        'English', 'Urdu', 'Roman Urdu', 'Hindi', 'Arabic', 
        'Chinese', 'Spanish', 'French', 'German', 'Sindhi'
    ];

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => setStatusMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        if (newLang === 'Sindhi') {
            setStatusMessage({ type: 'success', text: '✅ توھانجي پسند جي ٻولي سنڌي مقرر ڪئي وئي آهي. هاڻي مان اوهانجي سوالن جا جواب سنڌي ۾ ڏيندس.' });
        } else {
            setStatusMessage({ type: 'success', text: `✅ Your preferred language has been set to ${newLang}.` });
        }
    };

    const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
        setTheme(selectedTheme);
    };

    const handleUpgradeClick = () => {
        setIsModalOpen(true);
    };
    
    const handleSelectPayment = async (method: string) => {
        setIsModalOpen(false);
        setIsProcessing(true);
        setStatusMessage({ type: 'info', text: `Creating secure ${method} session...` });

        try {
            // Step 1: Call the simulated backend to create a payment session/order.
            let session;
            const paymentDetails = { amount: 9.99, currency: 'USD' };
            
            switch (method) {
                case 'Stripe':
                    session = await api.stripe.createCheckoutSession(paymentDetails);
                    break;
                case 'PayPal':
                    session = await api.paypal.createOrder(paymentDetails);
                    break;
                case 'JazzCash':
                    session = await api.jazzcash.createTransaction(paymentDetails);
                    break;
                case 'Easypaisa':
                    session = await api.easypaisa.createTransaction(paymentDetails);
                    break;
                default:
                    throw new Error('Invalid payment method');
            }

            if (!session.checkoutUrl) throw new Error('Failed to create payment session.');
            
            setStatusMessage({ type: 'info', text: `Redirecting to ${method}...` });

            // Step 2: Simulate the user completing payment on the gateway page.
            await new Promise(resolve => setTimeout(resolve, 3000));
            const isGatewaySuccess = Math.random() > 0.1; // 90% chance user completes payment

            if (!isGatewaySuccess) {
                throw new Error(`Payment with ${method} was cancelled.`);
            }

            // Step 3: Simulate backend verification call (mimicking a webhook response)
            setStatusMessage({ type: 'info', text: `Verifying transaction...` });
            const verification = await verifyPayment({
                transactionId: session.transactionId,
                method: method,
            });

            if (verification.success) {
                setSubscriptionPlan('Premium');
                setLastTransactionId(session.transactionId);
                let successMessage = '✅ Payment successful! You are now Premium.';
                setStatusMessage({ type: 'success', text: successMessage });
            } else {
                throw new Error(`${method} payment verification failed.`);
            }
        } catch (error: any) {
            setStatusMessage({ type: 'error', text: `❌ ${error.message || 'An unexpected error occurred.'} Please try again.` });
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusColor = () => {
        if (!statusMessage) return '';
        switch (statusMessage.type) {
            case 'success': return 'bg-green-100 border-green-500 text-green-700';
            case 'error': return 'bg-red-100 border-red-500 text-red-700';
            case 'info': return 'bg-blue-100 border-blue-500 text-blue-700';
        }
    }

    const finalSystemInstruction = `${PROFILE_ASSISTANT_INSTRUCTION}\n\nIMPORTANT: The user's current subscription plan is: ${subscriptionPlan}. You must respond in the user's preferred language, which is: ${language}.`;

    return (
        <>
        <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectPayment={handleSelectPayment} />
        <div className="flex h-full bg-gray-100 dark:bg-gray-900">
            {/* Left Column: Profile Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto">
                <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Profile & Settings</h2>

                    {statusMessage && (
                        <div className={`border-l-4 p-4 rounded-lg mb-6 ${getStatusColor()}`} role="alert">
                            <p className="font-bold">{statusMessage.text}</p>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input type="text" name="name" id="name" value={profile.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input type="email" name="email" id="email" value={profile.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="classLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class / Level</label>
                            <input type="text" name="classLevel" id="classLevel" value={profile.classLevel} onChange={handleInputChange} placeholder="e.g., A-Levels, Matric" className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjects</label>
                            <input type="text" name="subjects" id="subjects" value={profile.subjects} onChange={handleInputChange} placeholder="e.g., Biology, Computer Science" className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Preferences</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                <select 
                                    id="language" 
                                    name="language" 
                                    value={language} 
                                    onChange={handleLanguageChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleThemeChange('light')} className={`px-4 py-2 rounded-md text-sm font-medium ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Light</button>
                                    <button onClick={() => handleThemeChange('dark')} className={`px-4 py-2 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Dark</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription */}
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Subscription</h3>
                        {subscriptionPlan === 'Free' ? (
                            <>
                                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">You are currently on the <span className="font-bold">Free Plan</span>.</p>
                                <button 
                                    onClick={handleUpgradeClick} 
                                    disabled={isProcessing}
                                    className="mt-3 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Processing...' : 'Upgrade to Premium'}
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-2">
                                 <i className="fas fa-star text-2xl text-yellow-400 mb-2"></i>
                                <p className="text-md font-semibold text-green-700 dark:text-green-400">You are on the <span className="font-bold">Premium Plan</span>.</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Enjoy unlimited access!</p>
                                {lastTransactionId && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 break-all">
                                        Last Transaction ID: {lastTransactionId}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                         <button className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Chat Assistant */}
            <div className="hidden lg:block w-1/2 border-l border-gray-200 dark:border-gray-700">
                <ChatInterface 
                    systemInstruction={finalSystemInstruction}
                    welcomeMessage={PROFILE_ASSISTANT_WELCOME_MESSAGE}
                    setFocusMode={setFocusMode}
                />
            </div>
        </div>
        </>
    );
};

export default Profile;
