import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const DREAMS = [
  {
    id: 1,
    icon: "✦",
    title: "The Day We Close The Distance",
    desc: "Standing right in front of each other — no screens, no distance between us, just a quiet embrace that makes time stop. Inshaallah that day will come in 2027, and we'll finally meet.",
    tag: "2027 InshaAllah",
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.25)",
  },
  {
    id: 2,
    icon: "❀",
    title: "Walking Together",
    desc: "Slow evening walks through calm roads, holding hands, talking about everything, staring at your ocean eyes and nothing at all.",
    tag: "Side by Side",
    color: "#F0A8BF",
    glow: "rgba(240,168,191,0.25)",
  },
  {
    id: 3,
    icon: "✵",
    title: "Watching Sunsets",
    desc: "Sitting side by side watching the sky change colors, knowing we don't have to say goodbye when the sun goes down.",
    tag: "No More Goodbyes",
    color: "#F4C478",
    glow: "rgba(244,196,120,0.25)",
  },
  {
    id: 4,
    icon: "✒",
    title: "Every Single Birthday",
    desc: "Celebrating your 14th birthday today, and being right by your side for every milestone year that follows.",
    tag: "Year After Year",
    color: "#95E0BE",
    glow: "rgba(149,224,190,0.25)",
  },
  {
    id: 5,
    icon: "⚜",
    title: "Building Our World",
    desc: "Marrying each other, creating a life filled with laughter, joy, and a warmth that belongs only to us, and also to the mini us hopefully :).",
    tag: "Our Lifetime",
    color: "#A8BEED",
    glow: "rgba(168,190,237,0.25)",
  },
  {
    id: 6,
    icon: "♾",
    title: "Growing Old Together",
    desc: "Looking back years from now at where we started, knowing every mile and every promise was worth it.",
    tag: "Always & Forever",
    color: "#D5A5F5",
    glow: "rgba(213,165,245,0.25)",
  },
];

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.8,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 4,
}));

export default function Future() {
  const { goTo } = useAppFlow();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedDream = DREAMS[selectedIdx];

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-10 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 20%, #1a0b28 0%, #0d0617 50%, #05020a 100%)",
      }}
    >
      {/* Background Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Cosmic Nebula Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${selectedDream.color} 0%, #6A2135 60%, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 text-center my-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-2"
        >
          <p className="font-serif text-xs uppercase tracking-[0.55em] text-[#D5A5F5]/80">
            Written in the Stars
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl italic font-light text-[#FFF8FF]">
            Our Future Roadmap
          </h1>
          <p className="font-serif text-xs italic text-[#FFF8FF]/60 max-w-md mx-auto">
            "Tap through our future chapters to explore every dream of ours."
          </p>
        </motion.div>

        {/* Interactive Constellation Node Stepper (Horizontal Timeline) */}
        <div className="relative w-full max-w-2xl px-2 py-4 flex items-center justify-between">
          {/* Connecting Constellation Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D5A5F5]/40 to-[#D4AF37]/20 z-0" />
          
          {DREAMS.map((dream, i) => {
            const isSelected = i === selectedIdx;
            return (
              <button
                key={dream.id}
                onClick={() => setSelectedIdx(i)}
                className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    boxShadow: isSelected
                      ? `0 0 25px ${dream.color}`
                      : "0 0 0px transparent",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#180b28] border-white text-white"
                      : "bg-[#0d0617]/80 border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white"
                  }`}
                  style={{
                    borderColor: isSelected ? dream.color : undefined,
                  }}
                >
                  <span className="font-serif text-sm sm:text-base">{dream.icon}</span>
                </motion.div>
                
                <span
                  className="font-serif text-[10px] uppercase tracking-wider hidden sm:block transition-colors"
                  style={{
                    color: isSelected ? dream.color : "rgba(255,248,255,0.4)",
                  }}
                >
                  0{dream.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Glassmorphic Dream Card */}
        <div className="relative w-full max-w-xl min-h-[260px] sm:min-h-[280px] rounded-3xl p-8 sm:p-10 border border-white/15 bg-white/[0.05] backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
          {/* Glass Highlight */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDream.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col gap-5 text-left my-auto"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span
                  className="font-serif text-[11px] uppercase tracking-[0.35em] font-medium"
                  style={{ color: selectedDream.color }}
                >
                  Chapter 0{selectedDream.id} • {selectedDream.tag}
                </span>
                <span className="font-serif text-xs italic text-white/40">
                  {selectedDream.id} of {DREAMS.length}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FFF8FF] italic">
                {selectedDream.title}
              </h2>

              {/* Description */}
              <p className="font-serif text-sm sm:text-base leading-relaxed text-[#FFFDF8]/85 font-light italic">
                "{selectedDream.desc}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Controls inside Card */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-4">
            <button
              onClick={() => setSelectedIdx((prev) => Math.max(0, prev - 1))}
              disabled={selectedIdx === 0}
              className={`font-serif text-xs uppercase tracking-widest transition-all cursor-pointer ${
                selectedIdx === 0
                  ? "opacity-20 pointer-events-none text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              ← Prev
            </button>

            {selectedIdx < DREAMS.length - 1 ? (
              <button
                onClick={() => setSelectedIdx((prev) => Math.min(DREAMS.length - 1, prev + 1))}
                className="font-serif text-xs uppercase tracking-widest text-[#D5A5F5] hover:text-white font-medium transition-colors cursor-pointer"
              >
                Next Chapter →
              </button>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => goTo(FLOW.VOICE_MESSAGE)}
                className="px-6 py-2.5 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/50 font-serif text-xs uppercase tracking-widest hover:bg-[#8b2b46] transition-all cursor-pointer shadow-lg"
              >
                One Last Promise ✦
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}