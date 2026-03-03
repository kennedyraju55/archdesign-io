import Stripe from 'stripe';

// Lazy singleton — avoids crashing at build time when env var isn't set
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    _stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion });
  }
  return _stripe;
}

export default getStripe;

