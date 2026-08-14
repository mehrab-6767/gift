import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";
import AudioPlayer from "./AudioPlayer";
import Transcript from "./Transcript";
import { TRANSCRIPT } from "./transcriptData";

/* ── Floating dust — very subtle, never distracting ───────────────────── */
const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 1 + Math.random() * 2,
  dur: 7 + Math.random() * 6,
  delay: Math.random() * 4,
}));

export default function VoiceMessageScene() {
  const { goTo } = useAppFlow();

  const [currentTime, setCurrentTime] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  /* Show "Skip" after 6 seconds of the scene being open */
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 6000);
    return () => clearTimeout(t);
  }, []);

  /* After audio ends, show "Continue" after 2-second pause */
  const handleAudioEnded = useCallback(() => {
    setAudioEnded(true);
    setTimeout(() => setShowContinue(true), 2000);
  }, []);

  /* Transition to Thank You */
  function handleContinue() {
    setTransitioning(true);
    setTimeout(() => goTo(FLOW.THANK_YOU), 1600);
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #160d1c 0%, #0b0810 50%, #050306 100%)",
      }}
    >
      {/* ── Dust particles ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {DUST.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-[#D4AF37]/20"
            style={{
              width: d.size,
              height: d.size,
              top: `${d.top}%`,
              left: `${d.left}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.08, 0.35, 0.08] }}
            transition={{
              duration: d.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
          />
        ))}
      </div>

      {/* ── Warm ambient glow ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[140px]"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, #6A2135 60%, transparent 80%)" }}
      />

      {/* ── Scene content ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="relative z-10 flex flex-col items-center gap-10 text-center w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="font-serif text-xs uppercase tracking-[0.55em] text-[#B58A2B]/70">
            One last thing...
          </p>
          <p className="font-serif text-lg sm:text-xl italic font-light text-[#FFFDF8]/75 leading-relaxed max-w-xs mx-auto">
            "Some feelings are simply too difficult to write honestly."
          </p>
          <div className="h-px w-10 bg-[#D4AF37]/25 mx-auto" />
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <AudioPlayer
            onTimeUpdate={setCurrentTime}
            onEnded={handleAudioEnded}
          />
        </motion.div>

        {/* Live Transcript */}
        <AnimatePresence>
          {currentTime > 0 && (
            <motion.div
              key="transcript"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <Transcript
                lines={TRANSCRIPT}
                currentTime={currentTime}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button — after audio ends */}
        <AnimatePresence>
          {showContinue && (
            <motion.button
              key="continue-btn"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              onClick={handleContinue}
              className="px-10 py-4 rounded-full border border-[#D4AF37]/35 font-serif text-xs uppercase tracking-widest text-[#D4AF37]/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all cursor-pointer"
              style={{
                background: "rgba(212,175,55,0.05)",
                boxShadow: "0 0 30px rgba(212,175,55,0.06)",
              }}
            >
              Continue to the last thing ✦
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Skip button — subtle, appears after 6s */}
      <AnimatePresence>
        {showSkip && !showContinue && (
          <motion.button
            key="skip-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleContinue}
            className="absolute bottom-8 right-8 font-serif text-[11px] uppercase tracking-[0.35em] text-[#FFFDF8]/25 hover:text-[#FFFDF8]/55 transition-colors cursor-pointer"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>

      {/* Warm-light fade-out overlay on transition */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="fade-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,250,240,1) 0%, rgba(247,243,236,1) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
