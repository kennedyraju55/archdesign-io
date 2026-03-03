import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

async function addSubscriber(email: string, subscriptionId: string): Promise<void> {
  // TODO: Insert into Supabase subscribers table
  console.log(`[addSubscriber] TODO  email=${email} sub=${subscriptionId}`);
}

async function deactivateSubscriber(subscriptionId: string): Promise<void> {
  // TODO: Update Supabase subscribers set status=cancelled
  console.log(`[deactivateSubscriber] TODO  sub=${subscriptionId}`);
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion });
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email ?? session.customer_details?.email;
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      if (email && subId) await addSubscriber(email, subId);
      break;
    }
    case "customer.subscription.deleted": {
      await deactivateSubscriber((event.data.object as Stripe.Subscription).id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
