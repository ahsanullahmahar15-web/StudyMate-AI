import React from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPayment: (method: string) => void;
}

const paymentOptions = [
    { name: 'Stripe', icon: 'fab fa-stripe', label: 'Credit/Debit Card' },
    { name: 'PayPal', icon: 'fab fa-paypal', label: 'PayPal Account' },
    { name: 'JazzCash', icon: 'fas fa-mobile-alt', label: 'JazzCash (Pakistan)' },
    { name: 'Easypaisa', icon: 'fas fa-money-bill-wave', label: 'Easypaisa (Pakistan)' },
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSelectPayment }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Choose Payment Method</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Close modal"
                    >
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div className="space-y-4">
                    {paymentOptions.map((option) => (
                        <button
                            key={option.name}
                            onClick={() => onSelectPayment(option.name)}
                            className="w-full flex items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <i className={`${option.icon} text-2xl w-8 text-center mr-4 text-blue-500`}></i>
                            <div>
                                <p className="font-semibold text-left text-gray-800 dark:text-white">{option.name}</p>
                                <p className="text-sm text-left text-gray-500 dark:text-gray-400">{option.label}</p>
                            </div>
                            <i className="fas fa-chevron-right text-gray-400 ml-auto"></i>
                        </button>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PaymentModal;
