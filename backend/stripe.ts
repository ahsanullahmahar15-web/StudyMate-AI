
interface PaymentDetails {
    amount: number;
    currency: string;
}

interface StripeSessionResponse {
    sessionId: string;
    checkoutUrl: string;
    transactionId: string;
}

/**
 * Simulates a call to a backend endpoint `/api/payment/stripe`.
 * This would typically use the Stripe Node.js SDK to create a real Checkout Session.
 * @param details - The payment details.
 * @returns A promise that resolves with the session details.
 */
export const createCheckoutSession = async (details: PaymentDetails): Promise<StripeSessionResponse> => {
    console.log('[Backend Simulation] Creating Stripe Checkout Session with:', details);
    console.log('[Backend Simulation] Using STRIPE_SECRET_KEY from environment variables...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const transactionId = `txn_stripe_${Date.now()}`;
    
    console.log('[Backend Simulation] Stripe session created successfully.');
    
    return {
        sessionId: `cs_test_${btoa(Math.random().toString()).substring(0, 24)}`,
        checkoutUrl: `https://checkout.stripe.com/pay/simulated-session`,
        transactionId: transactionId,
    };
};
