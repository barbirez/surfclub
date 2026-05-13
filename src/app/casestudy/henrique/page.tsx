import type { Metadata } from "next";
import { RevealOnView } from "@/components/case-study/RevealOnView";
import { StageHeader } from "@/components/case-study/StageHeader";

export const metadata: Metadata = {
  title: "Henrique Schreiber — A case study by Barbara Rezende",
  description:
    "Experiment №03 in building real products with AI in the loop. A portfolio for a furniture designer whose work is sold by other people.",
  openGraph: {
    title: "Henrique Schreiber — Experiments in building with AI — №03",
    description:
      "A portfolio for a furniture designer whose work is sold by other people.",
    type: "article",
  },
};

const CORNERS = [
  {
    num: "01",
    title: "Copy curation.",
    body: 'Claude drafted every piece description. I curated, cut, and pushed back. The line between "AI wrote this" and "I wrote this" stopped being meaningful.',
  },
  {
    num: "02",
    title: "Bilingual architecture.",
    body: 'PT and EN content models, designed together. The translation question moved from "how do we translate?" to "how do we structure for two native voices from the start?"',
  },
  {
    num: "03",
    title: "Motion produced, not captured.",
    body: "The chair animation was made through AI image and video manipulation. No studio, no camera. The skill became curation — knowing which frame was right.",
  },
  {
    num: "04",
    title: "CMS schemas as conversation.",
    body: "Sanity schemas drafted by Claude, refined by me. The collaboration shaped how Henrique would think about his own catalog.",
  },
  {
    num: "05",
    title: "Code as continuous co-write.",
    body: "Claude Code in the loop on every commit. Not autocomplete. Pair-programming with a tireless partner who never holds opinions hostage.",
  },
  {
    num: "06",
    title: "The decisions AI can't help with.",
    body: "Listening to a client. Cutting a section you love. Knowing what's wrong before you can name it. AI accelerated everything specifiable. The unspecifiable still took the time it always did.",
  },
];

const REJECTED = [
  {
    num: "01",
    title: "No e-commerce.",
    body: "Even where it was technically trivial. Adding a cart would have made the site about transaction. The work isn't transactional. The brand isn't transactional. The transaction lives in the stores.",
  },
  {
    num: "02",
    title: "No creative-portfolio tropes.",
    body: "Oversized type as personality, motion as decoration, dark mode as mood. The site couldn't perform craft — it had to be it.",
  },
  {
    num: "03",
    title: "No product as product.",
    body: "Treated the furniture as work, not as inventory. That distinction shows up everywhere: page titles, spec layout, photograph sizing, button copy.",
  },
];

const LOOP_STAGES = [
  { id: "01", name: "LISTEN", question: "who is this for, and how do they actually buy?" },
  { id: "02", name: "LANGUAGE", question: "what does the work demand visually?" },
  { id: "03", name: "SYSTEM", question: "how does this scale, edit, translate?" },
  { id: "04", name: "DETAIL", question: "what closes the gap between good and considered?" },
];

const DETAILS = [
  {
    num: "01",
    title: "The animation, made with AI.",
    body: "The scroll-driven sequence wasn't shot with a camera in a studio. The base photograph was manipulated, the video frames composed through an AI-assisted workflow, and the final result is a curated frame-by-frame composition that looks like a high-budget product shoot. The decision to use AI wasn't about cost — it was about achieving polish that would have been expensive and time-consuming to produce traditionally for an independent designer's site. The hard part wasn't the generation. It was the curation, the iteration, knowing when the frame was right.",
  },
  {
    num: "02",
    title: "The grid that reveals on viewport entry.",
    body: "A small thing. The works index grid fades in as you reach it, with a brief delay between items. It changes the feeling of arrival — the page doesn't dump itself on you, it composes itself as you arrive.",
  },
  {
    num: "03",
    title: "Maps tuned for thumbs.",
    body: "The default Google Maps embed is hostile on mobile — small tap targets, awkward zoom, intrusive UI. The map on this site is taller, friendlier, less aggressive. The kind of small UX work that nobody notices but everybody feels.",
  },
  {
    num: "04",
    title: "The form's success message, rewritten.",
    body: '"Your message has been sent" became something that sounds like the rest of the site. A small thing. The kind of thing that, when everyone else\'s site says the same generic line, becomes a signal.',
  },
];

