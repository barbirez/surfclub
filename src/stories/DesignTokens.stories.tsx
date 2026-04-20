import type { Meta, StoryObj } from "@storybook/react";
import { tokens } from "../../design-system/tokens";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <h2 style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: tokens.colors.mutedForeground,
        marginBottom: "1.25rem",
        paddingBottom: "0.5rem",
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Color Swatches ──────────────────────────────────────────────────────────

const COLOR_GROUPS = [
  {
    label: "Brand",
    items: [
      { name: "Primary", token: "primary", hex: tokens.colors.primary, usage: "CTAs, links, focus rings" },
      { name: "Primary Foreground", token: "primaryForeground", hex: tokens.colors.primaryForeground, usage: "Text on primary bg" },
      { name: "Accent", token: "accent", hex: tokens.colors.accent, usage: "Highlights, upsell badges" },
      { name: "Accent Foreground", token: "accentForeground", hex: tokens.colors.accentForeground, usage: "Text on accent bg" },
    ],
  },
  {
    label: "Background",
    items: [
      { name: "Background", token: "background", hex: tokens.colors.background, usage: "Page background" },
      { name: "Card", token: "card", hex: tokens.colors.card, usage: "Card surfaces" },
      { name: "Secondary", token: "secondary", hex: tokens.colors.secondary, usage: "Board image bg, inputs" },
      { name: "Muted", token: "muted", hex: tokens.colors.muted, usage: "Subtle surfaces" },
      { name: "Popover", token: "popover", hex: tokens.colors.popover, usage: "Dropdowns, tooltips" },
    ],
  },
  {
    label: "Foreground / Text",
    items: [
      { name: "Foreground", token: "foreground", hex: tokens.colors.foreground, usage: "Primary text" },
      { name: "Card Foreground", token: "cardForeground", hex: tokens.colors.cardForeground, usage: "Text on cards" },
      { name: "Secondary Foreground", token: "secondaryForeground", hex: tokens.colors.secondaryForeground, usage: "Secondary text" },
      { name: "Muted Foreground", token: "mutedForeground", hex: tokens.colors.mutedForeground, usage: "Placeholders, meta info" },
    ],
  },
  {
    label: "Semantic",
    items: [
      { name: "Destructive", token: "destructive", hex: tokens.colors.destructive, usage: "Errors, delete actions" },
      { name: "Destructive Foreground", token: "destructiveForeground", hex: tokens.colors.destructiveForeground, usage: "Text on error bg" },
      { name: "Border", token: "border", hex: tokens.colors.border, usage: "Dividers, card borders" },
      { name: "Input", token: "input", hex: tokens.colors.input, usage: "Form field backgrounds" },
      { name: "Ring", token: "ring", hex: tokens.colors.ring, usage: "Focus outline" },
    ],
  },
  {
    label: "Sidebar",
    items: [
      { name: "Sidebar Background", token: "sidebar.background", hex: tokens.sidebar.background, usage: "Nav sidebar bg" },
      { name: "Sidebar Primary", token: "sidebar.primary", hex: tokens.sidebar.primary, usage: "Active nav item" },
      { name: "Sidebar Accent", token: "sidebar.accent", hex: tokens.sidebar.accent, usage: "Hover state" },
      { name: "Sidebar Border", token: "sidebar.border", hex: tokens.sidebar.border, usage: "Sidebar dividers" },
    ],
  },
];

