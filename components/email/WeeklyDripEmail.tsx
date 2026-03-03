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

export interface WeeklyDripEmailProps {
  weekNumber: number;
  arch1: {
    title: string;
    subtitle: string;
    videoUrl: string;
    articleUrl: string;
    category: string;
  };
  arch2: {
    title: string;
    subtitle: string;
    videoUrl: string;
    articleUrl: string;
    category: string;
  };
  nextArch1Title: string;
  nextArch2Title: string;
  unsubscribeUrl: string;
}

const TOTAL_WEEKS = 15;

function buildProgressBar(current: number, total: number): string {
  const filled = Math.round((current / total) * 10);
  const empty = 10 - filled;
  return `${"█".repeat(filled)}${"░".repeat(empty)}`;
}

export default function WeeklyDripEmail({
  weekNumber,
  arch1,
  arch2,
  nextArch1Title,
  nextArch2Title,
  unsubscribeUrl,
}: WeeklyDripEmailProps) {
  const progressBar = buildProgressBar(weekNumber, TOTAL_WEEKS);
  const progressPct = Math.round((weekNumber / TOTAL_WEEKS) * 100);

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        This week: {arch1.title} and {arch2.title} — 2 new architecture deep-dives
      </Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={headerLeft}>
                <Text style={logoText}>ArchDesign.io</Text>
              </Column>
              <Column style={headerRight}>
                <Text style={weekBadge}>Week {weekNumber} of {TOTAL_WEEKS}</Text>
              </Column>
            </Row>
          </Section>

          {/* Progress bar */}
          <Section style={progressSection}>
            <Text style={progressLabel}>
              Your progress: Week {weekNumber}/{TOTAL_WEEKS} · {progressPct}% complete
            </Text>
            <Text style={progressBarText}>{progressBar}</Text>
            <Text style={progressSubLabel}>
              {(weekNumber - 1) * 2} architectures covered · {(TOTAL_WEEKS - weekNumber) * 2} to go
            </Text>
          </Section>

          <Section style={mainSection}>
            <Text style={sectionHeading}>This Week's Architectures</Text>
            <Text style={sectionSubheading}>
              Two new deep-dives from a practicing Microsoft engineer — with video walkthroughs
              and written breakdowns.
            </Text>

            {/* Architecture 1 */}
            <ArchCard
              number={1}
              arch={arch1}
              weekNumber={weekNumber}
            />

            {/* Architecture 2 */}
            <ArchCard
              number={2}
              arch={arch2}
              weekNumber={weekNumber}
            />

            <Hr style={divider} />

            {/* Sneak peek */}
            <Section style={sneakPeekSection}>
              <Text style={sneakPeekLabel}>👀 SNEAK PEEK: NEXT WEEK</Text>
              <Text style={sneakPeekText}>
                Coming up in Week {weekNumber + 1}:
              </Text>
              <Row>
                <Column style={sneakCol}>
                  <Text style={sneakItem}>📐 {nextArch1Title}</Text>
                </Column>
                <Column style={sneakCol}>
                  <Text style={sneakItem}>📐 {nextArch2Title}</Text>
                </Column>
              </Row>
            </Section>

          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerWeek}>
              Week {weekNumber} of {TOTAL_WEEKS} · ArchDesign.io
            </Text>
            <Text style={footerText}>
              You're receiving this because you subscribed to weekly architecture deep-dives.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={footerLink}>Unsubscribe</Link>
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

// ─── Sub-component ────────────────────────────────────────────────────────────

interface ArchCardProps {
  number: 1 | 2;
  arch: WeeklyDripEmailProps["arch1"];
  weekNumber: number;
}

function ArchCard({ number, arch, weekNumber }: ArchCardProps) {
  return (
    <Section style={archCard}>
      <Row style={{ marginBottom: "10px" }}>
        <Column>
          <Text style={archNumber}>Video {number} of 2</Text>
        </Column>
        <Column style={{ textAlign: "right" }}>
          <Text style={categoryBadge}>{arch.category}</Text>
        </Column>
      </Row>
      <Text style={archTitle}>{arch.title}</Text>
      <Text style={archSubtitle}>{arch.subtitle}</Text>
      <Row style={{ marginTop: "16px" }}>
        <Column style={{ paddingRight: "8px" }}>
          <Button style={videoButton} href={arch.videoUrl}>
            ▶ Watch Video Walkthrough
          </Button>
        </Column>
        <Column>
          <Link href={arch.articleUrl} style={articleLink}>
            📖 Read Article
          </Link>
        </Column>
      </Row>
    </Section>
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
  padding: "20px 40px",
};

const headerLeft: React.CSSProperties = {
  verticalAlign: "middle",
};

const headerRight: React.CSSProperties = {
  verticalAlign: "middle",
  textAlign: "right",
};

const logoText: React.CSSProperties = {
  color: "#2563eb",
  fontSize: "22px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  margin: 0,
};

const weekBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#334155",
  color: "#94a3b8",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 10px",
  borderRadius: "20px",
  margin: 0,
};

const progressSection: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  padding: "14px 40px",
  textAlign: "center",
};

const progressLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#475569",
  margin: "0 0 4px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const progressBarText: React.CSSProperties = {
  fontSize: "18px",
  color: "#2563eb",
  letterSpacing: "2px",
  margin: "0 0 4px",
  fontFamily: "monospace",
};

const progressSubLabel: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: 0,
};

const mainSection: React.CSSProperties = {
  padding: "32px 40px",
};

const sectionHeading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 8px",
};

const sectionSubheading: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "1.5",
  margin: "0 0 28px",
};

const archCard: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "20px 24px",
  marginBottom: "16px",
};

const archNumber: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: 0,
};

const categoryBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#dbeafe",
  color: "#1d4ed8",
  fontSize: "11px",
  fontWeight: "700",
  padding: "3px 8px",
  borderRadius: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: 0,
};

const archTitle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  margin: "0 0 6px",
  lineHeight: "1.3",
};

const archSubtitle: React.CSSProperties = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.55",
  margin: 0,
};

const videoButton: React.CSSProperties = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  display: "inline-block",
};

const articleLink: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#2563eb",
  textDecoration: "underline",
  lineHeight: "40px",
};

const divider: React.CSSProperties = {
  borderColor: "#e2e8f0",
  margin: "28px 0",
};

const sneakPeekSection: React.CSSProperties = {
  backgroundColor: "#1e293b",
  borderRadius: "8px",
  padding: "20px 24px",
};

const sneakPeekLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#60a5fa",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 8px",
};

const sneakPeekText: React.CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "0 0 12px",
};

const sneakCol: React.CSSProperties = {
  width: "50%",
  verticalAlign: "top",
};

const sneakItem: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#e2e8f0",
  margin: 0,
  lineHeight: "1.5",
};

const footer: React.CSSProperties = {
  backgroundColor: "#1e293b",
  padding: "20px 40px",
  textAlign: "center",
  borderTop: "1px solid #334155",
};

const footerWeek: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#60a5fa",
  margin: "0 0 8px",
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
