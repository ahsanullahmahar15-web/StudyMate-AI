
import * as stripe from '../backend/stripe';
import * as paypal from '../backend/paypal';
import * as jazzcash from '../backend/jazzcash';
import * as easypaisa from '../backend/easypaisa';

/**
 * This service acts as the client-side interface to our simulated backend APIs.
 * In a real application, this would be making `fetch` calls to actual server endpoints.
 */
const api = {
    stripe,
    paypal,
    jazzcash,
    easypaisa,
};

export default api;
