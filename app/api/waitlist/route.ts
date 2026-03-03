import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Create table if it doesn't exist yet
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Insert — ignore duplicates silently
    await sql`
      INSERT INTO waitlist (email) VALUES (${email.toLowerCase().trim()})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
