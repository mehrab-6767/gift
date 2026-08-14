import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

function WaxSeal({ onBreak }) {
  const [cracking, setCracking] = useState(false);

  function handleClick() {
    if (cracking) return;
    setCracking(true);
    setTimeout(onBreak, 700);
  }

  return (
    <motion.button
      id="wax-seal-btn"
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative cursor-pointer outline-none border-none bg-transparent"
      aria-label="Break the wax seal"
    >
      <AnimatePresence>
        {cracking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" width="120" height="120">
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,240,200,0.9)" strokeWidth="1.5" />
              <line x1="15" y1="25" x2="85" y2="75" stroke="rgba(255,240,200,0.7)" strokeWidth="1" />
              <line x1="85" y1="25" x2="15" y2="75" stroke="rgba(255,240,200,0.7)" strokeWidth="1" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={cracking ? { scale: [1, 1.15, 0.8], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-2"
      >
        <svg viewBox="0 0 120 120" width={110} height={110}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const cx = 60 + 50 * Math.cos(angle);
            const cy = 60 + 50 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r={8} fill="#8e1c30" />;
          })}
          <circle cx="60" cy="60" r="44" fill="url(#sealGrad)" />
          <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,220,180,0.3)" strokeWidth="1" />
          <text
            x="60"
            y="66"
            textAnchor="middle"
            fontSize="20"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontWeight="bold"
            fill="rgba(255,240,200,0.95)"
          >
            A & M
          </text>
          <defs>
            <radialGradient id="sealGrad" cx="38%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#c0293f" />
              <stop offset="60%" stopColor="#8e1c30" />
              <stop offset="100%" stopColor="#5c0f1e" />
            </radialGradient>
          </defs>
        </svg>
        <p className="font-serif text-xs italic tracking-widest text-[#B58A2B]/90">
          Touch seal to break
        </p>
      </motion.div>
    </motion.button>
  );
}

const LETTER_PARAGRAPHS = [
  "My dearest Arshiya,",
  "If I could fold every feeling I have for you into a piece of paper and press it into your hands, this letter would be it.",
  "I've been counting — not just the 14 years of your life, but all the quiet moments in between. The way your laugh lights up a room, the kindness in your voice, and how you make every ordinary day feel like the best story I'll ever get to tell.",
  "Living 150 kilometers away in Gopalganj while you are in Dhaka hasn't always been easy. But distance has taught me one undeniable truth: true connection isn't measured in kilometers, but in how deeply two people hold each other in their thoughts.",
  "You deserve a thousand handwritten letters. Know that behind every single word here is gratitude, wonder, and an affection that no words could fully capture.",
  "Happy 14th Birthday, my love. The world became immeasurably more beautiful the day you were born.",
  "Forever yours,",
  "~ Mehrab ♥",
];

export default function Letter() {
  const { goTo } = useAppFlow();
  const [sealed, setSealed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);

  function handleSealBreak() {
    setSealed(false);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setShowCta(true), 4000);
    }, 600);
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-12 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 20%, #2d1b0e 0%, #1a0f08 50%, #0f0806 100%)",
      }}
    >
      {/* Candlelight glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full opacity-20 blur-[80px]"
        style={{ background: "radial-gradient(circle, #c8760a 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-1"
        >
          <p className="font-serif text-xs uppercase tracking-[0.5em] text-[#D4AF37]">
            Handwritten Sealed Letter
          </p>
          <h1 className="font-serif italic font-light text-3xl sm:text-4xl text-[#FFF8F0]">
            For Arshiya
          </h1>
        </motion.div>

        {/* Envelope / Letter Paper Container */}
        <motion.div
          layout
          animate={{ y: [0, -3, 0] }}
          transition={{
            layout: { duration: 0.8 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-full rounded-2xl overflow-hidden p-8 sm:p-12"
          style={{
            background: "linear-gradient(160deg, #FFFFFF 0%, #F5F5F5 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,140,80,0.3)",
            minHeight: sealed ? 320 : 480,
          }}
        >
          {/* Left margin line */}
          <div
            className="absolute top-0 bottom-0 w-px opacity-20"
            style={{ left: "10%", background: "#6A2135" }}
          />

          {/* Sealed View */}
          <AnimatePresence>
            {sealed && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
              >
                <WaxSeal onBreak={handleSealBreak} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter Text View */}
          {!sealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 pl-4 text-left"
            >
              <div className="text-right font-serif text-xs italic text-[#B58A2B] mb-4">
                23 August 2026
              </div>

              {LETTER_PARAGRAPHS.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: 0 }}
                  transition={{ delay: idx * 0.35 + 0.3, duration: 0.6 }}
                  className={`font-serif leading-relaxed ${
                    idx === 0
                      ? "text-xl font-normal text-[#6A2135] italic"
                      : idx === LETTER_PARAGRAPHS.length - 2
                      ? "text-base font-medium text-[#6A2135]"
                      : idx === LETTER_PARAGRAPHS.length - 1
                      ? "text-lg font-bold text-[#6A2135] italic text-right mt-6"
                      : "text-sm text-[#2D2A26]/85 font-light"
                  }`}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <AnimatePresence>
          {showCta && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              onClick={() => goTo(FLOW.FUTURE)}
              className="px-10 py-4 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/40 font-serif text-xs uppercase tracking-widest shadow-xl hover:bg-[#8b2b46] transition-all cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Dream With Me ✦
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}