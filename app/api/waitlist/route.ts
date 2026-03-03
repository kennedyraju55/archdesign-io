import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, plan } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      // Save to Supabase waitlist table
      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          plan: plan ?? 'monthly',
          signed_up_at: new Date().toISOString(),
        }),
      });
      // 409 = duplicate email (unique constraint) — still a success
      if (!res.ok && res.status !== 409) {
        console.error('[waitlist] Supabase error:', res.status, await res.text());
      }
    } else {
      // No DB yet — log the signup so it shows in Vercel logs
      console.log(`[waitlist] NEW SIGNUP: ${email.toLowerCase().trim()} | plan=${plan}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[waitlist] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
