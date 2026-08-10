import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVEAL_LINES = [
  { text: "There was one gift I could never fit inside a box.", delay: 0 },
  { text: "It's every memory we've shared.", delay: 2.5 },
  { text: "Every laugh.", delay: 4.5 },
  { text: "Every late-night conversation.", delay: 6.0 },
  { text: "Every moment that made me fall in love with you even more.", delay: 8.0 },
  { text: "And every future memory I dream of making with you.", delay: 10.5 },
];

const CLOSING_LINES = [
  { text: "Some gifts can be wrapped.", delay: 14.0 },
  { text: "But the most meaningful ones live in the heart.", delay: 16.0 },
];

export default function FinalGiftReveal({ visible, onFinished }) {
  const [phase, setPhase] = useState("box"); // "box" | "opening" | "letter" | "done"
  const [letterUnfolded, setLetterUnfolded] = useState(false);

  // Auto-transition to next scene after reading
  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(() => onFinished?.(), 4000);
      return () => clearTimeout(t);
    }
  }, [phase, onFinished]);

  // Mark done after all lines have been shown
  useEffect(() => {
    if (letterUnfolded) {
      const t = setTimeout(() => setPhase("done"), 20000);
      return () => clearTimeout(t);
    }
  }, [letterUnfolded]);

  function handleBoxClick() {
    if (phase !== "box") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("letter");
      setTimeout(() => setLetterUnfolded(true), 800);
    }, 1800);
  }

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col items-center w-full max-w-2xl mx-auto"
    >
      {/* The Special Final Gift Box */}
      {phase === "box" && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Subtle ambient glow behind the box */}
          <div
            className="pointer-events-none absolute h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            onClick={handleBoxClick}
            className="relative h-56 w-56 sm:h-64 sm:w-64 [perspective:1200px] cursor-pointer group"
          >
            {/* Deep shadow */}
            <div className="absolute -bottom-6 left-1/2 h-10 w-52 -translate-x-1/2 rounded-full bg-[#1a0a06]/40 blur-lg pointer-events-none" />

            {/* Bigger, richer box */}
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-[#5a1525] via-[#481220] to-[#2d0a14] border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.5),_0_0_40px_rgba(212,175,55,0.08)] flex items-center justify-center overflow-hidden">
              {/* Deep texture */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                }}
              />

              {/* Gold filigree borders */}
              <div className="absolute inset-3 rounded-xl border border-[#D4AF37]/30 pointer-events-none" />
              <div className="absolute inset-4 rounded-lg border border-[#D4AF37]/15 pointer-events-none" />

              {/* Gold corner guards */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-lg" />

              {/* Dark burgundy satin ribbon — vertical */}
              <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-[#8a2040] via-[#c03060] to-[#8a2040] shadow-inner" />

              {/* Dark burgundy satin ribbon — horizontal */}
              <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-b from-[#8a2040] via-[#c03060] to-[#8a2040] shadow-inner" />

              {/* Center gold wax seal */}
              <div className="relative z-30 h-14 w-14 rounded-full bg-gradient-to-br from-[#ffe680] via-[#D4AF37] to-[#8a6200] border-2 border-[#FFFDF8]/60 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-[#3a1f00] tracking-widest">?</span>
              </div>

              {/* Floating particles around the box */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#D4AF37]/50 pointer-events-none"
                  style={{
                    width: 2 + Math.random() * 2,
                    height: 2 + Math.random() * 2,
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-xs uppercase tracking-[0.4em] text-[#D4AF37]/80"
          >
            One more surprise…
          </motion.p>
        </motion.div>
      )}

      {/* Opening Animation */}
      {phase === "opening" && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative h-56 w-56 flex items-center justify-center">
            {/* Expanding warm glow */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 3, opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute h-40 w-40 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, #6A2135 40%, transparent 70%)" }}
            />

            {/* Floating sparkle particles */}
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#D4AF37]"
                style={{ width: 2, height: 2 }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* The Letter / Final Message */}
      {(phase === "letter" || phase === "done") && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-8 w-full text-center px-4"
        >
          {/* Letter card */}
          <motion.div
            initial={{ scaleY: 0.3, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl p-8 sm:p-12 border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            style={{
              background: "linear-gradient(165deg, #FFFDF8 0%, #F5EFE6 100%)",
              transformOrigin: "center bottom",
            }}
          >
            {/* Paper texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] rounded-2xl"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-2 mb-8"
            >
              <span className="text-2xl text-[#D4AF37]">❀</span>
              <p className="font-serif text-xs uppercase tracking-[0.5em] text-[#B58A2B]">
                The Final Gift
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#6A2135] italic font-light">
                The Last Gift
              </h2>
              <div className="h-px w-12 bg-[#D4AF37]/40 mt-1" />
            </motion.div>

            {/* Staggered reveal lines */}
            {letterUnfolded && (
              <div className="space-y-4">
                {REVEAL_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: line.delay, duration: 1, ease: "easeOut" }}
                    className="font-serif text-sm sm:text-base text-[#2D2A26]/85 leading-relaxed italic font-light"
                  >
                    {line.text}
                  </motion.p>
                ))}

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 13.0, duration: 0.8 }}
                  className="h-px w-16 bg-[#D4AF37]/40 mx-auto my-6"
                />

                {/* Closing lines */}
                {CLOSING_LINES.map((line, i) => (
                  <motion.p
                    key={`close-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: line.delay, duration: 1, ease: "easeOut" }}
                    className="font-serif text-sm sm:text-base text-[#6A2135] leading-relaxed italic"
                  >
                    {line.text}
                  </motion.p>
                ))}

                {/* Final dedication */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 18.0, duration: 1 }}
                  className="flex flex-col items-center gap-2 pt-6"
                >
                  <p className="font-serif text-base sm:text-lg text-[#6A2135] italic font-medium">
                    For you, always.
                  </p>
                  <div className="h-px w-8 bg-[#D4AF37]/30" />
                  <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#B58A2B]">
                    — Mehrab
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Fade-out transition overlay */}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="fixed inset-0 z-50 pointer-events-none bg-[#F7F3EC]"
        />
      )}
    </motion.div>
  );
}
