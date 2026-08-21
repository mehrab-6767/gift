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
const PAPER   = "#FFFFFF";
const FAINT   = "rgba(181,138,43,0.20)";

/* ─── Title spread (spread 0) ───────────────────────────────────────────── */
export const titleSpreadLeft = (
  <div className="relative flex h-full flex-col items-center justify-center px-4 sm:px-10 text-center">
    {/* Emblem */}
    <div
      className="flex h-14 w-14 sm:h-24 sm:w-24 items-center justify-center rounded-full"
      style={{ border: `1px solid ${FAINT}`, background: "rgba(255,253,248,0.6)" }}
    >
      <span style={{ fontSize: "clamp(1.2rem, 3.5cqw, 2.2rem)", color: GOLD }}>❀</span>
    </div>

    <p
      className="mt-3 sm:mt-6 italic leading-relaxed"
      style={{ fontSize: "clamp(0.72rem, 2.2cqw, 1.05rem)", color: `${BURG}CC`, fontFamily: "serif", maxWidth: "22ch", lineHeight: 1.6 }}
    >
      "Every page is a piece of my heart, kept safe across every mile."
    </p>

    <p
      className="absolute bottom-2.5 sm:bottom-6 left-0 right-0 text-center uppercase"
      style={{ fontSize: "clamp(0.5rem, 1.4cqw, 0.65rem)", letterSpacing: "0.4em", color: `${GOLD}99` }}
    >
      Handcrafted Volume I
    </p>
  </div>
);

