import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AuroraBand({ color, top, width, dur, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${top}%`,
        left: "-10%",
        width: `${width}%`,
        height: "180px",
        background: `linear-gradient(90deg, transparent, ${color}44 30%, ${color}77 50%, ${color}44 70%, transparent)`,
        borderRadius: "50%",
        filter: "blur(50px)",
        transformOrigin: "center",
      }}
      animate={{
        x: ["-10%", "20%", "-10%"],
        scaleY: [1, 1.3, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function YearCounter({ visible }) {
  const [count, setCount] = useState(0);
  const target = 14; // 14th birthday

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCount(i);
      if (i >= target) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [visible, target]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-1 my-2"
        >
          <motion.span
            className="font-serif font-light"
            style={{
              fontSize: "clamp(4.5rem, 12vw, 8rem)",
              color: "#D4AF37",
              lineHeight: 1,
            }}
            animate={{
              textShadow: [
                "0 0 20px rgba(212,175,55,0.3)",
                "0 0 50px rgba(212,175,55,0.7)",
                "0 0 20px rgba(212,175,55,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {count}
          </motion.span>
          <p className="font-serif text-xs uppercase tracking-[0.5em] text-[#D4AF37]/80">
            Years of Arshiya
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FINAL_MESSAGES = [
  {
    id: "a",
    text: "You are so deeply, endlessly loved.",
    size: "clamp(1.5rem, 3.5vw, 2.4rem)",
    color: "#FFFDF8",
    delay: 0.5,
  },
  {
    id: "b",
    text: "Not just today on your birthday, but every single second across every mile.",
    size: "clamp(1.1rem, 2.5vw, 1.6rem)",
    color: "rgba(255,253,248,0.75)",
    delay: 3.0,
  },
  {
    id: "c",
    text: "Happy 14th Birthday, Arshiya.",
    size: "clamp(2rem, 5vw, 3.8rem)",
    color: "#D4AF37",
    delay: 5.8,
  },
];

function EpilogueOverlay() {
  const [epiPhase, setEpiPhase] = useState(-1); // -1=initial white wash, 0=texts, ...

  useEffect(() => {
    const t0 = setTimeout(() => setEpiPhase(0), 2000);
    const t1 = setTimeout(() => setEpiPhase(1), 5000);
    const t2 = setTimeout(() => setEpiPhase(2), 8000);
    const t3 = setTimeout(() => setEpiPhase(3), 9500);
    const t4 = setTimeout(() => setEpiPhase(4), 10500);
    const t5 = setTimeout(() => setEpiPhase(5), 11500);
    const t6 = setTimeout(() => setEpiPhase(6), 13000);

    return () => {
      [t0, t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -10, 0] }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        {epiPhase >= 0 && (
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic font-light text-[#2D2A26]"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
          >
            The End.
          </motion.h1>
        )}

        {epiPhase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col items-center gap-1"
          >
            <p className="font-serif italic text-lg text-[#2D2A26]/70">Or perhaps...</p>
            <p className="font-serif italic text-lg text-[#2D2A26]/70">just the beginning.</p>
          </motion.div>
        )}

        {epiPhase >= 2 && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "3rem" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-[#D4AF37]/40 mt-8 mb-8"
          />
        )}

        {epiPhase >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm uppercase tracking-[0.3em] text-[#B58A2B] mb-3"
          >
            Gopalganj ↔ Dhaka
          </motion.p>
        )}

        {epiPhase >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-base italic text-[#2D2A26]/80 mb-2"
          >
            150 km today.
          </motion.p>
        )}

        {epiPhase >= 5 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-base italic text-[#6A2135] mb-8"
          >
            Hopefully 0 someday.
          </motion.p>
        )}

        {epiPhase >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl"
          >
            ❤️
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Ending() {
  const [phase, setPhase] = useState(0); // 0=counter, 1=messages, 2=finale

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2800);
    const t2 = setTimeout(() => setPhase(2), 9000);
    const t3 = setTimeout(() => setPhase(3), 22000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden select-none px-4 py-12"
      style={{
        background: "radial-gradient(ellipse at 50% 100%, #1a0a06 0%, #0d0507 50%, #030203 100%)",
      }}
    >
      {/* Aurora bands */}
      <AuroraBand color="#6A2135" top={15} width={120} dur={14} delay={0} />
      <AuroraBand color="#D4AF37" top={40} width={90} dur={18} delay={4} />
      <AuroraBand color="#4a1580" top={65} width={110} dur={22} delay={7} />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 90 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.85, 0.1] }}
            transition={{ duration: 2.5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-10 px-4 max-w-2xl">
        {/* Phase 0 — Counter */}
        <YearCounter visible={phase >= 0} />

        {/* Phase 1 — Messages */}
        {phase >= 1 && (
          <div className="flex flex-col items-center gap-6 my-2">
            {FINAL_MESSAGES.map((msg) => (
              <motion.p
                key={msg.id}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4, delay: msg.delay, ease: "easeOut" }}
                className="font-serif italic text-center leading-relaxed"
                style={{ fontSize: msg.size, color: msg.color }}
              >
                {msg.text}
              </motion.p>
            ))}
          </div>
        )}

        {/* Phase 2 — Finale Seal & Signature */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 pt-4"
          >
            {/* Gold Wax Seal Monogram */}
            <div
              className="relative h-28 w-28 rounded-full flex items-center justify-center border border-[#FFFDF8]/30"
              style={{
                background: "radial-gradient(circle at 38% 38%, #ffe680, #D4AF37 55%, #8a6200)",
                boxShadow:
                  "0 0 60px rgba(212,175,55,0.4), 0 0 120px rgba(212,175,55,0.15), inset 0 2px 0 rgba(255,255,200,0.5)",
              }}
            >
              <div className="flex flex-col items-center">
                <span className="font-serif text-sm font-bold text-[#3a1f00] tracking-widest">
                  A & M
                </span>
                <span className="font-serif text-[9px] uppercase tracking-[0.3em] text-[#3a1f00]/80 mt-0.5">
                  Forever
                </span>
              </div>
            </div>

            {/* Final Personal Message */}
            <div className="space-y-2 max-w-lg flex flex-col items-center">
              <p className="font-serif text-base sm:text-lg text-[#FFFDF8] italic font-light leading-relaxed">
                "Thank you for being the most beautiful chapter of my life."
              </p>
              <p className="font-serif text-lg text-[#D4AF37] italic font-medium">
                I love you.
              </p>
              <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#FFFDF8]/60 pt-2 pb-8">
                — Mehrab
              </p>
              
              {/* The End Note */}
              <p className="font-serif text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]/40 pt-12">
                The end of the gift
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Phase 3 — Epilogue */}
      {phase >= 3 && <EpilogueOverlay />}
    </main>
  );
}