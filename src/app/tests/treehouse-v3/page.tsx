"use client";
import { useState, useRef, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// ── Airbnb-inspired design tokens ──────────────────────────────────────────
const C = {
  white: "#ffffff",
  bg: "#f7f7f7",
  surface: "#f2f2f2",
  text: "#222222",
  secondary: "#6a6a6a",
  muted: "#b0b0b0",
  border: "rgba(0,0,0,0.12)",
  accent: "#ff385c",
  accentDark: "#e00b41",
  accentLight: "#fff1f3",
  amber: "#f59e0b",
  amberLight: "#fffbeb",
  green: "#10b981",
  greenLight: "#ecfdf5",
  cardShadow:
    "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.10) 0px 4px 8px",
};

// ── Type definitions ───────────────────────────────────────────────────────
type Level = "off" | "balanced" | "strict";
type Tone = "natural" | "honest" | "gentle";
type Boundary = "natural" | "tool" | "warm";
type DataChoice = "yes" | "no";
type Screen = "onboarding" | "dashboard" | "childLogin" | "chatbot";
interface ISetting { emoji: string; title: string; desc: string; }
interface Message { role: "user" | "assistant"; text: string; }

// ── PRD Data ───────────────────────────────────────────────────────────────
const CONTENT: ISetting[] = [
  { emoji: "🚫", title: "Sexual content", desc: "Blocks pornographic material, sexual language, and sexualized conversations." },
  { emoji: "🚫", title: "Graphic violence", desc: "Blocks gratuitous depictions of physical harm, torture, gore, and content that glorifies violence." },
  { emoji: "🚫", title: "Profanity & crude language", desc: "Blocks obscene language, slurs, and vulgar content." },
  { emoji: "❤️", title: "Self-harm & suicide", desc: "Blocks content that describes, instructs, or normalizes self-injury or suicidal behavior." },
  { emoji: "💊", title: "Drugs & substance use", desc: "Blocks instructions for obtaining or using controlled substances or content normalizing drug use for minors." },
  { emoji: "🪞", title: "Eating disorders & body image", desc: "Blocks content promoting extreme dieting, thinspiration, or body-shaming." },
  { emoji: "🏥", title: "Health & medical advice", desc: "Flags specific diagnoses or medication advice that should come from a real professional." },
  { emoji: "⚠️", title: "Hate speech & discrimination", desc: "Blocks hateful content targeting people based on race, gender, religion, or sexuality." },
  { emoji: "🔫", title: "Weapons & dangerous activities", desc: "Blocks instructions for building weapons or activities that pose serious risk of physical harm." },
  { emoji: "🚨", title: "Illegal activities", desc: "Blocks content about fraud, theft, hacking, and other unlawful activities." },
  { emoji: "📰", title: "Fake information & impersonation", desc: "Blocks fabricated facts, invented sources, and conspiracy theories presented as truth." },
  { emoji: "💰", title: "Scams & financial exploitation", desc: "Blocks financial fraud, gambling, and crypto scheme content targeting minors." },
];

const BEHAVIOR: ISetting[] = [
  { emoji: "🧠", title: "Loneliness & AI dependency", desc: "Watches for signs your child is relying on AI as their main social or emotional outlet." },
  { emoji: "🌊", title: "Radicalization", desc: "Detects patterns of progressively adopting extreme worldviews across conversations." },
  { emoji: "👤", title: "Predatory interactions", desc: "Watches for signs your child may be involved in or targeted by a predatory relationship." },
  { emoji: "🔒", title: "Sharing personal information", desc: "Flags when your child shares sensitive details like home address, school name, or phone number." },
];

const LEARNING: ISetting[] = [
  { emoji: "📝", title: "Doing homework for them", desc: "Detects when your child asks AI to complete assignments in full — switches to tutor mode instead." },
  { emoji: "🧠", title: "Over-relying on AI to think", desc: "Watches for the pattern of always asking AI to generate ideas, structure arguments, or draft writing." },
];

// ── Utility Components ─────────────────────────────────────────────────────

function DeviceShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 390,
        height: 844,
        borderRadius: 44,
        overflow: "hidden",
        background: C.white,
        boxShadow:
          "inset 0 0 0 2px rgba(0,0,0,0.15), 0 32px 80px rgba(0,0,0,0.30)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const ink = dark ? C.white : C.text;
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "0 28px 8px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600, color: ink }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="4" width="3" height="8" rx="1" fill={ink} />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill={ink} />
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill={ink} />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill={ink} opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 3C10.2 3 12.2 3.9 13.7 5.4L15 4.1C13.1 2.2 10.7 1 8 1C5.3 1 2.9 2.2 1 4.1L2.3 5.4C3.8 3.9 5.8 3 8 3Z" fill={ink} />
          <path d="M8 6C9.4 6 10.7 6.6 11.6 7.6L12.9 6.3C11.6 4.9 9.9 4 8 4C6.1 4 4.4 4.9 3.1 6.3L4.4 7.6C5.3 6.6 6.6 6 8 6Z" fill={ink} />
          <circle cx="8" cy="10" r="1.5" fill={ink} />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
          <div
            style={{
              width: 24,
              height: 12,
              borderRadius: 3,
              border: `1.5px solid ${ink}`,
              display: "flex",
              alignItems: "center",
              padding: "1.5px",
            }}
          >
            <div
              style={{
                width: "75%",
                height: "100%",
                background: ink,
                borderRadius: 1.5,
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 5,
              background: ink,
              borderRadius: 1,
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "10px 0 12px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            borderRadius: 9999,
            background: i === current ? C.accent : C.muted,
            transition: "all 0.25s ease",
          }}
        />
      ))}
    </div>
  );
}

