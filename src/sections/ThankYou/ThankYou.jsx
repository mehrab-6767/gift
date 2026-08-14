import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const EASE = [0.22, 1, 0.36, 1];

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  dur: 3 + Math.random() * 5,
  delay: Math.random() * 4,
}));

function AuroraGlow({ color, top, width, dur, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${top}%`,
        left: "-10%",
        width: `${width}%`,
        height: "200px",
        background: `linear-gradient(90deg, transparent, ${color}33 30%, ${color}66 50%, ${color}33 70%, transparent)`,
        borderRadius: "50%",
        filter: "blur(60px)",
        transformOrigin: "center",
      }}
      animate={{
        x: ["-10%", "15%", "-10%"],
        scaleY: [1, 1.25, 1],
        opacity: [0.25, 0.6, 0.25],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

const REVEALS = [
  { id: "intro", delay: 0 },
  { id: "title", delay: 1800 },
  { id: "p1", delay: 4200 },
  { id: "p2", delay: 6200 },
  { id: "p3", delay: 8600 },
  { id: "you", delay: 10000 },
  { id: "p4", delay: 12400 },
  { id: "p5", delay: 14400 },
  { id: "bday", delay: 17200 },
  { id: "sign", delay: 20000 },
  { id: "cta", delay: 23500 },
];

function FadeInText({ children, delay, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.4, delay: delay / 1000, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function ThankYou() {
  const { goTo } = useAppFlow();
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timers = REVEALS.map((r) =>
      setTimeout(() => {
        setVisibleIds((prev) => new Set([...prev, r.id]));
      }, r.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleContinue = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => goTo(FLOW.ENDING), 1200);
  }, [transitioning, goTo]);

  const canContinue = visibleIds.has("cta");

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #1a0a0e 0%, #0e0508 50%, #040203 100%)",
      }}
      onClick={canContinue ? handleContinue : undefined}
    >
      {/* Aurora glow bands */}
      <AuroraGlow color="#6A2135" top={20} width={110} dur={16} delay={0} />
      <AuroraGlow color="#D4AF37" top={45} width={90} dur={20} delay={4} />
      <AuroraGlow color="#4a1580" top={70} width={100} dur={22} delay={8} />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              top: `${s.top}%`,
              left: `${s.left}%`,
            }}
            animate={{ opacity: [0.1, 0.85, 0.1] }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-7 max-w-lg">
        {visibleIds.has("intro") && (
          <FadeInText delay={0} className="font-serif text-xs uppercase tracking-[0.55em] text-[#D4AF37]/80">
            One Last Thing...
          </FadeInText>
        )}

        {visibleIds.has("title") && (
          <FadeInText
            delay={0}
            className="font-serif italic font-light text-[#FFFDF8]"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.3)",
            }}
          >
            Thank You.
          </FadeInText>
        )}

        {visibleIds.has("p1") && (
          <FadeInText delay={0} className="font-serif text-base sm:text-lg italic text-[#FFFDF8]/85 leading-relaxed font-light">
            Thank you for taking this little journey with me.
          </FadeInText>
        )}

        {visibleIds.has("p2") && (
          <FadeInText delay={0} className="font-serif text-base sm:text-lg italic text-[#FFFDF8]/85 leading-relaxed font-light">
            Every page...<br />
            Every animation...<br />
            Every memory...<br />
            Every tiny detail...
          </FadeInText>
        )}

        {visibleIds.has("p3") && (
          <FadeInText delay={0} className="font-serif text-base sm:text-lg italic text-[#FFFDF8]/85 leading-relaxed font-light">
            ...was made with only one person in mind.
          </FadeInText>
        )}

        {visibleIds.has("you") && (
          <FadeInText
            delay={0}
            className="font-serif italic text-3xl sm:text-4xl text-[#D4AF37] font-normal pt-2"
            style={{ textShadow: "0 0 30px rgba(212,175,55,0.6)" }}
          >
            You.
          </FadeInText>
        )}

        {visibleIds.has("p4") && (
          <FadeInText delay={0} className="font-serif text-base sm:text-lg italic text-[#FFFDF8]/80 leading-relaxed font-light pt-3">
            I know this isn't the biggest gift in the world.
          </FadeInText>
        )}

        {visibleIds.has("p5") && (
          <FadeInText delay={0} className="font-serif text-base sm:text-lg italic text-[#FFFDF8]/80 leading-relaxed font-light">
            But I hope it reminds you just how deeply you're loved.
          </FadeInText>
        )}

        {visibleIds.has("bday") && (
          <FadeInText
            delay={0}
            className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] pt-5"
            style={{ textShadow: "0 0 25px rgba(212,175,55,0.4)" }}
          >
            Happy 14th Birthday, Arshiya.
          </FadeInText>
        )}

        {visibleIds.has("sign") && (
          <FadeInText delay={0} className="flex flex-col items-center gap-1 pt-3">
            <span className="font-serif text-sm italic text-[#FFFDF8]/60 tracking-wider">
              With all my love,
            </span>
            <span className="font-serif text-sm text-[#D4AF37]/90 tracking-wider font-light">
              — Mehrab
            </span>
          </FadeInText>
        )}

        {visibleIds.has("cta") && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={(e) => {
              e.stopPropagation();
              handleContinue();
            }}
            className="font-serif text-[11px] uppercase tracking-[0.45em] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors cursor-pointer mt-6"
          >
            Continue to the ending →
          </motion.button>
        )}
      </div>

      {/* Cinematic dark cross-fade transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="ty-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(26,10,14,1) 0%, rgba(4,2,3,1) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
