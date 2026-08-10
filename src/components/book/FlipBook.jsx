/**
 * FlipBook.jsx  — Realistic CSS-3D page-turn engine
 *
 * Props:
 *   pages        – array of { left: ReactNode, right: ReactNode }
 *   coverFront   – ReactNode  (front cover)
 *   coverBack    – ReactNode  (back cover)
 *   onFinish     – () => void  called when reader closes the back cover
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── constants ─────────────────────────────────────────────────────────── */
const TURN_MS   = 900;    // page turn duration
const COVER_MS  = 1200;   // cover open/close — slightly slower
const EASE      = "cubic-bezier(0.645, 0.045, 0.355, 1.000)";

/* ─── helpers ───────────────────────────────────────────────────────────── */
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

/* ─── Paper texture overlay ─────────────────────────────────────────────── */
function PaperTexture({ opacity = 0.04 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        mixBlendMode: "multiply",
      }}
    />
  );
}

/* ─── Single page face ──────────────────────────────────────────────────── */
function PageFace({ children, side = "right", flipped = false, shadow = "none" }) {
  const borderRadius =
    side === "right"
      ? { borderRadius: "0 8px 8px 0" }
      : { borderRadius: "8px 0 0 8px" };

  const spineShadow =
    side === "right"
      ? { boxShadow: "inset 10px 0 25px rgba(0,0,0,0.10), inset 20px 0 40px rgba(0,0,0,0.04)" }
      : { boxShadow: "inset -10px 0 25px rgba(0,0,0,0.10), inset -20px 0 40px rgba(0,0,0,0.04)" };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        ...borderRadius,
        background: "#FFFDF8",
        ...spineShadow,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: flipped ? "rotateY(180deg)" : "none",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(180,160,120,0.07) 31px, rgba(180,160,120,0.07) 32px)",
          backgroundPosition: "0 40px",
        }}
      />
      <PaperTexture />

      {shadow !== "none" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              shadow === "right-turning"
                ? "linear-gradient(to left, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 20%, transparent 60%)"
                : "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 20%, transparent 60%)",
          }}
        />
      )}

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

/* ─── Cover face (leather look) ─────────────────────────────────────────── */
function CoverFace({ children, side = "right", flipped = false }) {
  const borderRadius =
    side === "right"
      ? { borderRadius: "0 16px 16px 0" }
      : { borderRadius: "16px 0 0 16px" };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        ...borderRadius,
        background: "linear-gradient(135deg, #5a1828 0%, #481523 50%, #3a0f1a 100%)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: flipped ? "rotateY(180deg)" : "none",
      }}
    >
      {/* Marbled endpaper */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1]"
        style={{
          background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(200,180,140,0.12) 8px, rgba(200,180,140,0.12) 9px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-3 rounded pointer-events-none"
        style={{ border: "1px solid rgba(181,138,43,0.15)" }}
      />
      {children}
    </div>
  );
}

/* ─── Turning sheet (pages) ─────────────────────────────────────────────── */
function TurningSheet({ frontContent, backContent, direction, onDone }) {
  const isForward = direction === "forward";

  return (
    <div
      className="absolute inset-0"
      style={{
        transformOrigin: isForward ? "left center" : "right center",
        transformStyle: "preserve-3d",
        animation: `${isForward ? "pageForward" : "pageBackward"} ${TURN_MS}ms ${EASE} forwards`,
        zIndex: 50,
        willChange: "transform",
      }}
      onAnimationEnd={onDone}
    >
      <PageFace side={isForward ? "right" : "left"} shadow={isForward ? "right-turning" : "left-turning"}>
        {frontContent}
      </PageFace>
      <PageFace side={isForward ? "left" : "right"} flipped>
        {backContent}
      </PageFace>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{
          ...(isForward
            ? { left: "-40px", width: "40px", right: "auto" }
            : { right: "-40px", width: "40px", left: "auto" }),
          background: isForward
            ? "linear-gradient(to right, rgba(0,0,0,0.18), transparent)"
            : "linear-gradient(to left, rgba(0,0,0,0.18), transparent)",
          animation: `${isForward ? "shadowForward" : "shadowBackward"} ${TURN_MS}ms ${EASE} forwards`,
        }}
      />
    </div>
  );
}