const NEXT = [
  {
    num: "01",
    title: "Long-form piece pages",
    body: "Dedicated stories for select pieces, with deeper origin and process documentation.",
  },
  {
    num: "02",
    title: "A studio journal",
    body: "Occasional notes from the workshop. Slow rhythm. High quality.",
  },
  {
    num: "03",
    title: "In-situ library",
    body: "Growing over time as architects share installation photography.",
  },
];

export default function HenriqueCaseStudyPage() {
  return (
    <main>
      <HeroSection />
      <HeroVideoPlaceholder />
      <HenriqueMarquee />
      <WhyThisProject />
      <CornersGrid />
      <TheClient />
      <ClientImagePlaceholder />
      <TheRealProblem />
      <PullQuoteB />
      <ComparisonImages />
      <DecidedNotToDo />
      <LoopRestated />
      <Stage01 />
      <Stage02 />
      <Stage03 />
      <Stage04 />
      <SectionICut />
      <WhatItTaughtMe />
      <PullQuoteC />
      <IfThisKeepsGoing />
      <HenriqueFooter />
    </main>
  );
}

/* ---------- 1. Hero ---------- */

function HeroSection() {
  return (
    <section className="relative">
      <div
        className="mx-auto max-w-7xl px-6 pt-10 flex items-center justify-between text-xs tracking-[0.18em] uppercase"
        style={{ color: "var(--cs-ink-muted)" }}
      >
        <span>Barbara Rezende — Case Study</span>
        <span>Experiments in building with AI &nbsp;·&nbsp; №03</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <p
          className="text-xs tracking-[0.22em] uppercase mb-8"
          style={{ color: "var(--cs-accent)" }}
        >
          ✦ &nbsp;Henrique Schreiber
        </p>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight cs-rise">
          A portfolio for someone <br />
          whose work is sold{" "}
          <em className="italic font-serif" style={{ color: "var(--cs-ink-soft)" }}>
            by other people.
          </em>
        </h1>
        <p
          className="mt-10 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--cs-ink-soft)" }}
        >
          Experiment №03 in working with AI in the loop — pushing into the corners where it&apos;s least obvious it belongs. Typography, code, motion, copy, content architecture, taste itself.
        </p>

        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-y-3 text-sm"
          style={{ color: "var(--cs-ink-soft)" }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem label="Duration" value="Apr 24 – May 12, 2026" sub="~3 weeks" />
            <MetaItem label="Team" value="1 designer-engineer" sub="+ client" />
            <MetaItem label="Method" value="Client project" sub="AI-native build" />
            <MetaItem label="Stack" value="Next.js · Sanity" sub="i18n · Vercel" />
          </div>
          <a
            href="https://henriqueschreiber.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-[0.12em] uppercase font-medium transition-colors"
            style={{ borderColor: "var(--cs-accent)", color: "var(--cs-ink)", background: "transparent" }}
          >
            View Live →
          </a>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--cs-ink-muted)" }}>
        {label}
      </span>
      <span className="font-medium">{value}</span>
      {sub && (
        <span className="text-xs mt-0.5" style={{ color: "var(--cs-ink-muted)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

/* ---------- 2. Hero video placeholder ---------- */

function HeroVideoPlaceholder() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24">
      <MediaPlaceholder
        aspect="16 / 9"
        path="/casestudy/henrique-hero.mp4"
        note="Home page scrolling smoothly, ~10s loop"
      />
      <p className="mt-5 text-xs tracking-wider uppercase text-center" style={{ color: "var(--cs-ink-muted)" }}>
        From shaping document to bilingual editorial site in three weeks — with Claude in the loop the whole way.
      </p>
    </div>
  );
}

/* ---------- 3. Marquee ---------- */

function HenriqueMarquee() {
  const items = ["LISTEN", "LANGUAGE", "SYSTEM", "DETAIL", "SHIP"];
  const repeated = Array.from({ length: 6 }, () => items).flat();
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: "var(--cs-rule)" }}>
      <div
        className="cs-marquee py-4 text-sm tracking-[0.2em] uppercase"
        style={{ color: "var(--cs-ink-soft)" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span aria-hidden>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- 4. Why this project ---------- */

function WhyThisProject() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;Why this project
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            A real client. A real deadline. A real bilingual site.
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            Wavyclub was №02 — a two-day experiment with a fixed reference and a sandbox brief. This one is №03, and the rules are different: a real client, a real deadline, a real audience that will judge the work.
          </RevealOnView>
          <p>
            The experiment was simple to state and hard to execute: build a complete client project end-to-end with AI in the loop on every decision — typography, code, copy, motion, content architecture, CMS — and see where AI accelerated, where it slowed me down, and where it had no place at all.
          </p>
          <p>
            With a sandbox you test the obvious uses of AI: scaffolding, drafts, code generation. With a real client, real deadline, real audience, you start pushing into the corners — the places where it&apos;s not obvious AI should be involved at all. Copy curation. Content architecture in two languages. Motion produced through manipulation, not capture. Decisions about restraint.
          </p>
          <p>This case study is the record of what I found in those corners.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. The corners I tested ---------- */

function CornersGrid() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The corners I tested
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            Where the experiment actually lived.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORNERS.map((c) => (
            <div
              key={c.num}
              className="p-10 border rounded-2xl"
              style={{
                borderColor: "var(--cs-rule)",
                background: "#FFFFFF",
                borderLeftWidth: 3,
                borderLeftColor: "var(--cs-accent)",
              }}
            >
              <div className="font-mono text-xs mb-6" style={{ color: "var(--cs-accent)" }}>
                /{c.num}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-5" style={{ color: "var(--cs-ink)" }}>
                {c.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. The client ---------- */

function TheClient() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The client
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            Furniture is patient. Most websites aren&apos;t.{" "}
            <em className="italic font-serif" style={{ color: "var(--cs-ink-soft)" }}>
              This one had to behave like the work it shows.
            </em>
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            Henrique Schreiber is a Brazilian furniture designer, the son and grandson of woodworkers. His pieces are produced by partner manufacturers in southern Brazil and distributed through curated retail stores. He doesn&apos;t sell directly. He doesn&apos;t want to.
          </RevealOnView>
          <p>
            His value is in his name, his lineage, his award-winning work. The site had to carry that — and quietly route visitors to the stores that sell it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Hero image placeholder ---------- */

function ClientImagePlaceholder() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <MediaPlaceholder
        aspect="16 / 9"
        path="/casestudy/henrique-portrait-or-home-hero.jpg"
      />
    </div>
  );
}

/* ---------- 8. The real problem ---------- */

function TheRealProblem() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The real problem
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            A portfolio that builds desire, and a directory that closes the loop —{" "}
            <em className="italic font-serif" style={{ color: "var(--cs-ink-soft)" }}>
              without becoming either one.
            </em>
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            Most portfolio sites for designers assume one of two things: the designer sells directly (the site needs a store), or the designer is gallery-represented (the site behaves like a museum vitrine). Henrique sits between both. His value comes from authorship; the transaction happens elsewhere.
          </RevealOnView>
          <p>The site had to do two things that rarely live together:</p>
          <ul className="space-y-3 pl-6 list-disc marker:text-[color:var(--cs-accent)]">
            <li>Build desire for the work through editorial-quality photography, considered typography, and restraint.</li>
            <li>Connect visitors to a physical point of sale without becoming a directory or losing the editorial register.</li>
          </ul>
          <p>
            The brief, written plainly: a portfolio that builds the brand and quietly closes the loop with the stores that sell it. No checkout. No cart. No friction between desire and discovery.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. Pull-quote B ---------- */

function PullQuoteB() {
  return (
    <PullQuote>
      &ldquo;A portfolio for someone whose work is sold by other people changes the entire architecture.&rdquo;
    </PullQuote>
  );
}

/* ---------- 10. Comparison images ---------- */

function ComparisonImages() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaPlaceholder
            aspect="4 / 5"
            path="/casestudy/henrique-editorial.jpg"
            label="Editorial side"
          />
          <MediaPlaceholder
            aspect="4 / 5"
            path="/casestudy/henrique-stores-map.jpg"
            label="Commercial side"
          />
        </div>
        <p className="mt-5 text-xs tracking-wider uppercase text-center" style={{ color: "var(--cs-ink-muted)" }}>
          ← Editorial · Commercial →
        </p>
      </div>
    </section>
  );
}

/* ---------- 11. What I decided not to do ---------- */

function DecidedNotToDo() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;What I decided not to do
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            Naming what you reject sharpens what you choose.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REJECTED.map((r) => (
            <div
              key={r.num}
              className="p-10 border rounded-2xl"
              style={{
                borderColor: "var(--cs-rule)",
                background: "#FFFFFF",
                borderLeftWidth: 3,
                borderLeftColor: "var(--cs-accent)",
              }}
            >
              <div className="font-mono text-xs mb-6" style={{ color: "var(--cs-accent)" }}>
                /{r.num}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-5" style={{ color: "var(--cs-ink)" }}>
                {r.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. The loop, restated ---------- */

function LoopRestated() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The loop, restated
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            Four stages. Each with the question it&apos;s built to ask.
          </h2>
          <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
            The stages are the same shape as Wavyclub, scaled for client work. The product is the evidence they hold up under real conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOP_STAGES.map((s) => (
            <div
              key={s.id}
              className="p-8 border rounded-2xl"
              style={{
                borderColor: "var(--cs-rule)",
                background: "#FFFFFF",
                borderLeftWidth: 3,
                borderLeftColor: "var(--cs-accent)",
              }}
            >
              <div className="text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: "var(--cs-ink-muted)" }}>
                Stage {s.id}
              </div>
              <div
                className="font-bold tracking-[0.12em] text-base mb-5"
                style={{ color: "var(--cs-ink)" }}
              >
                {s.name}
              </div>
              <p className="font-serif italic leading-snug text-lg" style={{ color: "var(--cs-ink-soft)" }}>
                {s.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 13. Stage 01 — Listening ---------- */

function Stage01() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="01"
          name="Listening"
          question="Who is this for, and how do they actually buy?"
        />
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl mb-12" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            Before any pixels, conversations. About lineage. About the workshops Henrique came from. About which kinds of clients he wanted to attract more of — architects, store buyers, manufacturers, not direct buyers. About what &ldquo;showing his work&rdquo; actually means when the work isn&apos;t yours to sell.
          </RevealOnView>
          <p>
            The most useful thing I learned in this stage wasn&apos;t about design. It was commercial: the store partners are the unsung middle layer. The site had to help them too — make their job of selling Henrique easier, not harder. Every decision after this stage was filtered through that constraint.
          </p>
          <p>AI&apos;s role here was minimal. Listening doesn&apos;t delegate well.</p>
        </div>
        <MediaPlaceholder
          aspect="16 / 9"
          path="/casestudy/henrique-discovery-notes.jpg"
          note="Discovery notes / shaping doc"
        />
      </div>
    </section>
  );
}

/* ---------- 14. Stage 02 — Finding the language ---------- */

function Stage02() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="02"
          name="Finding the language"
          question="What does the work demand visually?"
        />
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl mb-12" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            The typography came first. A single serif, used with weight and restraint. Generous line height. Type that holds emotion without performing it.
          </RevealOnView>
          <p>
            Then color. Warm, earth-leaning, with a single accent — a terracotta orange that appears just enough to anchor the eye, never enough to dominate. The palette borrows from the materials in the work: walnut, oak, brass, raw linen.
          </p>
          <p>
            The biggest decision in this stage was deciding what not to do with the photographs. Most furniture sites compete with their own images — overlaying text, animating reveals, cropping aggressively. I let them sit. Full-bleed where they deserved it, generous margins where they didn&apos;t. The site became a frame for the work, not a stage.
          </p>
          <p>
            The scroll-driven animation of the chair was decided here too. A chair that rotates as you scroll, showing the piece from multiple angles — not as a gimmick, but as a quiet way to say: this is considered from every side. The animation rewards attention rather than demanding it.
          </p>
          <p>
            Claude was a sparring partner through this entire stage. I drafted directions, Claude pressure-tested them. Color palettes, type pairings, hierarchy decisions — all run through dialogue. The taste was mine. The iteration speed wasn&apos;t.
          </p>
        </div>
        <MediaPlaceholder
          aspect="16 / 9"
          path="/casestudy/henrique-chair-animation.mp4"
          note="Scroll-driven chair animation"
        />
      </div>
    </section>
  );
}

/* ---------- 15. Stage 03 — The system ---------- */

function Stage03() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="03"
          name="The system"
          question="How does this scale, edit, translate?"
        />
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl mb-12" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            Three structural decisions shaped everything after.
          </RevealOnView>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>Bilingual at the foundation.</strong> Portuguese and English were built together, not as a translation toggle bolted onto a finished PT site. Every Sanity schema, every content model, every URL structure was designed bilingual from day one. The English reads native because it was treated as native.
          </p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>Sanity as the editor&apos;s tool, not the developer&apos;s.</strong> Henrique needed to add pieces, edit specifications, update store locations, publish journal entries — without me. The schemas were designed around how he thinks about his work (by piece, by partner, by material), not around how a database would model it. More setup time upfront. His independence downstream.
          </p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>The store map as the commercial bridge.</strong> The map isn&apos;t decorative. It&apos;s the structural answer to the problem named earlier — how do you connect desire to point of sale without becoming e-commerce. Each store gets a real presence: photographs, addresses, what they carry. A visitor who falls for a piece on a product page can find, in two clicks, where to see it in person.
          </p>
          <p>
            This stage is where Claude Code earned its place. Schemas, routing, i18n logic, store data structure — Claude wrote drafts that were 80% there. The remaining 20% — the part that determined whether the system would feel native or feel built — was mine. The collaboration worked because I knew exactly what I wanted, and Claude could ship the scaffolding while I held the taste.
          </p>
        </div>
        <MediaPlaceholder
          aspect="16 / 9"
          path="/casestudy/henrique-stores-map-mobile.mp4"
          note="Stores map on mobile"
        />
      </div>
    </section>
  );
}

/* ---------- 16. Stage 04 — Detail ---------- */

function Stage04() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="04"
          name="The details that took the longest"
          question="What closes the gap between good and considered?"
        />
        <p className="text-lg leading-relaxed max-w-3xl mb-16" style={{ color: "var(--cs-ink-soft)" }}>
          Four micro-decisions. None of them visible by themselves. All of them felt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {DETAILS.map((d) => (
            <div
              key={d.num}
              className="p-10 border rounded-2xl"
              style={{
                borderColor: "var(--cs-rule)",
                background: "#FFFFFF",
                borderLeftWidth: 3,
                borderLeftColor: "var(--cs-accent)",
              }}
            >
              <div className="font-mono text-xs mb-6" style={{ color: "var(--cs-accent)" }}>
                /{d.num}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-5" style={{ color: "var(--cs-ink)" }}>
                {d.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>

        <MediaPlaceholder
          aspect="16 / 9"
          path="/casestudy/henrique-grid-reveal.mp4"
          note="Grid revealing on viewport entry"
        />
      </div>
    </section>
  );
}

/* ---------- 17. The section I cut ---------- */

function SectionICut() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The section I cut
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            The hardest part of the build was{" "}
            <em className="italic font-serif" style={{ color: "var(--cs-ink-soft)" }}>
              deleting it.
            </em>
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            I designed a section I was certain would work. Visually striking — a moodboard moment between the works grid and the about section, a place to breathe between content blocks.
          </RevealOnView>
          <p>
            I spent more time on it than on any other part of the site. Different images. Different layouts. Different copy. Different placements. Every time I looked at it, something felt wrong, and I couldn&apos;t name what.
          </p>
          <p>
            Eventually I named it: the section was ornamental. It existed because I wanted it to exist, not because the site needed it. Decoration with no structural reason to be there.
          </p>
          <p
            className="font-serif italic text-3xl md:text-4xl leading-snug py-4"
            style={{ color: "var(--cs-ink)" }}
          >
            I removed it.
          </p>
          <p>The page became better immediately.</p>
          <p>
            The lesson — which I knew, but had to learn again on this project — is that every element on a page must justify itself by purpose, not by aesthetics. A site for a third-generation woodworker is a strange place to forget that. Carpenters don&apos;t add details that have no function.
          </p>
        </div>
        <div className="mt-12">
          <MediaPlaceholder
            aspect="16 / 9"
            path="/casestudy/henrique-section-cut.jpg"
            note="Before/after or deleted Figma frame with strikethrough"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- 18. What this experiment taught me ---------- */

function WhatItTaughtMe() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;What this experiment taught me
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            Working with AI on a real client project is different from working with AI on a sandbox.
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            The first two experiments in this series were sandboxes — fixed references, no client feedback, no real-world deadlines. This one had all three. And the difference reshaped the practice.
          </RevealOnView>
          <p>Three observations specific to this build:</p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>The client constraints sharpen AI use.</strong> When Henrique needed to be able to edit content himself, &ldquo;let me just hand-code this&rdquo; stopped being an option. AI helped me build for someone else&apos;s autonomy, not just my own speed. That&apos;s a different muscle.
          </p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>Taste-on-taste is the bottleneck.</strong> With Wavyclub, I was the only taste in the loop. With Henrique, his taste, my taste, and AI&apos;s averaging-toward-mean all had to negotiate. AI produces the average of what it&apos;s seen. The designer&apos;s job became editorial in a more layered way — knowing what the client wanted, knowing what the work demanded, knowing what AI would default to, and steering between all three.
          </p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>The second time through a process, you start trusting where AI doesn&apos;t belong.</strong> Listening to a client doesn&apos;t delegate. Cutting a section you love doesn&apos;t delegate. Knowing what&apos;s wrong without being able to name it yet — that doesn&apos;t delegate either. AI accelerated everything that could be specified. The things that couldn&apos;t be specified took the time they were always going to take.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 19. Pull-quote C ---------- */

function PullQuoteC() {
  return (
    <PullQuote>
      &ldquo;AI accelerated everything that could be specified. The things that couldn&apos;t be specified took the time they were always going to take.&rdquo;
    </PullQuote>
  );
}

/* ---------- 20. If this keeps going ---------- */

function IfThisKeepsGoing() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
          ✦ &nbsp;If this keeps going
        </p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl mb-16">
          Where the work could go from here.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEXT.map((n) => (
            <div
              key={n.num}
              className="p-8 border rounded-2xl"
              style={{
                borderColor: "var(--cs-rule)",
                background: "var(--cs-bg-alt)",
                borderLeftWidth: 3,
                borderLeftColor: "var(--cs-accent)",
              }}
            >
              <div className="font-mono text-xs mb-5" style={{ color: "var(--cs-accent)" }}>
                /next/{n.num}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-4" style={{ color: "var(--cs-ink)" }}>
                {n.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 21. Footer ---------- */

function HenriqueFooter() {
  return (
    <footer className="py-24" style={{ background: "var(--cs-product-bg)", color: "var(--cs-product-ink)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "rgba(245,243,238,0.5)" }}>
          ✦ &nbsp;Let&apos;s chat and create something together
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight max-w-4xl mb-16">
          See it live, read the code, or say hello.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <CTALink
            label="Live demo"
            href="https://portfolio-henrique-snowy.vercel.app/"
            arrow="→"
            primary
          />
          <CTALink
            label="Repository"
            href="https://github.com/barbirez/portfolio-henrique"
            arrow="↗"
          />
          <CTALink
            label="Email me"
            href="mailto:barbararezendeso@gmail.com"
            arrow="✉"
          />
        </div>

        <div
          className="border-t pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs tracking-[0.18em] uppercase"
          style={{ borderColor: "rgba(245,243,238,0.12)", color: "rgba(245,243,238,0.5)" }}
        >
          <span>Barbara Rezende — №03 of 5</span>
          <span>Henrique Schreiber · Experiments in building with AI · 2026</span>
          <a
            href="https://www.barbararezende.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            style={{ color: "var(--cs-product-ink)" }}
          >
            ← back to portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}

function CTALink({
  label,
  href,
  arrow,
  primary = false,
}: {
  label: string;
  href: string;
  arrow: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between p-8 rounded-2xl border transition-colors"
      style={{
        borderColor: primary ? "var(--cs-accent)" : "rgba(245,243,238,0.12)",
        background: primary ? "var(--cs-accent)" : "transparent",
        color: primary ? "#ffffff" : "var(--cs-product-ink)",
      }}
    >
      <span className="font-serif text-2xl">{label}</span>
      <span className="text-2xl transition-transform group-hover:translate-x-1">{arrow}</span>
    </a>
  );
}

/* ---------- Shared helpers ---------- */

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <blockquote
          className="font-serif italic text-3xl md:text-5xl leading-snug text-center py-16 border-y"
          style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink)" }}
        >
          {children}
        </blockquote>
      </div>
    </section>
  );
}

function MediaPlaceholder({
  aspect,
  path,
  note,
  label,
}: {
  aspect: string;
  path: string;
  note?: string;
  label?: string;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden flex items-center justify-center w-full"
      style={{
        borderColor: "var(--cs-rule)",
        background: "var(--cs-bg-alt)",
        aspectRatio: aspect,
      }}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        {label && (
          <span
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--cs-ink-muted)" }}
          >
            {label}
          </span>
        )}
        <span
          className="font-mono text-sm"
          style={{ color: "var(--cs-ink-soft)" }}
        >
          {path}
        </span>
        {note && (
          <span
            className="text-xs"
            style={{ color: "var(--cs-ink-muted)" }}
          >
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