function isLight(hex: string) {
  const c = hex.replace("#", "").replace(/[^0-9a-f]/gi, "0");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function ColorSwatch({ name, token, hex, usage }: { name: string; token: string; hex: string; usage: string }) {
  const textColor = isLight(hex.replace(/[^#0-9a-f]/gi, "f").padEnd(7, "f")) ? "#1A1D29" : "#F0F2FF";
  return (
    <div style={{
      borderRadius: tokens.radius.lg,
      overflow: "hidden",
      border: `1px solid ${tokens.colors.border}`,
      width: 160,
      flexShrink: 0,
    }}>
      <div style={{
        height: 80,
        background: hex,
        display: "flex",
        alignItems: "flex-end",
        padding: "8px 10px",
      }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: textColor, fontFamily: "monospace", opacity: 0.85 }}>
          {hex}
        </span>
      </div>
      <div style={{ padding: "10px 12px", background: tokens.colors.card }}>
        <p style={{ margin: 0, fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 600, color: tokens.colors.foreground }}>
          {name}
        </p>
        <p style={{ margin: "2px 0 0", fontFamily: "monospace", fontSize: "0.65rem", color: tokens.colors.primary }}>
          --{token.replace(/\./g, "-")}
        </p>
        <p style={{ margin: "4px 0 0", fontFamily: "system-ui", fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>
          {usage}
        </p>
      </div>
    </div>
  );
}

// ─── Typography ──────────────────────────────────────────────────────────────

const TYPOGRAPHY_SAMPLES = [
  { scale: "4xl", size: tokens.typography["4xl"], label: "Display — Headline da landing page", weight: 700 },
  { scale: "3xl", size: tokens.typography["3xl"], label: "H1 — Título de seção", weight: 700 },
  { scale: "2xl", size: tokens.typography["2xl"], label: "H2 — Nome da prancha no detalhe", weight: 600 },
  { scale: "xl",  size: tokens.typography["xl"],  label: "H3 — Subtítulo de card", weight: 600 },
  { scale: "lg",  size: tokens.typography["lg"],  label: "Body large — Descrição principal", weight: 400 },
  { scale: "base",size: tokens.typography["base"], label: "Body — Texto corrido padrão", weight: 400 },
  { scale: "sm",  size: tokens.typography["sm"],  label: "Small — Meta info, labels", weight: 400 },
  { scale: "xs",  size: tokens.typography["xs"],  label: "XSmall — Badges, timestamps", weight: 500 },
];

// ─── Radius ──────────────────────────────────────────────────────────────────

const RADIUS_SAMPLES = [
  { scale: "sm",  value: tokens.radius.sm,  usage: "Badges, small chips" },
  { scale: "md",  value: tokens.radius.md,  usage: "Inputs, buttons" },
  { scale: "lg",  value: tokens.radius.lg,  usage: "Cards, dropdowns" },
  { scale: "xl",  value: tokens.radius.xl,  usage: "Modals, board image containers" },
];

// ─── Spacing ─────────────────────────────────────────────────────────────────

const SPACING_SAMPLES = [
  { scale: "xs",  value: tokens.spacing.xs,  px: "8px" },
  { scale: "sm",  value: tokens.spacing.sm,  px: "12px" },
  { scale: "md",  value: tokens.spacing.md,  px: "16px" },
  { scale: "lg",  value: tokens.spacing.lg,  px: "24px" },
  { scale: "xl",  value: tokens.spacing.xl,  px: "32px" },
  { scale: "2xl", value: tokens.spacing["2xl"], px: "48px" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function DesignTokensPage() {
  return (
    <div style={{
      padding: "2.5rem",
      background: tokens.colors.background,
      minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: tokens.colors.foreground,
    }}>

      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div style={{
            width: 32, height: 32, borderRadius: tokens.radius.md,
            background: tokens.colors.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem",
          }}>
            🌊
          </div>
          <span style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.01em" }}>WavyClub</span>
        </div>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: tokens.typography["3xl"], fontWeight: 800, letterSpacing: "-0.02em" }}>
          Design Tokens
        </h1>
        <p style={{ margin: 0, color: tokens.colors.mutedForeground, fontSize: tokens.typography.sm }}>
          Single source of truth — <code style={{ color: tokens.colors.primary }}>design-system/tokens.ts</code>
        </p>
      </div>

      {/* Colors */}
      <Section title="Colors">
        {COLOR_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: "2rem" }}>
            <p style={{
              margin: "0 0 0.75rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: tokens.colors.secondaryForeground,
            }}>
              {group.label}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {group.items.map((item) => (
                <ColorSwatch key={item.token} {...item} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Typography */}
      <Section title="Typography — Geist Sans">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {TYPOGRAPHY_SAMPLES.map(({ scale, size, label, weight }) => (
            <div key={scale} style={{
              display: "flex",
              alignItems: "baseline",
              gap: "2rem",
              padding: "0.75rem 0",
              borderBottom: `1px solid ${tokens.colors.border}`,
            }}>
              <div style={{ width: 48, flexShrink: 0 }}>
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: tokens.colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  {scale}
                </span>
              </div>
              <div style={{ width: 56, flexShrink: 0 }}>
                <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: tokens.colors.mutedForeground }}>
                  {size}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: size, fontWeight: weight, lineHeight: 1.2 }}>
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", borderRadius: tokens.radius.lg, background: tokens.colors.card, border: `1px solid ${tokens.colors.border}` }}>
          <p style={{ margin: "0 0 0.25rem", fontSize: tokens.typography.xs, color: tokens.colors.mutedForeground, fontFamily: "monospace" }}>Font family</p>
          <p style={{ margin: 0, fontSize: tokens.typography.base, fontWeight: 500 }}>Geist Sans — <span style={{ color: tokens.colors.mutedForeground, fontWeight: 400 }}>var(--font-geist-sans), system-ui, sans-serif</span></p>
        </div>
      </Section>

      {/* Radius */}
      <Section title="Border Radius">
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {RADIUS_SAMPLES.map(({ scale, value, usage }) => (
            <div key={scale} style={{ textAlign: "center", width: 130 }}>
              <div style={{
                width: 96,
                height: 96,
                margin: "0 auto 0.75rem",
                background: `${tokens.colors.primary}18`,
                border: `2px solid ${tokens.colors.primary}`,
                borderRadius: value,
              }} />
              <p style={{ margin: "0 0 0.15rem", fontWeight: 700, fontSize: "0.8rem" }}>
                radius-{scale}
              </p>
              <p style={{ margin: "0 0 0.15rem", fontFamily: "monospace", fontSize: "0.65rem", color: tokens.colors.primary }}>
                {value}
              </p>
              <p style={{ margin: 0, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>
                {usage}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {SPACING_SAMPLES.map(({ scale, value, px }) => (
            <div key={scale} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <span style={{ width: 32, fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, color: tokens.colors.primary }}>{scale}</span>
              <span style={{ width: 48, fontFamily: "monospace", fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>{value}</span>
              <span style={{ width: 36, fontFamily: "monospace", fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>{px}</span>
              <div style={{
                height: 12,
                width: `calc(${value} * 3)`,
                background: tokens.colors.primary,
                borderRadius: tokens.radius.sm,
                opacity: 0.7,
              }} />
            </div>
          ))}
        </div>
      </Section>

      {/* Usage examples */}
      <Section title="Component Usage Examples">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Primary button */}
          <div style={{ textAlign: "center" }}>
            <button style={{
              background: tokens.colors.primary,
              color: tokens.colors.primaryForeground,
              border: "none",
              borderRadius: tokens.radius.md,
              padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
              fontSize: tokens.typography.sm,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Quero essa prancha
            </button>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Primary CTA</p>
          </div>

          {/* Accent button */}
          <div style={{ textAlign: "center" }}>
            <button style={{
              background: tokens.colors.accent,
              color: tokens.colors.accentForeground,
              border: "none",
              borderRadius: tokens.radius.md,
              padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
              fontSize: tokens.typography.sm,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Ver planos
            </button>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Accent / Upsell</p>
          </div>

          {/* Outline button */}
          <div style={{ textAlign: "center" }}>
            <button style={{
              background: "transparent",
              color: tokens.colors.foreground,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
              fontSize: tokens.typography.sm,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Voltar
            </button>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Outline</p>
          </div>

          {/* Badge */}
          <div style={{ textAlign: "center" }}>
            <span style={{
              background: `${tokens.colors.primary}18`,
              color: tokens.colors.primary,
              border: `1px solid ${tokens.colors.primary}33`,
              borderRadius: tokens.radius.sm,
              padding: "3px 10px",
              fontSize: tokens.typography.xs,
              fontWeight: 600,
              fontFamily: "inherit",
            }}>
              Shortboard
            </span>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Badge</p>
          </div>

          {/* Input */}
          <div style={{ textAlign: "center" }}>
            <input
              type="text"
              placeholder="Email"
              readOnly
              style={{
                background: tokens.colors.input,
                color: tokens.colors.foreground,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.radius.md,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                fontSize: tokens.typography.sm,
                fontFamily: "inherit",
                outline: "none",
                width: 200,
              }}
            />
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Input</p>
          </div>

          {/* Card */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              background: tokens.colors.card,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.lg,
              padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
              textAlign: "left",
              width: 200,
            }}>
              <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: tokens.typography.sm }}>Hypto Krypto</p>
              <p style={{ margin: 0, fontSize: tokens.typography.xs, color: tokens.colors.mutedForeground }}>Haydenshapes · 5'10"</p>
            </div>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Card</p>
          </div>

          {/* Condition pill */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              background: `${tokens.colors.primary}0D`,
              border: `1px solid ${tokens.colors.primary}33`,
              borderRadius: tokens.radius.xl,
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              width: 220,
            }}>
              <p style={{ margin: "0 0 2px", fontSize: tokens.typography.xs, fontWeight: 700, color: tokens.colors.primary }}>Para qual mar?</p>
              <p style={{ margin: 0, fontSize: tokens.typography.xs, color: tokens.colors.mutedForeground }}>Ondas de 0,5 a 1,5m · Todos os níveis</p>
            </div>
            <p style={{ marginTop: 8, fontSize: "0.65rem", color: tokens.colors.mutedForeground }}>Condition card</p>
          </div>

        </div>
      </Section>

    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta = {
  title: "Design System/Tokens",
  component: DesignTokensPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
} satisfies Meta<typeof DesignTokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
