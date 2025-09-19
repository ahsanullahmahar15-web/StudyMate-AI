
interface PaymentDetails {
    amount: number;
    currency: string; // Will be ignored for JazzCash, assuming PKR
}

interface JazzCashTransactionResponse {
    billReference: string;
    checkoutUrl: string;
    transactionId: string;
}

/**
 * Simulates a call to a backend endpoint `/api/payment/jazzcash`.
 * This would prepare transaction data and generate an integrity hash using the Integrity Salt.
 * @param details - The payment details.
 * @returns A promise that resolves with the transaction details.
 */
export const createTransaction = async (details: PaymentDetails): Promise<JazzCashTransactionResponse> => {
    console.log('[Backend Simulation] Creating JazzCash transaction with:', details);
    console.log('[Backend Simulation] Using JAZZCASH_MERCHANT_ID and JAZZCASH_SALT from environment variables...');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const transactionId = `txn_jazzcash_${Date.now()}`;
    
    console.log('[Backend Simulation] JazzCash transaction request created.');

    return {
        billReference: `ref_${Date.now()}`,
        checkoutUrl: 'https://sandbox.jazzcash.com.pk/CustomerPortal/Transaction/simulated-page',
        transactionId: transactionId,
    };
};
