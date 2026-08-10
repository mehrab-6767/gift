/**
 * Page content components for the FlipBook.
 * Each exports a { left, right } spread object.
 *
 * Design principles:
 *  - Large, readable serif text (Cormorant Garamond)
 *  - Photo on the LEFT, story on the RIGHT
 *  - Generous whitespace
 *  - Minimal, elegant decorations
 */

import { memories } from "../../data/memories";

/* ─── helpers ───────────────────────────────────────────────────────────── */
const GOLD    = "#B58A2B";
const BURG    = "#6A2135";
const TEXT    = "#2D2A26";
const PAPER   = "#FFFDF8";
const FAINT   = "rgba(181,138,43,0.20)";

/* ─── Title spread (spread 0) ───────────────────────────────────────────── */
export const titleSpreadLeft = (
  <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
    {/* Emblem */}
    <div
      className="flex h-28 w-28 items-center justify-center rounded-full"
      style={{ border: `1px solid ${FAINT}`, background: "rgba(255,253,248,0.6)" }}
    >
      <span style={{ fontSize: "2.2rem", color: GOLD }}>❀</span>
    </div>

    <p
      className="mt-8 italic leading-relaxed"
      style={{ fontSize: "1.05rem", color: `${BURG}CC`, fontFamily: "serif", maxWidth: "22ch", lineHeight: 1.7 }}
    >
      "Every page is a piece of my heart, kept safe across every mile."
    </p>

    <p
      className="absolute bottom-8 left-0 right-0 text-center uppercase"
      style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: `${GOLD}99` }}
    >
      Handcrafted Volume I
    </p>
  </div>
);

