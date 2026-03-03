import { Resend } from "resend";
import { render } from "@react-email/components";
import WelcomeEmail from "@/components/email/WelcomeEmail";
import WeeklyDripEmail, { WeeklyDripEmailProps } from "@/components/email/WeeklyDripEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Raju @ ArchDesign.io <raju@archdesign.io>";

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  try {
    const html = await render(WelcomeEmail({ name }));
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Welcome to ArchDesign.io 🎉 — Your first videos arrive Monday",
      html,
    });
  } catch (err) {
    console.error("[resend] Failed to send welcome email to", to, err);
  }
}

export async function sendWeeklyDrip(
  to: string,
  props: WeeklyDripEmailProps
): Promise<void> {
  try {
    const html = await render(WeeklyDripEmail(props));
    const subject = `🏗️ Week ${props.weekNumber}: ${props.arch1.title} + ${props.arch2.title}`;
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("[resend] Failed to send weekly drip email to", to, err);
  }
}
