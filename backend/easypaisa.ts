
interface PaymentDetails {
    amount: number;
    currency: string; // Will be ignored for Easypaisa, assuming PKR
}

interface EasypaisaTransactionResponse {
    orderId: string;
    checkoutUrl: string;
    transactionId: string;
}

/**
 * Simulates a call to a backend endpoint `/api/payment/easypaisa`.
 * This would prepare transaction data and make a request to the Easypaisa API.
 * @param details - The payment details.
 * @returns A promise that resolves with the transaction details.
 */
export const createTransaction = async (details: PaymentDetails): Promise<EasypaisaTransactionResponse> => {
    console.log('[Backend Simulation] Creating Easypaisa transaction with:', details);
    console.log('[Backend Simulation] Using EASYPAISA_STORE_ID and EASYPAISA_HASH_KEY from environment variables...');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 900));

    const transactionId = `txn_easypaisa_${Date.now()}`;

    console.log('[Backend Simulation] Easypaisa transaction request created.');

    return {
        orderId: `order_${Date.now()}`,
        checkoutUrl: 'https://sandbox.easypaisa.com.pk/simulated-checkout',
        transactionId: transactionId,
    };
};
