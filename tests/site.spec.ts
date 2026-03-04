import { test, expect } from "@playwright/test";

const BASE = "https://archdesign-io.vercel.app";

test("home page loads", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await expect(page).toHaveTitle(/ArchDesign/i);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("architectures list page has 30 cards", async ({ page }) => {
  await page.goto(`${BASE}/architectures`, { waitUntil: "networkidle" });
  const cards = page.locator("a[href*='/architecture/']");
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(30);
});

test("Netflix page: SVG renders with nodes", async ({ page }) => {
  await page.goto(`${BASE}/architecture/netflix-content-delivery`, { waitUntil: "networkidle" });
  await page.waitForSelector("svg", { timeout: 15000 });
  const nodes = await page.locator("svg .node").count();
  expect(nodes).toBeGreaterThan(5);
});

test("Twitter page: SVG renders with nodes", async ({ page }) => {
  await page.goto(`${BASE}/architecture/twitter-fanout-timeline`, { waitUntil: "networkidle" });
  await page.waitForSelector("svg", { timeout: 15000 });
  const nodes = await page.locator("svg .node").count();
  expect(nodes).toBeGreaterThan(5);
});

test("RAG pipeline page: no html entities in body text", async ({ page }) => {
  await page.goto(`${BASE}/architecture/rag-pipeline-architecture`, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("&amp;");
  expect(bodyText).not.toContain("&lt;");
});

test("GPT inference page: SVG renders", async ({ page }) => {
  await page.goto(`${BASE}/architecture/gpt-inference-architecture`, { waitUntil: "networkidle" });
  await page.waitForSelector("svg", { timeout: 15000 });
  const count = await page.locator("svg").count();
  expect(count).toBeGreaterThan(0);
});

test("Kafka page: content visible", async ({ page }) => {
  await page.goto(`${BASE}/architecture/apache-kafka-architecture`, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toContain("Kafka");
});

test("subscribe page loads with pricing text", async ({ page }) => {
  await page.goto(`${BASE}/subscribe`, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  expect(bodyText.toLowerCase()).toMatch(/subscribe|plan|month/);
});

test("no Mermaid parse errors on multi-agent page", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", msg => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto(`${BASE}/architecture/multi-agent-llm-orchestration`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  const mermaidErrors = errors.filter(e =>
    e.toLowerCase().includes("mermaid") || e.toLowerCase().includes("parse error")
  );
  expect(mermaidErrors).toHaveLength(0);
});

test("LinkedIn page: content and feature store text visible", async ({ page }) => {
  await page.goto(`${BASE}/architecture/linkedin-feed-ranking`, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toContain("Feature");
});

test("Uber page: SVG renders", async ({ page }) => {
  await page.goto(`${BASE}/architecture/uber-geospatial-architecture`, { waitUntil: "networkidle" });
  await page.waitForSelector("svg", { timeout: 15000 });
  const nodes = await page.locator("svg .node").count();
  expect(nodes).toBeGreaterThan(5);
});

test("LLM serving page: SVG renders", async ({ page }) => {
  await page.goto(`${BASE}/architecture/llm-serving-infrastructure`, { waitUntil: "networkidle" });
  await page.waitForSelector("svg", { timeout: 15000 });
  const nodes = await page.locator("svg .node").count();
  expect(nodes).toBeGreaterThan(5);
});