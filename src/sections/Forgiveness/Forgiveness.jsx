import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";
import { apologies } from "../../data/apologies";

const EASE = [0.22, 1, 0.36, 1];

export default function Forgiveness() {
  const { goTo } = useAppFlow();

  // Phase: "opening" | "moments" | "closing"
  const [phase, setPhase] = useState("opening");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  const totalMoments = apologies.length;
  const currentApology = apologies[currentIndex];

  function handleNext() {
    if (currentIndex < totalMoments - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase("closing");
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleTransitionToLetter() {
    if (isTransitioningOut) return;
    setIsTransitioningOut(true);
    setTimeout(() => {
      goTo(FLOW.LETTER);
    }, 1200);
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-5 py-12 select-none sm:px-8"
      style={{
        background: "#FAFAFA",
      }}
    >
      {/* Warm Ambient Sunlight / Candlelight Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(106,33,53,0.08) 50%, transparent 80%)",
        }}
      />

      {/* Subtle Dust / Light Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#B58A2B]/20"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 7 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {/* ═══════════════════════════════════════════════════════════════
              PHASE 1: OPENING MESSAGE (Gradual, sincere reveal)
             ═══════════════════════════════════════════════════════════════ */}
          {phase === "opening" && (
            <motion.div
              key="apology-opening"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="flex w-full flex-col items-center space-y-8"
            >
              {/* Header */}
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                  className="font-serif text-xs uppercase tracking-[0.45em] text-[#B58A2B]"
                >
                  Something I Owe You
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: EASE }}
                  className="font-serif text-3xl sm:text-4xl text-[#6A2135] font-light"
                >
                  I'm Sorry, My Love.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                  className="font-serif text-xs italic text-[#2D2A26] tracking-wider"
                >
                  For the times I wasn't my best.
                </motion.p>
              </div>

              <div className="h-px w-12 bg-[#B58A2B]/30" />

              {/* Opening Letter Text */}
              <div className="space-y-6 text-left font-serif leading-relaxed text-[#2D2A26]/85 font-light text-sm sm:text-base">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                >
                  I know loving someone doesn't mean we never hurt each other.
                  And I know there have been moments when my words, my anger, or the way I handled things made you feel hurt. I'm sorry for those moments.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
                >
                  Not because I want to bring them back to your mind today... but because I want you to know that I remember them. I've thought about them. And I wish I had handled them differently.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.9, ease: EASE }}
                  className="pl-4 border-l border-[#B58A2B]/40 space-y-1.5 italic text-[#6A2135]/90 py-1"
                >
                  <p>You deserve patience when you're upset.</p>
                  <p>You deserve kindness when we disagree.</p>
                  <p>You deserve to feel loved even when we're angry at each other.</p>
                  <p className="not-italic text-[#2D2A26]/75 pt-1">
                    And I'm still learning how to be better for you.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 2.4, ease: EASE }}
                  className="font-serif italic text-[#6A2135] text-base sm:text-lg"
                >
                  So I wanted to say this properly: I'm sorry.
                </motion.p>
              </div>

              {/* Start moments button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8, ease: EASE }}
                className="pt-4"
              >
                <button
                  onClick={() => setPhase("moments")}
                  className="group inline-flex items-center gap-2 font-serif text-xs uppercase tracking-[0.3em] text-[#6A2135] hover:text-[#B58A2B] transition-colors cursor-pointer"
                >
                  <span>The moments I hold myself accountable for</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PHASE 2: INDIVIDUAL APOLOGY MOMENTS (One at a time)
             ═══════════════════════════════════════════════════════════════ */}
          {phase === "moments" && (
            <motion.div
              key="apology-moments-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex w-full flex-col items-center"
            >
              {/* Header Label & Index */}
              <div className="w-full flex items-center justify-between pb-6 border-b border-[#B58A2B]/20">
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#B58A2B]">
                  One moment I wish I could redo
                </p>
                <span className="font-serif text-xs tracking-widest text-[#2D2A26]/50">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(totalMoments).padStart(2, "0")}
                </span>
              </div>

              {/* Current Apology Entry (Seamless Private Letter Style) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentApology.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="w-full text-left py-8 space-y-6 min-h-[300px] flex flex-col justify-center"
                >
                  {/* Date & Context */}
                  <div className="space-y-1">
                    <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#B58A2B]">
                      {currentApology.date}
                    </p>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#6A2135] font-light">
                      {currentApology.context}
                    </h2>
                  </div>

                  {/* Incident Context */}
                  <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2D2A26]/80 font-light">
                    {currentApology.incident}
                  </p>

                  {/* Sincere Apology / Reflection */}
                  <div className="pl-4 border-l-2 border-[#B58A2B]/40 py-1">
                    <p className="font-serif text-sm sm:text-base leading-relaxed text-[#6A2135] italic font-light">
                      "{currentApology.apology}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Footer (Minimal, Quiet) */}
              <div className="w-full flex items-center justify-between pt-6 border-t border-[#B58A2B]/20">
                {currentIndex > 0 ? (
                  <button
                    onClick={handlePrev}
                    className="font-serif text-xs uppercase tracking-[0.25em] text-[#2D2A26]/60 hover:text-[#6A2135] transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  className="group inline-flex items-center gap-1.5 font-serif text-xs uppercase tracking-[0.25em] text-[#6A2135] hover:text-[#B58A2B] transition-colors font-medium cursor-pointer"
                >
                  <span>{currentIndex === totalMoments - 1 ? "Complete reflection" : "Next moment"}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PHASE 3: CLOSING MESSAGE (Peaceful, loving conclusion)
             ═══════════════════════════════════════════════════════════════ */}
          {phase === "closing" && (
            <motion.div
              key="apology-closing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="flex w-full flex-col items-center space-y-8"
            >
              {/* Emblem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B58A2B]/30"
              >
                <span className="text-xl text-[#B58A2B]">❀</span>
              </motion.div>

              {/* Closing Message */}
              <div className="space-y-6 text-left font-serif leading-relaxed text-[#2D2A26]/85 font-light text-sm sm:text-base">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                >
                  Those moments don't define us. They're simply moments I wish I had handled differently. What matters to me is what I do after them.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
                  className="italic text-[#6A2135]"
                >
                  I want to be someone who loves you with more patience. More understanding. More kindness. Not just today. Every day.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
                  className="space-y-1 pt-2 border-t border-[#B58A2B]/20"
                >
                  <p className="text-[#2D2A26]/80 font-normal">Thank you for staying.</p>
                  <p className="text-[#2D2A26]/80 font-normal">Thank you for loving me while I'm still learning.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2.0, ease: EASE }}
                  className="pt-2 text-right"
                >
                  <p className="font-serif italic text-base sm:text-lg text-[#6A2135]">
                    I'm sorry, Arshiya. Truly.
                  </p>
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#B58A2B] pt-2">
                    — Mehrab
                  </p>
                </motion.div>
              </div>

              {/* Continue to Letter Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isTransitioningOut ? 0 : 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5, ease: EASE }}
                className="pt-4"
              >
                <button
                  onClick={handleTransitionToLetter}
                  disabled={isTransitioningOut}
                  className="group inline-flex items-center gap-2 font-serif text-xs uppercase tracking-[0.3em] text-[#6A2135] hover:text-[#B58A2B] transition-colors cursor-pointer"
                >
                  <span>Continue to my letter</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">✦</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gentle Warm Light Transition Wash Out to Letter */}
      <AnimatePresence>
        {isTransitioningOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#FAFAFA] via-[#FFFDF8] to-[#FAFAFA]"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