export const titleSpreadRight = (
  <div className="flex h-full flex-col items-center justify-center px-10 text-center">
    <p
      className="uppercase"
      style={{ fontSize: "0.65rem", letterSpacing: "0.5em", color: GOLD, marginBottom: "1.5rem" }}
    >
      Personal Keepsake
    </p>

    <h1
      style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: BURG, fontFamily: "serif", fontWeight: 300, lineHeight: 1 }}
    >
      The Story
    </h1>
    <h2
      style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: TEXT, fontFamily: "serif", fontStyle: "italic", fontWeight: 300, marginTop: "0.4rem" }}
    >
      of Arshiya
    </h2>

    <div
      className="my-8 rounded-full"
      style={{ height: "1px", width: "80px", background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)` }}
    />

    <div style={{ fontFamily: "serif" }}>
      <p style={{ fontSize: "1.1rem", color: `${TEXT}CC`, fontWeight: 300 }}>Created with love,</p>
      <p style={{ fontSize: "1.1rem", color: BURG, fontStyle: "italic", marginTop: "0.25rem" }}>
        for your 14th birthday.
      </p>
    </div>

    <p
      className="uppercase"
      style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: GOLD, marginTop: "3rem" }}
    >
      August 23, 2026
    </p>
  </div>
);

/* ─── Memory spread factory ─────────────────────────────────────────────── */
function makeMemoryLeft(memory) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 py-6">
      {/* Year watermark */}
      <span
        className="absolute top-5 left-6 font-serif font-light"
        style={{ fontSize: "1.8rem", color: `${GOLD}44`, letterSpacing: "0.1em" }}
      >
        {memory.year}
      </span>

      {/* Photo frame */}
      <div
        className="relative overflow-hidden"
        style={{
          maxWidth: "92%",
          maxHeight: "84%",
          background: PAPER,
          padding: "8px 8px 24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)",
          border: `1px solid rgba(180,160,120,0.3)`,
          borderRadius: "2px",
          transform: `rotate(${memory.year % 2 === 0 ? "-0.8" : "0.8"}deg)`,
        }}
      >
        <img
          src={memory.photo}
          alt={memory.title}
          style={{ display: "block", width: "100%", height: "auto", maxHeight: "340px", objectFit: "cover" }}
        />
        {/* Caption below photo like a polaroid */}
        <p
          className="italic text-center"
          style={{ fontSize: "0.72rem", color: `${TEXT}99`, marginTop: "8px", fontFamily: "serif", lineHeight: 1.4 }}
        >
          {memory.quote}
        </p>
      </div>

      {/* Volume tag */}
      <p
        className="absolute bottom-5 uppercase"
        style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: `${GOLD}88` }}
      >
        Vol. I · {memory.year}
      </p>
    </div>
  );
}

function makeMemoryRight(memory) {
  return (
    <div className="flex h-full flex-col justify-center px-8 py-8">
      {/* Chapter header */}
      <div className="flex items-center gap-3" style={{ marginBottom: "1.2rem" }}>
        <div style={{ height: "1px", width: "28px", background: `${GOLD}55` }} />
        <span
          className="uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: `${GOLD}BB` }}
        >
          {memory.year}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
          color: BURG,
          fontFamily: "serif",
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: "1.2rem",
        }}
      >
        {memory.title}
      </h2>

      {/* Divider */}
      <div style={{ height: "1px", width: "48px", background: `${GOLD}44`, marginBottom: "1.4rem" }} />

      {/* Story */}
      <p
        style={{
          fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)",
          color: `${TEXT}DD`,
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.85,
          fontStyle: "normal",
        }}
      >
        {memory.story}
      </p>

      {/* Navigation hint */}
      <p
        className="absolute bottom-5 right-6 italic"
        style={{ fontSize: "0.68rem", color: `${GOLD}88`, fontFamily: "serif" }}
      >
        tap → to continue
      </p>
    </div>
  );
}

/* ─── Final spread (after last memory) ─────────────────────────────────── */
export const finalSpreadLeft = (
  <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
    <div
      style={{ fontSize: "3rem", color: `${GOLD}99`, marginBottom: "1rem" }}
    >
      ♥
    </div>
    <p
      className="font-serif italic"
      style={{ fontSize: "1.1rem", color: `${BURG}CC`, lineHeight: 1.7, maxWidth: "22ch" }}
    >
      "From that first photograph to this very moment — every year of you has been a gift."
    </p>
    <div style={{ height: "1px", width: "60px", background: `${GOLD}44`, margin: "1.5rem auto" }} />
    <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: `${GOLD}88`, textTransform: "uppercase" }}>
      2013 — 2026
    </p>
  </div>
);

export const finalSpreadRight = (
  <div className="flex h-full flex-col items-center justify-center text-center px-10">
    <p
      className="uppercase"
      style={{ fontSize: "0.6rem", letterSpacing: "0.5em", color: GOLD, marginBottom: "1.5rem" }}
    >
      With All My Love
    </p>

    <h2
      style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BURG, fontFamily: "serif", fontWeight: 300, lineHeight: 1.1 }}
    >
      Happy Birthday,<br />
      <em>Arshiya</em>
    </h2>

    <div style={{ height: "1px", width: "60px", background: `${GOLD}55`, margin: "2rem auto" }} />

    <p
      className="italic"
      style={{ fontSize: "1rem", color: `${TEXT}CC`, fontFamily: "serif", lineHeight: 1.7 }}
    >
      The world became more beautiful<br />the day you were born.
    </p>

    <p
      style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: `${GOLD}88`, marginTop: "2.5rem", textTransform: "uppercase" }}
    >
      August 23, 2026
    </p>

    <p
      className="absolute bottom-5 italic"
      style={{ fontSize: "0.7rem", color: `${GOLD}77`, fontFamily: "serif" }}
    >
      tap → to close the book
    </p>
  </div>
);

/* ─── Build all pages for FlipBook ─────────────────────────────────────── */
export function buildPages() {
  const pages = [
    // Spread 0: title
    { left: titleSpreadLeft, right: titleSpreadRight },
  ];

  // Spreads 1..14: one per memory
  memories.forEach((mem) => {
    pages.push({ left: makeMemoryLeft(mem), right: makeMemoryRight(mem) });
  });

  // Final closing spread
  pages.push({ left: finalSpreadLeft, right: finalSpreadRight });

  return pages;
}