/* ─── Opening cover sheet (same CSS keyframe approach) ──────────────────── */
function OpeningCoverSheet({ coverFront, onDone }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        animation: `coverOpen ${COVER_MS}ms ${EASE} forwards`,
        zIndex: 70,
        willChange: "transform",
      }}
      onAnimationEnd={onDone}
    >
      {/* Front: the cover exterior */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "0 16px 16px 0",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {coverFront}
      </div>

      {/* Back: inside of front cover (endpaper) */}
      <CoverFace side="left" flipped />

      {/* Cast shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: "-50px",
          width: "50px",
          background: "linear-gradient(to right, rgba(0,0,0,0.25), transparent)",
          animation: `shadowForward ${COVER_MS}ms ${EASE} forwards`,
        }}
      />
    </div>
  );
}

/* ─── Closing cover sheet (same CSS keyframe approach) ──────────────────── */
function ClosingCoverSheet({ onDone }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        animation: `coverClose ${COVER_MS}ms ${EASE} forwards`,
        zIndex: 70,
        willChange: "transform",
      }}
      onAnimationEnd={onDone}
    >
      {/* Front: blank page / right board face */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "0 8px 8px 0",
          background: "#FFFDF8",
          boxShadow: "inset 10px 0 25px rgba(0,0,0,0.10)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <PaperTexture opacity={0.06} />
      </div>

      {/* Back: the back cover exterior */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "8px 0 0 8px",
          background: "linear-gradient(135deg, #7b2940 0%, #6A2135 50%, #481523 100%)",
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 1px, transparent 1.5px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div className="absolute inset-4 rounded-lg border border-[#B58A2B]/25 pointer-events-none" />
      </div>

      {/* Cast shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: "-50px",
          width: "50px",
          background: "linear-gradient(to right, rgba(0,0,0,0.25), transparent)",
          animation: `shadowBackward ${COVER_MS}ms ${EASE} forwards`,
        }}
      />
    </div>
  );
}

/* ─── Spine ─────────────────────────────────────────────────────────────── */
function Spine() {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: "24px",
        background: "linear-gradient(to right, #3a1810 0%, #6a2820 30%, #8a3830 50%, #6a2820 70%, #3a1810 100%)",
        boxShadow: "2px 0 8px rgba(0,0,0,0.3), -2px 0 8px rgba(0,0,0,0.3)",
        zIndex: 60,
      }}
    >
      <div className="absolute inset-y-0 left-[4px] w-px bg-[#B58A2B]/40" />
      <div className="absolute inset-y-0 right-[4px] w-px bg-[#B58A2B]/40" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#B58A2B]/20" />
    </div>
  );
}

/* ─── Page edge stack ───────────────────────────────────────────────────── */
function PageEdgeStack({ side, totalPages, currentPage }) {
  const remaining = side === "right" ? totalPages - currentPage : currentPage;
  const thickness = clamp(remaining * 2.5, 1, 28);

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        [side === "right" ? "right" : "left"]: "-1px",
        top: "4px",
        bottom: "4px",
        width: `${thickness}px`,
        background:
          side === "right"
            ? "linear-gradient(to right, #e8dcc8, #d4c8b0, #c8bca0)"
            : "linear-gradient(to left, #e8dcc8, #d4c8b0, #c8bca0)",
        borderRadius: side === "right" ? "0 3px 3px 0" : "3px 0 0 3px",
        zIndex: 5,
      }}
    >
      {Array.from({ length: Math.min(remaining, 10) }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: `${(i / Math.min(remaining, 10)) * 100}%`,
            height: "1px",
            background: "rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Back cover ────────────────────────────────────────────────────────── */
function BackCover({ children }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #7b2940 0%, #6A2135 50%, #481523 100%)",
        borderRadius: "8px 18px 18px 8px",
        boxShadow: "inset -10px 0 30px rgba(0,0,0,0.3), 10px 0 30px rgba(0,0,0,0.2)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 1px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div className="absolute inset-4 rounded-lg border border-[#B58A2B]/30 pointer-events-none" />
      <div className="absolute inset-5 rounded-md border border-[#B58A2B]/15 pointer-events-none" />
      <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#B58A2B]/60 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#B58A2B]/60 rounded-br-lg pointer-events-none" />
      <div className="absolute top-2 left-2 w-7 h-7 border-t-2 border-l-2 border-[#B58A2B]/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-7 h-7 border-b-2 border-l-2 border-[#B58A2B]/40 rounded-bl-lg pointer-events-none" />

      {children || (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <div className="text-5xl text-[#B58A2B]/60 mb-4">❀</div>
          <p className="font-serif text-sm text-[#d8bb67]/60 uppercase tracking-[0.4em]">The End</p>
          <div className="mt-4 h-px w-12 bg-[#B58A2B]/30" />
        </div>
      )}
    </div>
  );
}

/* ─── Hit zones ─────────────────────────────────────────────────────────── */
function TurnHitZone({ side, onClick, isTurning, disabled }) {
  if (disabled) return null;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={side === "right" ? "Next page" : "Previous page"}
      onClick={!isTurning ? onClick : undefined}
      onKeyDown={(e) => e.key === "Enter" && !isTurning && onClick?.()}
      className="absolute inset-y-0 z-40 flex items-center"
      style={{
        [side]: 0,
        width: "45%",
        cursor: isTurning ? "default" : (side === "right" ? "e-resize" : "w-resize"),
      }}
    >
      {!isTurning && (
        <div
          className="absolute"
          style={{
            [side]: "10px",
            opacity: 0.25,
            fontSize: "20px",
            color: "#6A2135",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {side === "right" ? "›" : "‹"}
        </div>
      )}
    </div>
  );
}

/* ─── Main FlipBook ─────────────────────────────────────────────────────── */
export default function FlipBook({ pages, coverFront, coverBack, onFinish }) {
  // bookPhase: "cover" | "opening" | "open" | "closing" | "closed-back"
  const [bookPhase, setBookPhase] = useState("cover");
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turningDir, setTurningDir] = useState(null);
  const [showFinishBtn, setShowFinishBtn] = useState(false);

  const totalSheets = pages.length;
  const isAtStart   = currentSheet === 0;
  const isAtEnd     = currentSheet === totalSheets - 1;
  const isOpen      = bookPhase === "open";

  function openBook() {
    if (bookPhase !== "cover") return;
    setBookPhase("opening");
  }

  function handleOpenDone() {
    setBookPhase("open");
  }

  function turnForward() {
    if (isTurning || !isOpen) return;
    if (isAtEnd) {
      setBookPhase("closing");
      return;
    }
    setIsTurning(true);
    setTurningDir("forward");
    setTimeout(() => {
      setCurrentSheet((s) => s + 1);
      setIsTurning(false);
      setTurningDir(null);
    }, TURN_MS);
  }

  function turnBackward() {
    if (isTurning || !isOpen || isAtStart) return;
    setIsTurning(true);
    setTurningDir("backward");
    setTimeout(() => {
      setCurrentSheet((s) => s - 1);
      setIsTurning(false);
      setTurningDir(null);
    }, TURN_MS);
  }

  function handleCloseDone() {
    setBookPhase("closed-back");
    setTimeout(() => setShowFinishBtn(true), 500);
  }

  const spread     = pages[currentSheet];
  const prevSpread = currentSheet > 0 ? pages[currentSheet - 1] : null;
  const nextSpread = currentSheet < totalSheets - 1 ? pages[currentSheet + 1] : null;

  /* ── FRONT COVER (closed / opening) ─────────────────────────── */
  if (bookPhase === "cover" || bookPhase === "opening") {
    return (
      <BookShell>
        {/* Left half: board interior + first left page */}
        <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "8px 0 0 8px" }}>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #5a1828, #481523, #3a0f1a)", borderRadius: "8px 0 0 8px" }}
          />
          {bookPhase === "opening" && (
            <PageFace side="left">{spread?.left}</PageFace>
          )}
        </div>

        <Spine />

        {/* Right half: cover + page underneath */}
        <div className="relative flex-1">
          {/* Page underneath — visible once cover swings past ~90° */}
          {bookPhase === "opening" && (
            <PageFace side="right">{spread?.right}</PageFace>
          )}

          {/* Animated cover — same keyframe as page turn */}
          {bookPhase === "opening" ? (
            <OpeningCoverSheet coverFront={coverFront} onDone={handleOpenDone} />
          ) : (
            /* Static cover when closed */
            <div
              className="absolute inset-0 overflow-hidden cursor-pointer"
              style={{ borderRadius: "0 16px 16px 0", zIndex: 70 }}
              onClick={openBook}
            >
              {coverFront}
            </div>
          )}

          {/* Tap prompt */}
          {bookPhase === "cover" && (
            <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none z-[80]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#d8bb67]/80">
                  Tap to open
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </BookShell>
    );
  }

  /* ── BACK COVER (closed) ────────────────────────────────────── */
  if (bookPhase === "closed-back") {
    return (
      <div className="flex flex-col items-center gap-8">
        <BookShell>
          <BackCover>{coverBack}</BackCover>
        </BookShell>

        <AnimatePresence>
          {showFinishBtn && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              id="book-finish-btn"
              onClick={onFinish}
              className="px-10 py-4 rounded-full font-serif text-sm uppercase tracking-widest cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)",
                border: "1px solid rgba(212,175,55,0.45)",
                color: "#D4AF37",
                boxShadow: "0 0 30px rgba(212,175,55,0.12)",
              }}
            >
              Cross the Distance ✦
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── BOOK OPEN ──────────────────────────────────────────────── */
  return (
    <BookShell>
      {/* Left board */}
      <div className="relative flex-1">
        <PageEdgeStack side="left" totalPages={totalSheets} currentPage={currentSheet} />
        <PageFace side="left">{spread?.left}</PageFace>

        {isTurning && turningDir === "backward" && (
          <TurningSheet
            direction="backward"
            frontContent={spread?.left}
            backContent={prevSpread?.right}
            onDone={() => {}}
          />
        )}

        <TurnHitZone
          side="left"
          onClick={turnBackward}
          isTurning={isTurning || bookPhase === "closing"}
          disabled={isAtStart}
        />
      </div>

      <Spine />

      {/* Right board */}
      <div className="relative flex-1">
        <PageEdgeStack side="right" totalPages={totalSheets} currentPage={currentSheet} />
        <PageFace side="right">{spread?.right}</PageFace>

        {isTurning && turningDir === "forward" && (
          <TurningSheet
            direction="forward"
            frontContent={spread?.right}
            backContent={nextSpread?.left}
            onDone={() => {}}
          />
        )}

        {/* Closing animation — same keyframe style */}
        {bookPhase === "closing" && (
          <ClosingCoverSheet onDone={handleCloseDone} />
        )}

        <TurnHitZone
          side="right"
          onClick={turnForward}
          isTurning={isTurning || bookPhase === "closing"}
          disabled={false}
        />
      </div>

      {/* Page indicator */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        style={{ fontSize: "10px", color: "rgba(106,33,53,0.4)", fontFamily: "serif", letterSpacing: "0.2em" }}
      >
        {currentSheet + 1} / {totalSheets}
      </div>
    </BookShell>
  );
}

/* ─── Book shell ────────────────────────────────────────────────────────── */
function BookShell({ children }) {
  return (
    <div
      className="relative select-none"
      style={{
        width: "min(94vw, 1000px)",
        aspectRatio: "16/9",
        perspective: "2800px",
        perspectiveOrigin: "50% 40%",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
        style={{ width: "70%", height: "48px", background: "rgba(0,0,0,0.22)" }}
      />

      <div
        className="absolute inset-0 flex"
        style={{
          transform: "rotateX(4deg)",
          transformStyle: "preserve-3d",
          boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 12px 30px rgba(0,0,0,0.2)",
          borderRadius: "8px 18px 18px 8px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
