import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const PLANS: Record<string, { unit_amount: number; interval: 'month' | 'year'; label: string }> = {
  monthly: { unit_amount: 500, interval: 'month', label: 'ArchDesign.io — Monthly ($5/mo)' },
  annual: { unit_amount: 3900, interval: 'year', label: 'ArchDesign.io — Annual ($39/yr)' },
};

export async function GET(request: NextRequest) {
  return handleCheckout(request);
}

export async function POST(request: NextRequest) {
  return handleCheckout(request);
}

async function handleCheckout(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion });

  try {
    const { searchParams } = new URL(request.url);
    const plan = searchParams.get('plan') ?? 'monthly';
    const customerEmail = searchParams.get('email') ?? undefined;

    const planConfig = PLANS[plan];
    if (!planConfig) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: planConfig.unit_amount,
          recurring: { interval: planConfig.interval },
          product_data: {
            name: planConfig.label,
            description: '2 system design architecture videos every Monday',
          },
        },
        quantity: 1,
      }],
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/subscribe`,
      subscription_data: { metadata: { plan } },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
