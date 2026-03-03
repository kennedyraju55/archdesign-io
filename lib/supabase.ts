import { createClient } from '@supabase/supabase-js';

export type Subscriber = {
  id: string;
  email: string;
  stripe_subscription_id: string;
  status: 'active' | 'cancelled';
  subscribed_at: string;
  videos_sent_count: number;
};

if (!process.env.SUPABASE_URL) {
  console.warn('[supabase] SUPABASE_URL is not set. Database features will not work.');
}
if (!process.env.SUPABASE_ANON_KEY) {
  console.warn('[supabase] SUPABASE_ANON_KEY is not set. Database features will not work.');
}

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
