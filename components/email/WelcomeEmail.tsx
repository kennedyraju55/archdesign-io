import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Button,
  Link,
  Hr,
  Preview,
} from "@react-email/components";

export interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>You're in! 2 architecture videos land in your inbox every Monday.</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>ArchDesign.io</Text>
          </Section>

          {/* Welcome Headline */}
          <Section style={mainSection}>
            <Text style={headline}>Welcome to ArchDesign.io, {name}! 🎉</Text>
            <Text style={intro}>
              You've joined <strong>2,400+ CS students</strong> learning real-world system design
              from a Microsoft engineer. Every Monday, 2 deep-dive architecture videos land in your
              inbox — no fluff, just the real distributed systems knowledge you need.
            </Text>

            <Hr style={divider} />

            {/* What happens next */}
            <Text style={sectionHeading}>What happens next</Text>

            <Row style={stepRow}>
              <Column style={stepBadge}><Text style={stepNumber}>1</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>Videos arrive every Monday</Text>
                <Text style={stepDesc}>
                  Two unlisted YouTube walkthroughs land in your inbox each week — yours exclusively
                  as a subscriber.
                </Text>
              </Column>
            </Row>

            <Row style={stepRow}>
              <Column style={stepBadge}><Text style={stepNumber}>2</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>15 weeks of structured content</Text>
                <Text style={stepDesc}>
                  We cover 30 architectures across databases, streaming, search, cloud infra, and
                  modern AI/LLM systems — in a logical learning order.
                </Text>
              </Column>
            </Row>

            <Row style={stepRow}>
              <Column style={stepBadge}><Text style={stepNumber}>3</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>Browse the full library anytime</Text>
                <Text style={stepDesc}>
                  All 30 written articles are available now at archdesign.io/architectures. Videos
                  unlock weekly in your inbox.
                </Text>
              </Column>
            </Row>

            <Hr style={divider} />

            {/* Week 1 Preview */}
            <Text style={sectionHeading}>Your first week's content</Text>
            <Text style={bodyText}>
              Your first email arrives <strong>this Monday</strong>. Here's a sneak peek at Week 1:
            </Text>

            <Section style={previewCard}>
              <Row>
                <Column style={previewBadgeCol}>
                  <Text style={previewBadge}>Week 1 · Video 1</Text>
                </Column>
              </Row>
              <Text style={previewTitle}>Netflix CDN & Content Delivery</Text>
              <Text style={previewDesc}>
                How Netflix streams 15% of global internet traffic using Open Connect, adaptive
                bitrate streaming, and edge caching — without breaking the bank.
              </Text>
            </Section>

            <Section style={previewCard}>
              <Row>
                <Column style={previewBadgeCol}>
                  <Text style={previewBadge}>Week 1 · Video 2</Text>
                </Column>
              </Row>
              <Text style={previewTitle}>Twitter Fan-Out & Timeline Architecture</Text>
              <Text style={previewDesc}>
                The hybrid push/pull model that powers Twitter's timeline — why a simple fan-out
                breaks at scale and how Twitter solves it for 200M daily users.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button style={ctaButton} href="https://archdesign.io/architectures">
                Browse All 30 Architectures →
              </Button>
            </Section>

            <Hr style={divider} />

            {/* About Raju */}
            <Section style={authorSection}>
              <Text style={authorLabel}>YOUR INSTRUCTOR</Text>
              <Text style={authorName}>Raju Guthikonda</Text>
              <Text style={authorBio}>
                Software Engineer @ Microsoft · 10+ years designing scalable distributed systems ·
                MS CS, GPA 3.79. I built ArchDesign.io to share the real-world architecture
                knowledge I use every day — at a price students can actually afford.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this because you subscribed at{" "}
              <Link href="https://archdesign.io" style={footerLink}>archdesign.io</Link>.
            </Text>
            <Text style={footerText}>
              <Link href="https://archdesign.io/unsubscribe" style={footerLink}>Unsubscribe</Link>
              {" · "}
              <Link href="https://archdesign.io" style={footerLink}>ArchDesign.io</Link>
              {" · Austin, TX"}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#f4f6f9",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#1e293b",
  padding: "24px 40px",
  textAlign: "center",
};

const logoText: React.CSSProperties = {
  color: "#2563eb",
  fontSize: "26px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  margin: 0,
};

const mainSection: React.CSSProperties = {
  padding: "36px 40px",
};

const headline: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 16px",
  lineHeight: "1.3",
};

const intro: React.CSSProperties = {
  fontSize: "16px",
  color: "#334155",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const divider: React.CSSProperties = {
  borderColor: "#e2e8f0",
  margin: "28px 0",
};

const sectionHeading: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#2563eb",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 20px",
};

const stepRow: React.CSSProperties = {
  marginBottom: "16px",
};

const stepBadge: React.CSSProperties = {
  width: "36px",
  verticalAlign: "top",
  paddingTop: "2px",
};

const stepNumber: React.CSSProperties = {
  width: "28px",
  height: "28px",
  lineHeight: "28px",
  textAlign: "center",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  borderRadius: "50%",
  fontSize: "13px",
  fontWeight: "700",
  margin: 0,
  display: "inline-block",
};

const stepContent: React.CSSProperties = {
  verticalAlign: "top",
  paddingLeft: "12px",
};

const stepTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#0f172a",
  margin: "0 0 4px",
};

const stepDesc: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "1.5",
  margin: 0,
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  color: "#334155",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const previewCard: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderLeft: "4px solid #2563eb",
  borderRadius: "6px",
  padding: "16px 20px",
  marginBottom: "12px",
};

const previewBadgeCol: React.CSSProperties = {
  paddingBottom: "8px",
};

const previewBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#dbeafe",
  color: "#1d4ed8",
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "3px 8px",
  borderRadius: "4px",
  margin: 0,
};

const previewTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 6px",
};

const previewDesc: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.55",
  margin: 0,
};

const ctaSection: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0 0",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "8px",
  display: "inline-block",
};

const authorSection: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "20px 24px",
};

const authorLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 6px",
};

const authorName: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 8px",
};

const authorBio: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.55",
  margin: 0,
};

const footer: React.CSSProperties = {
  backgroundColor: "#1e293b",
  padding: "20px 40px",
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "4px 0",
  lineHeight: "1.5",
};

const footerLink: React.CSSProperties = {
  color: "#60a5fa",
  textDecoration: "underline",
};
