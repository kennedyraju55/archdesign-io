import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  console.log(`[unsubscribe] Unsubscribe attempt with token=${token}`);

  // TODO: Verify JWT token — decode and validate expiry & signature
  // TODO: Look up subscriber by token payload (e.g., email or subscriber id)
  // TODO: Cancel Stripe subscription via stripe.subscriptions.cancel(subscriptionId)
  // TODO: Mark subscriber as inactive in Supabase
  //   await supabase.from('subscribers').update({ status: 'cancelled' }).eq('email', email);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — ArchDesign.io</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0f1e;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: #111827;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 460px;
      text-align: center;
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { font-size: 1.75rem; margin: 0 0 12px; }
    p { color: #94a3b8; line-height: 1.6; margin: 0 0 28px; }
    a {
      display: inline-block;
      background: #6366f1;
      color: #fff;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    a:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">👋</div>
    <h1>You have been unsubscribed.</h1>
    <p>Sorry to see you go! Your subscription has been cancelled and you won't receive any more emails from ArchDesign.io.</p>
    <a href="https://archdesign.io">Return to ArchDesign.io</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
