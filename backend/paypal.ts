
interface PaymentDetails {
    amount: number;
    currency: string;
}

interface PayPalOrderResponse {
    orderId: string;
    checkoutUrl: string;
    transactionId: string;
}

/**
 * Simulates a call to a backend endpoint `/api/payment/paypal`.
 * This would use the PayPal Orders API to create a payment order.
 * @param details - The payment details.
 * @returns A promise that resolves with the order details.
 */
export const createOrder = async (details: PaymentDetails): Promise<PayPalOrderResponse> => {
    console.log('[Backend Simulation] Creating PayPal order with:', details);
    console.log('[Backend Simulation] Using PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET from environment variables...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const transactionId = `txn_paypal_${Date.now()}`;
    
    console.log('[Backend Simulation] PayPal order created successfully.');

    return {
        orderId: `PAYID-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
        checkoutUrl: `https://www.paypal.com/checkoutnow?token=simulated-token`,
        transactionId: transactionId,
    };
};
