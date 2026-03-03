import { NextRequest, NextResponse } from 'next/server';

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

export async function GET(request: NextRequest) {
  // Verify CRON_SECRET to ensure only Vercel Cron (or authorised callers) can trigger this
  const authHeader = request.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

  if (!authHeader || authHeader !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const week = getISOWeekNumber(new Date());
  console.log(`[send-weekly-drip] Sending weekly drip emails for week #${week}...`);

  // TODO: Fetch all active subscribers from Supabase
  //   const { data: subscribers } = await supabase
  //     .from('subscribers')
  //     .select('*')
  //     .eq('status', 'active');

  // TODO: Determine the next 2 video URLs for this week based on `week` number
  //   e.g., look up a `videos` table ordered by publish_week, offset by subscriber.videos_sent_count

  // TODO: For each subscriber, send a personalised email via Resend
  //   await resend.emails.send({
  //     from: 'raju@archdesign.io',
  //     to: subscriber.email,
  //     subject: `🏗️ Week #${week}: Your 2 Architecture Videos Are Here`,
  //     html: renderEmailTemplate({ week, videos, unsubscribeToken }),
  //   });

  // TODO: Increment videos_sent_count for each subscriber in Supabase

  return NextResponse.json({
    success: true,
    message: 'Weekly drip sent',
    week,
  });
}