export const titleSpreadRight = (
  <div className="flex h-full flex-col items-center justify-center px-4 sm:px-10 text-center">
    <p
      className="uppercase"
      style={{
        fontSize: "clamp(0.5rem, 1.4cqw, 0.65rem)",
        letterSpacing: "0.45em",
        color: GOLD,
        marginBottom: "clamp(0.3rem, 1.5cqh, 1.2rem)"
      }}
    >
      Personal Keepsake
    </p>

    <h1
      style={{ fontSize: "clamp(1.6rem, 5cqw, 3.8rem)", color: BURG, fontFamily: "serif", fontWeight: 300, lineHeight: 1 }}
    >
      The Story
    </h1>
    <h2
      style={{ fontSize: "clamp(1.2rem, 3.8cqw, 2.6rem)", color: TEXT, fontFamily: "serif", fontStyle: "italic", fontWeight: 300, marginTop: "0.2rem" }}
    >
      of Arshiya
    </h2>

    <div
      className="my-2 sm:my-6 rounded-full"
      style={{
        height: "1px",
        width: "clamp(36px, 10cqw, 80px)",
        background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)`
      }}
    />

    <div style={{ fontFamily: "serif" }}>
      <p style={{ fontSize: "clamp(0.72rem, 2.2cqw, 1.05rem)", color: `${TEXT}CC`, fontWeight: 300 }}>Created with love,</p>
      <p style={{ fontSize: "clamp(0.72rem, 2.2cqw, 1.05rem)", color: BURG, fontStyle: "italic", marginTop: "0.15rem" }}>
        for your 14th birthday.
      </p>
    </div>

    <p
      className="uppercase"
      style={{
        fontSize: "clamp(0.5rem, 1.4cqw, 0.65rem)",
        letterSpacing: "0.35em",
        color: GOLD,
        marginTop: "clamp(0.6rem, 2cqh, 2.4rem)"
      }}
    >
      August 23, 2026
    </p>
  </div>
);

/* ─── Memory spread factory ─────────────────────────────────────────────── */
function makeMemoryLeft(memory) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6">
      {/* Year watermark */}
      <span
        className="absolute top-3 left-4 sm:top-5 sm:left-6 font-serif font-light pointer-events-none select-none"
        style={{ fontSize: "clamp(1.4rem, 3.8cqw, 2rem)", color: `${GOLD}44`, letterSpacing: "0.1em" }}
      >
        {memory.year}
      </span>

      {/* Photo frame — classic prominent Polaroid keepsake */}
      <div
        className="relative flex flex-col items-center"
        style={{
          width: "clamp(150px, 68cqw, 280px)",
          maxWidth: "82%",
          background: PAPER,
          padding: "clamp(4px, 1.2cqw, 6px) clamp(4px, 1.2cqw, 6px) clamp(14px, 3.4cqw, 22px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
          border: `1px solid rgba(180,160,120,0.32)`,
          borderRadius: "2px",
          transform: `rotate(${memory.year % 2 === 0 ? "-0.8" : "0.8"}deg)`,
        }}
      >
        <img
          src={memory.photo}
          alt={memory.title}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "clamp(140px, 58cqh, 300px)",
            objectFit: "contain",
            borderRadius: "1px",
          }}
        />
        {/* Caption below photo */}
        <p
          className="italic text-center"
          style={{
            fontSize: "clamp(0.60rem, 1.7cqw, 0.74rem)",
            color: `${TEXT}99`,
            marginTop: "clamp(4px, 1.1cqh, 8px)",
            fontFamily: "serif",
            lineHeight: 1.35,
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          {memory.quote}
        </p>
      </div>

      {/* Volume tag */}
      <p
        className="absolute bottom-2.5 sm:bottom-4 uppercase pointer-events-none select-none"
        style={{ fontSize: "clamp(0.48rem, 1.3cqw, 0.6rem)", letterSpacing: "0.35em", color: `${GOLD}88` }}
      >
        Vol. I · {memory.year}
      </p>
    </div>
  );
}

function makeMemoryRight(memory) {
  return (
    <div className="flex h-full flex-col justify-center px-4 py-3 sm:px-8 sm:py-6">
      {/* Chapter header */}
      <div className="flex items-center gap-2 sm:gap-3" style={{ marginBottom: "clamp(0.3rem, 1.4cqh, 0.9rem)" }}>
        <div style={{ height: "1px", width: "clamp(18px, 4cqw, 28px)", background: `${GOLD}55` }} />
        <span
          className="uppercase"
          style={{ fontSize: "clamp(0.5rem, 1.4cqw, 0.6rem)", letterSpacing: "0.35em", color: `${GOLD}BB` }}
        >
          {memory.year}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: "clamp(0.95rem, 3cqw, 1.8rem)",
          color: BURG,
          fontFamily: "serif",
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: "clamp(0.3rem, 1.4cqh, 0.8rem)",
        }}
      >
        {memory.title}
      </h2>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          width: "clamp(24px, 6cqw, 44px)",
          background: `${GOLD}44`,
          marginBottom: "clamp(0.4rem, 1.6cqh, 1rem)"
        }}
      />

      {/* Story */}
      <p
        style={{
          fontSize: "clamp(0.66rem, 1.9cqw, 0.96rem)",
          color: `${TEXT}DD`,
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.65,
          fontStyle: "normal",
        }}
      >
        {memory.story}
      </p>

      {/* Navigation hint */}
      <p
        className="absolute bottom-2.5 right-3 sm:bottom-4 sm:right-6 italic"
        style={{ fontSize: "clamp(0.55rem, 1.5cqw, 0.68rem)", color: `${GOLD}88`, fontFamily: "serif" }}
      >
        tap → to continue
      </p>
    </div>
  );
}

/* ─── Final spread (after last memory) ─────────────────────────────────── */
export const finalSpreadLeft = (
  <div className="relative flex h-full flex-col items-center justify-center px-4 sm:px-10 text-center">
    <div
      style={{
        fontSize: "clamp(1.5rem, 4cqw, 2.6rem)",
        color: `${GOLD}99`,
        marginBottom: "clamp(0.3rem, 1.5cqh, 0.8rem)"
      }}
    >
      ♥
    </div>
    <p
      className="font-serif italic"
      style={{
        fontSize: "clamp(0.72rem, 2.2cqw, 1.05rem)",
        color: `${BURG}CC`,
        lineHeight: 1.6,
        maxWidth: "22ch"
      }}
    >
      "From that first photograph to this very moment — every year of you has been a gift."
    </p>
    <div
      style={{
        height: "1px",
        width: "clamp(32px, 8cqw, 60px)",
        background: `${GOLD}44`,
        margin: "clamp(0.6rem, 2cqh, 1.4rem) auto"
      }}
    />
    <p style={{ fontSize: "clamp(0.5rem, 1.4cqw, 0.65rem)", letterSpacing: "0.35em", color: `${GOLD}88`, textTransform: "uppercase" }}>
      2013 — 2026
    </p>
  </div>
);

export const finalSpreadRight = (
  <div className="flex h-full flex-col items-center justify-center text-center px-4 sm:px-10">
    <p
      className="uppercase"
      style={{
        fontSize: "clamp(0.5rem, 1.4cqw, 0.6rem)",
        letterSpacing: "0.45em",
        color: GOLD,
        marginBottom: "clamp(0.3rem, 1.5cqh, 1rem)"
      }}
    >
      With All My Love
    </p>

    <h2
      style={{ fontSize: "clamp(1.3rem, 4cqw, 2.8rem)", color: BURG, fontFamily: "serif", fontWeight: 300, lineHeight: 1.1 }}
    >
      Happy Birthday,<br />
      <em>Arshiya</em>
    </h2>

    <div
      style={{
        height: "1px",
        width: "clamp(32px, 8cqw, 60px)",
        background: `${GOLD}55`,
        margin: "clamp(0.6rem, 2cqh, 1.6rem) auto"
      }}
    />

    <p
      className="italic"
      style={{ fontSize: "clamp(0.72rem, 2.2cqw, 0.98rem)", color: `${TEXT}CC`, fontFamily: "serif", lineHeight: 1.6 }}
    >
      The world became more beautiful<br />the day you were born.
    </p>

    <p
      style={{
        fontSize: "clamp(0.5rem, 1.4cqw, 0.65rem)",
        letterSpacing: "0.35em",
        color: `${GOLD}88`,
        marginTop: "clamp(0.6rem, 2cqh, 2rem)",
        textTransform: "uppercase"
      }}
    >
      August 23, 2026
    </p>

    <p
      className="absolute bottom-2.5 sm:bottom-4 italic"
      style={{ fontSize: "clamp(0.55rem, 1.5cqw, 0.68rem)", color: `${GOLD}77`, fontFamily: "serif" }}
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