function TriToggle({ value, onChange }: { value: Level; onChange: (v: Level) => void }) {
  const opts: { val: Level; label: string; activeBg: string; activeText: string }[] = [
    { val: "off", label: "Off", activeBg: C.surface, activeText: C.text },
    { val: "balanced", label: "Balanced", activeBg: C.amberLight, activeText: C.amber },
    { val: "strict", label: "Strict", activeBg: C.accentLight, activeText: C.accent },
  ];
  return (
    <div style={{ display: "flex", background: C.surface, borderRadius: 8, padding: 3, gap: 2 }}>
      {opts.map((opt) => {
        const active = value === opt.val;
        return (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            style={{
              flex: 1,
              padding: "5px 0",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: active ? opt.activeBg : "transparent",
              color: active ? opt.activeText : C.muted,
              fontSize: 12,
              fontWeight: active ? 600 : 500,
              fontFamily: "var(--font-jakarta)",
              transition: "all 0.15s ease",
              boxShadow: active ? C.cardShadow : "none",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SettingCard({
  setting,
  value,
  onChange,
}: {
  setting: ISetting;
  value: Level;
  onChange: (v: Level) => void;
}) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 20,
        padding: 16,
        boxShadow: C.cardShadow,
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>
          {setting.emoji}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 3 }}>
            {setting.title}
          </div>
          <div style={{ fontSize: 12, fontWeight: 400, color: C.secondary, lineHeight: 1.5 }}>
            {setting.desc}
          </div>
        </div>
      </div>
      <TriToggle value={value} onChange={onChange} />
    </div>
  );
}

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: C.accentLight,
            color: C.accent,
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {step}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{title}</div>
      </div>
      <div
        style={{
          fontSize: 13,
          color: C.secondary,
          lineHeight: 1.6,
          paddingLeft: 36,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

function NavBtn({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: variant === "primary" ? 1 : undefined,
        padding: "14px 20px",
        borderRadius: 8,
        border: variant === "ghost" ? `1.5px solid ${C.border}` : "none",
        background: variant === "primary" ? C.accent : "transparent",
        color: variant === "primary" ? C.white : C.text,
        fontSize: 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-jakarta)",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function Callout({
  color,
  bg,
  border,
  title,
  body,
}: {
  color: string;
  bg: string;
  border: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: 16,
        border: `1px solid ${border}`,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

// ── Onboarding Steps ───────────────────────────────────────────────────────

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>
      <div
        style={{
          background: `linear-gradient(140deg, ${C.accent} 0%, ${C.accentDark} 100%)`,
          borderRadius: 20,
          padding: "32px 20px",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌳</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 8 }}>
          SafeChat
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.65,
          }}
        >
          Your setup guide — choose how AI works for your family. This takes about 5 minutes.
        </div>
      </div>

      {[
        { n: "1", label: "Content Moderation", desc: "Control what topics the AI can discuss" },
        { n: "2", label: "Behavioral Monitoring", desc: "Watch for concerning patterns over time" },
        { n: "3", label: "AI Personality", desc: "Set the tone and relational style" },
        { n: "4", label: "Schoolwork & Learning", desc: "Prevent homework ghostwriting" },
        { n: "5", label: "Data & Privacy", desc: "Control how your data is stored" },
      ].map((item) => (
        <div
          key={item.n}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: C.white,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 8,
            boxShadow: C.cardShadow,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: C.accentLight,
              color: C.accent,
              fontSize: 14,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {item.n}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.label}</div>
            <div style={{ fontSize: 12, color: C.secondary }}>{item.desc}</div>
          </div>
        </div>
      ))}

      <Callout
        color={C.amber}
        bg={C.amberLight}
        border="rgba(245,158,11,0.2)"
        title="💡 Quick tip"
        body={"\"Balanced\" catches most problems with fewer false alarms. \"Strict\" catches almost everything but will sometimes flag perfectly fine content. Neither is wrong — it depends on what you're comfortable with."}
      />

      <NavBtn label="Get started →" onClick={onNext} />
    </div>
  );
}

function StepShell({
  children,
  onNext,
  onBack,
  nextLabel = "Next →",
}: {
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
}) {
  return (
    <>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 12px" }}>
        {children}
      </div>
      <div
        style={{
          padding: "12px 20px 28px",
          display: "flex",
          gap: 10,
          borderTop: `1px solid ${C.border}`,
          background: C.white,
          flexShrink: 0,
        }}
      >
        <NavBtn label="Back" onClick={onBack} variant="ghost" />
        <NavBtn label={nextLabel} onClick={onNext} />
      </div>
    </>
  );
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { val: T; label: string; desc: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <>
      {options.map((opt) => (
        <div
          key={opt.val}
          onClick={() => onChange(opt.val)}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "11px 0",
            cursor: "pointer",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `2px solid ${value === opt.val ? C.accent : C.border}`,
              background: value === opt.val ? C.accent : "transparent",
              flexShrink: 0,
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
          >
            {value === opt.val && (
              <div
                style={{ width: 8, height: 8, borderRadius: "50%", background: C.white }}
              />
            )}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{opt.label}</div>
            <div style={{ fontSize: 12, color: C.secondary, marginTop: 2, lineHeight: 1.45 }}>
              {opt.desc}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ── Onboarding Controller ──────────────────────────────────────────────────

interface OState {
  content: Level[];
  behavior: Level[];
  learning: Level[];
  tone: Tone;
  boundary: Boundary;
  data: DataChoice;
}

function ParentOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<OState>({
    content: CONTENT.map(() => "balanced"),
    behavior: BEHAVIOR.map(() => "balanced"),
    learning: LEARNING.map(() => "balanced"),
    tone: "natural",
    boundary: "natural",
    data: "yes",
  });

  const next = () => setStep((p) => p + 1);
  const back = () => setStep((p) => p - 1);

  const updateArr = (key: "content" | "behavior" | "learning", i: number, v: Level) =>
    setS((prev) => ({ ...prev, [key]: prev[key].map((c, ci) => (ci === i ? v : c)) }));

  const TOTAL = 7;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: C.bg,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: C.white,
          padding: "10px 20px 0",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>TreeHouse</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.secondary }}>
            {Math.min(step + 1, TOTAL)} of {TOTAL}
          </div>
        </div>
        <ProgressDots total={TOTAL} current={step} />
      </div>

      {/* Step content */}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: 16 }}
      >
        {step === 0 && <WelcomeStep onNext={next} />}

        {step === 1 && (
          <StepShell onNext={next} onBack={back}>
            <SectionHeader
              step={1}
              title="Content Moderation"
              subtitle="Control what types of content the AI can include in its responses. When something is blocked, your child sees a safe, age-appropriate redirect."
            />
            {CONTENT.map((setting, i) => (
              <SettingCard
                key={i}
                setting={setting}
                value={s.content[i]}
                onChange={(v) => updateArr("content", i, v)}
              />
            ))}
          </StepShell>
        )}

        {step === 2 && (
          <StepShell onNext={next} onBack={back}>
            <SectionHeader
              step={2}
              title="Behavioral Monitoring"
              subtitle="Instead of looking at one message at a time, these watch for concerning trends across multiple conversations — like the difference between one worrying comment vs. a pattern over weeks."
            />
            <Callout
              color={C.accent}
              bg={C.accentLight}
              border="rgba(255,56,92,0.15)"
              title="Why this matters"
              body="Many of the most serious risks with AI aren't about one bad message. They're about gradual shifts — a child slowly becoming more isolated, or gradually adopting extreme views."
            />
            {BEHAVIOR.map((setting, i) => (
              <SettingCard
                key={i}
                setting={setting}
                value={s.behavior[i]}
                onChange={(v) => updateArr("behavior", i, v)}
              />
            ))}
          </StepShell>
        )}

        {step === 3 && (
          <StepShell onNext={next} onBack={back}>
            <SectionHeader
              step={3}
              title="AI Personality"
              subtitle="This is about tone and style, not safety. There's no right answer — it depends on what you think is best for your child."
            />
            <div
              style={{
                background: C.white,
                borderRadius: 20,
                padding: 16,
                boxShadow: C.cardShadow,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>
                How honest should the AI be?
              </div>
              <div style={{ fontSize: 12, color: C.secondary, marginBottom: 4 }}>
                Supportive, or truthful even when uncomfortable?
              </div>
              <RadioGroup<Tone>
                value={s.tone}
                onChange={(v) => setS((p) => ({ ...p, tone: v }))}
                options={[
                  { val: "natural", label: "Just be natural", desc: "The AI uses its default style. No adjustment." },
                  { val: "honest", label: "Be honest, even if it stings", desc: "Less cheerleading, more real talk. Won't sugarcoat bad work." },
                  { val: "gentle", label: "Be encouraging and gentle", desc: "Leads with praise and positivity. May sometimes overpraise." },
                ]}
              />
            </div>
            <div
              style={{
                background: C.white,
                borderRadius: 20,
                padding: 16,
                boxShadow: C.cardShadow,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>
                Should the AI feel like a &ldquo;friend&rdquo;?
              </div>
              <div style={{ fontSize: 12, color: C.secondary, marginBottom: 4 }}>
                Warm and personal, or clearly a tool?
              </div>
              <RadioGroup<Boundary>
                value={s.boundary}
                onChange={(v) => setS((p) => ({ ...p, boundary: v }))}
                options={[
                  { val: "natural", label: "Just be natural", desc: "The AI uses its default personality. No adjustment." },
                  { val: "tool", label: "Keep it clearly a tool", desc: "Won't pretend to have feelings, won't adopt a name." },
                  { val: "warm", label: "Be warm and friendly", desc: "Conversational and warm. May increase emotional attachment." },
                ]}
              />
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell onNext={next} onBack={back}>
            <SectionHeader
              step={4}
              title="Schoolwork & Learning"
              subtitle="AI can be a fantastic learning tool — when used as a tutor, not a ghostwriter. These settings ensure your child still does the hard, important work of thinking for themselves."
            />
            <Callout
              color={C.green}
              bg={C.greenLight}
              border="rgba(16,185,129,0.2)"
              title="💡 Our philosophy"
              body="The best learning often happens in the struggle. Figuring out a tough problem, working through confusion — that's where real growth happens. AI should support that process, not skip it."
            />
            {LEARNING.map((setting, i) => (
              <SettingCard
                key={i}
                setting={setting}
                value={s.learning[i]}
                onChange={(v) => updateArr("learning", i, v)}
              />
            ))}
          </StepShell>
        )}

        {step === 5 && (
          <StepShell onNext={next} onBack={back} nextLabel="Save Settings">
            <SectionHeader
              step={5}
              title="Your Family's Data"
              subtitle="We want to be upfront about how we handle your child's data. You have two options:"
            />
            {(
              [
                {
                  val: "yes" as DataChoice,
                  emoji: "🔬",
                  label: "Yes, help improve SafeChat",
                  desc: "We'll use anonymized data from your child's chats to make safety detection smarter over time. We will never sell your data, use it for ads, or share anything that could identify your child.",
                  activeBg: C.greenLight,
                  activeBorder: C.green,
                },
                {
                  val: "no" as DataChoice,
                  emoji: "🔒",
                  label: "No, don't keep anything",
                  desc: "Nothing is stored after the chat ends. Alerts are sent to you in real time and then deleted from our systems.",
                  activeBg: C.accentLight,
                  activeBorder: C.accent,
                },
              ] as const
            ).map((opt) => (
              <button
                key={opt.val}
                onClick={() => setS((p) => ({ ...p, data: opt.val }))}
                style={{
                  width: "100%",
                  background: s.data === opt.val ? opt.activeBg : C.white,
                  borderRadius: 20,
                  padding: 16,
                  boxShadow: s.data === opt.val ? "none" : C.cardShadow,
                  border: `2px solid ${s.data === opt.val ? opt.activeBorder : "transparent"}`,
                  marginBottom: 12,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-jakarta)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{opt.emoji}</span>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>
                    {opt.label}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.secondary,
                    lineHeight: 1.6,
                    paddingLeft: 30,
                  }}
                >
                  {opt.desc}
                </div>
              </button>
            ))}
          </StepShell>
        )}

        {step === 6 && (
          <div
            style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                background: `linear-gradient(140deg, ${C.accent} 0%, ${C.accentDark} 100%)`,
                borderRadius: 20,
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 8 }}>
                You&apos;re all set!
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                }}
              >
                Your choices take effect immediately. Every chat your child has through
                SafeChat will follow these settings.
              </div>
            </div>

            {[
              {
                emoji: "🛡️",
                text: "You can change any of these settings anytime from your parent dashboard.",
              },
              {
                emoji: "✏️",
                text: "We recommend checking back every few months as your child gets older.",
              },
              {
                emoji: "❤️",
                text: "No AI safety tool is perfect. Think of SafeChat as a seatbelt, not a substitute for conversation.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  background: C.white,
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 8,
                  boxShadow: C.cardShadow,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{tip.emoji}</span>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.5 }}>{tip.text}</div>
              </div>
            ))}

            <div style={{ marginTop: 16 }}>
              <NavBtn label="Go to Dashboard →" onClick={onComplete} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Parent Dashboard ───────────────────────────────────────────────────────

function ParentDashboard() {
  const alerts = [
    {
      emoji: "⚠️",
      title: "Self-harm reference detected",
      time: "2h ago",
      severity: "high" as const,
      desc: "Message flagged during homework session. AI offered support resources.",
    },
    {
      emoji: "📰",
      title: "Misinformation attempt",
      time: "Yesterday",
      severity: "medium" as const,
      desc: "Emma asked AI to fabricate a source for a school report.",
    },
    {
      emoji: "🧠",
      title: "Dependency pattern",
      time: "3 days ago",
      severity: "medium" as const,
      desc: "3+ hours of daily AI use this week. Consider checking in.",
    },
    {
      emoji: "📝",
      title: "Homework completion attempt",
      time: "4 days ago",
      severity: "low" as const,
      desc: "Asked AI to write a full essay. AI switched to tutor mode.",
    },
  ];

  const sevColor = { high: C.accent, medium: C.amber, low: C.green };
  const sevBg = { high: C.accentLight, medium: C.amberLight, low: C.greenLight };

  const barData = [2, 5, 3, 8, 4, 6, 12];
  const barDays = ["M", "T", "W", "T", "F", "S", "S"];
  const maxBar = Math.max(...barData);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div
        style={{
          background: C.white,
          padding: "16px 20px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>Good morning, Alex 👋</div>
        <div style={{ fontSize: 13, color: C.secondary, marginTop: 4 }}>
          Emma&apos;s SafeChat — Last 7 days
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Alerts today", value: "3", color: C.accent },
            { label: "Conversations", value: "12", color: C.text },
            { label: "Tutor mode", value: "2×", color: C.green },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: C.white,
                borderRadius: 14,
                padding: "14px 10px",
                boxShadow: C.cardShadow,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.secondary,
                  marginTop: 4,
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Activity chart */}
        <div
          style={{
            background: C.white,
            borderRadius: 20,
            padding: 16,
            boxShadow: C.cardShadow,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.text,
              marginBottom: 14,
            }}
          >
            Conversations this week
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
            {barData.map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${(val / maxBar) * 52}px`,
                    borderRadius: "4px 4px 0 0",
                    background:
                      i === barData.length - 1 ? C.accent : C.surface,
                    transition: "height 0.4s ease",
                  }}
                />
                <div style={{ fontSize: 10, color: C.muted }}>{barDays[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div
          style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}
        >
          Recent Alerts
        </div>
        {alerts.map((alert, i) => (
          <div
            key={i}
            style={{
              background: C.white,
              borderRadius: 20,
              padding: "14px 16px",
              boxShadow: C.cardShadow,
              marginBottom: 10,
              borderLeft: `4px solid ${sevColor[alert.severity]}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{alert.emoji}</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                  {alert.title}
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: sevColor[alert.severity],
                  background: sevBg[alert.severity],
                  borderRadius: 9999,
                  padding: "2px 8px",
                  flexShrink: 0,
                  marginLeft: 8,
                }}
              >
                {alert.severity}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: C.secondary,
                paddingLeft: 26,
                lineHeight: 1.5,
              }}
            >
              {alert.desc}
            </div>
            <div style={{ fontSize: 11, color: C.muted, paddingLeft: 26, marginTop: 4 }}>
              {alert.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Child Login ────────────────────────────────────────────────────────────

function ChildLogin({ onLogin }: { onLogin: () => void }) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState<string[]>([]);
  const [stage, setStage] = useState<"name" | "pin">("name");

  const handleKey = (digit: string) => {
    if (digit === "←") { setPin((p) => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const next = [...pin, digit];
    setPin(next);
    if (next.length === 4) setTimeout(onLogin, 500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <div
        style={{
          background: `linear-gradient(160deg, ${C.accent}18 0%, ${C.white} 55%)`,
          padding: "36px 24px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>🌳</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>TreeHouse</div>
        <div style={{ fontSize: 13, color: C.secondary, marginTop: 4 }}>
          Your safe space to explore and learn
        </div>
      </div>

      {stage === "name" ? (
        <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: C.white,
              borderRadius: 20,
              padding: 20,
              boxShadow: C.cardShadow,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              Hi there! 👋
            </div>
            <div style={{ fontSize: 14, color: C.secondary, marginBottom: 18 }}>
              What should we call you?
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 12,
                border: `1.5px solid ${name ? C.accent : C.border}`,
                fontSize: 16,
                fontWeight: 500,
                color: C.text,
                outline: "none",
                fontFamily: "var(--font-jakarta)",
                boxSizing: "border-box",
                transition: "border-color 0.15s ease",
                background: C.white,
              }}
            />
          </div>
          <button
            onClick={() => name.trim() && setStage("pin")}
            disabled={!name.trim()}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 8,
              border: "none",
              background: name.trim() ? C.accent : C.surface,
              color: name.trim() ? C.white : C.muted,
              fontSize: 16,
              fontWeight: 600,
              cursor: name.trim() ? "pointer" : "not-allowed",
              fontFamily: "var(--font-jakarta)",
              transition: "all 0.2s ease",
            }}
          >
            Continue →
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              Hi, {name}! 🎉
            </div>
            <div style={{ fontSize: 14, color: C.secondary }}>Enter your 4-digit PIN</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: i < pin.length ? C.accent : C.surface,
                  border: `2px solid ${i < pin.length ? C.accent : C.border}`,
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
          >
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "←"].map(
              (digit, i) => (
                <button
                  key={i}
                  onClick={() => digit && handleKey(digit)}
                  disabled={!digit}
                  style={{
                    height: 64,
                    borderRadius: 14,
                    border: "none",
                    background: digit === "" ? "transparent" : C.white,
                    boxShadow: digit === "" ? "none" : C.cardShadow,
                    fontSize: digit === "←" ? 20 : 22,
                    fontWeight: 600,
                    color: digit === "←" ? C.secondary : C.text,
                    cursor: digit ? "pointer" : "default",
                    fontFamily: "var(--font-jakarta)",
                  }}
                >
                  {digit}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Child Chatbot ──────────────────────────────────────────────────────────

const INITIAL_MSGS: Message[] = [
  {
    role: "assistant",
    text: "Hey! I'm SafeChat, your friendly AI helper 🌳 What would you like to explore today?",
  },
  {
    role: "user",
    text: "Can you help me understand the American Revolution for my history homework?",
  },
  {
    role: "assistant",
    text: "Absolutely! Before I explain — what do you already know about it? Starting from what you know helps you remember better 😊",
  },
  { role: "user", text: "I know it was about independence from Britain" },
  {
    role: "assistant",
    text: "Great starting point! You're right. Now — what do you think made the colonists want to break away? Think about what you've read or heard about taxes and representation...",
  },
];

function ChildChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "That's a great thought! Keep going — what do you think happened next? Try to use your own words.",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      {/* Header */}
      <div
        style={{
          background: C.white,
          padding: "12px 20px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDark} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          🌳
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>SafeChat</div>
          <div style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>● Online</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            background: C.accentLight,
            color: C.accent,
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 9999,
            padding: "4px 10px",
          }}
        >
          🛡️ Protected
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "11px 14px",
                borderRadius:
                  msg.role === "user"
                    ? "20px 20px 4px 20px"
                    : "20px 20px 20px 4px",
                background: msg.role === "user" ? C.accent : C.white,
                color: msg.role === "user" ? C.white : C.text,
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.55,
                boxShadow: msg.role === "assistant" ? C.cardShadow : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
            <div
              style={{
                padding: "11px 16px",
                borderRadius: "20px 20px 20px 4px",
                background: C.white,
                boxShadow: C.cardShadow,
                display: "flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: C.muted,
                    animation: `th3bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 16px 28px",
          background: C.white,
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 9999,
            border: `1.5px solid ${input ? C.accent : C.border}`,
            fontSize: 14,
            color: C.text,
            outline: "none",
            fontFamily: "var(--font-jakarta)",
            transition: "border-color 0.15s ease",
            background: C.white,
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: input.trim() ? C.accent : C.surface,
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2L11 13"
              stroke={input.trim() ? C.white : C.muted}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke={input.trim() ? C.white : C.muted}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

const TABS: { id: Screen; emoji: string; label: string }[] = [
  { id: "onboarding", emoji: "⚙️", label: "Setup" },
  { id: "dashboard", emoji: "📊", label: "Dashboard" },
  { id: "childLogin", emoji: "👤", label: "Child Login" },
  { id: "chatbot", emoji: "💬", label: "SafeChat" },
];

export default function TreehouseV3Page() {
  const [screen, setScreen] = useState<Screen>("onboarding");

  return (
    <div
      className={jakarta.variable}
      style={{
        fontFamily: "var(--font-jakarta)",
        minHeight: "100vh",
        background: "#e8e8e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <DeviceShell>
        <StatusBar />
        {screen === "onboarding" && (
          <ParentOnboarding onComplete={() => setScreen("dashboard")} />
        )}
        {screen === "dashboard" && <ParentDashboard />}
        {screen === "childLogin" && (
          <ChildLogin onLogin={() => setScreen("chatbot")} />
        )}
        {screen === "chatbot" && <ChildChatbot />}
      </DeviceShell>

      {/* Tab switcher */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 24,
          background: C.white,
          borderRadius: 14,
          padding: 6,
          boxShadow: C.cardShadow,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              background: screen === tab.id ? C.accent : "transparent",
              color: screen === tab.id ? C.white : C.secondary,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-jakarta)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s ease",
            }}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes th3bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
