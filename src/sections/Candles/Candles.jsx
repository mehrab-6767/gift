import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const EASE = [0.22, 1, 0.36, 1];

// Candle colors for a luxury birthday cake palette
const CANDLE_COLORS = [
  { body: "linear-gradient(180deg, #FDE8E9 0%, #F5C6CB 100%)", stripe: "rgba(181,138,43,0.3)" },
  { body: "linear-gradient(180deg, #FFFDF8 0%, #F3EBDD 100%)", stripe: "rgba(106,33,53,0.25)" },
  { body: "linear-gradient(180deg, #FCE8D5 0%, #F3CEAA 100%)", stripe: "rgba(181,138,43,0.3)" },
  { body: "linear-gradient(180deg, #FDF2F4 0%, #F8D2D9 100%)", stripe: "rgba(106,33,53,0.25)" },
];

function ConfettiPiece({ index }) {
  const { x, y, rot, color, size, delay, dur } = useMemo(() => {
    const colors = ["#D4AF37", "#F5C6CB", "#FFFDF8", "#E6C687", "#C9687C", "#FFE4B5"];
    return {
      x: Math.random() * 94 + 3,
      y: -(Math.random() * 20 + 10),
      rot: Math.random() * 360,
      color: colors[index % colors.length],
      size: Math.random() * 7 + 5,
      delay: Math.random() * 0.8,
      dur: Math.random() * 2.5 + 3.2,
    };
  }, [index]);

  return (
    <motion.div
      initial={{
        top: `${y}%`,
        left: `${x}%`,
        opacity: 1,
        rotate: rot,
        scale: 0.8,
      }}
      animate={{
        top: ["0%", "105%"],
        left: [`${x}%`, `${x + (index % 2 === 0 ? 6 : -6)}%`],
        rotate: [rot, rot + 480],
        opacity: [1, 1, 0.2],
      }}
      transition={{
        duration: dur,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      className="pointer-events-none absolute"
      style={{
        width: `${size}px`,
        height: `${size * 1.4}px`,
        background: color,
        borderRadius: index % 3 === 0 ? "50%" : "2px",
        boxShadow: "0 0 8px rgba(212,175,55,0.3)",
      }}
    />
  );
}

function Candle({ index, isBlown, onBlow }) {
  const color = CANDLE_COLORS[index % CANDLE_COLORS.length];
  const [justBlown, setJustBlown] = useState(false);

  function handleClick() {
    if (!isBlown) {
      setJustBlown(true);
      onBlow(index);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col items-center cursor-pointer select-none px-1 py-1"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Flame / Smoke area */}
      <div className="relative h-12 w-8 flex items-center justify-center">
        <AnimatePresence>
          {!isBlown ? (
            <motion.div
              key="flame"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: [1, 1.08, 0.95, 1.04, 1],
                rotate: [-2, 2, -1, 3, 0],
                opacity: 1,
              }}
              exit={{ scale: [1, 1.3, 0], opacity: [1, 0.8, 0], y: -8 }}
              transition={{
                scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                exit: { duration: 0.4 },
              }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Golden Glow */}
              <div
                className="absolute h-14 w-14 rounded-full pointer-events-none blur-md"
                style={{
                  background: "radial-gradient(circle, rgba(255,190,50,0.6) 0%, rgba(212,175,55,0.2) 60%, transparent 80%)",
                }}
              />

              {/* Teardrop Flame Body */}
              <div
                className="h-6 w-3.5 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 50% 70%, #FFFFFF 0%, #FFE066 30%, #FF9900 70%, #E63900 100%)",
                  borderRadius: "50% 50% 35% 35% / 60% 60% 40% 40%",
                  boxShadow: "0 0 12px rgba(255,170,0,0.8), 0 0 4px rgba(255,255,255,0.9)",
                }}
              />

              {/* Inner White Flame Core */}
              <div
                className="absolute bottom-1.5 h-3 w-1.5 rounded-full bg-white/90 blur-[0.5px]"
                style={{ borderRadius: "50% 50% 40% 40%" }}
              />
            </motion.div>
          ) : (
            justBlown && (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -22, scale: 1.6, x: (index % 2 === 0 ? 4 : -4) }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="pointer-events-none absolute text-xs text-neutral-400 font-serif italic"
              >
                ☁
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Candle Wick */}
        <div
          className="absolute bottom-0 h-2.5 w-[1.5px]"
          style={{
            background: isBlown ? "#3A2A20" : "#221100",
            boxShadow: isBlown ? "0 -1px 2px rgba(255,100,0,0.4)" : "none",
          }}
        />
      </div>

      {/* Candle Body */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-16 w-4 sm:h-20 sm:w-5 rounded-t-sm shadow-md overflow-hidden transition-transform"
        style={{
          background: color.body,
          border: "1px solid rgba(181,138,43,0.25)",
        }}
      >
        {/* Subtle Candle Wax Stripe */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${color.stripe} 0, ${color.stripe} 3px, transparent 3px, transparent 8px)`,
          }}
        />

        {/* Number badge on candle (1..14) */}
        <div className="absolute bottom-1 inset-x-0 text-center font-serif text-[9px] font-semibold text-[#6A2135]/70 pointer-events-none">
          {index + 1}
        </div>
      </motion.div>
    </div>
  );
}

export default function Candles() {
  const { goTo } = useAppFlow();
  const [blownStates, setBlownStates] = useState(Array(14).fill(false));
  const [isAllBlown, setIsAllBlown] = useState(false);

  const blownCount = blownStates.filter(Boolean).length;
  const remainingCount = 14 - blownCount;

  function handleBlow(index) {
    setBlownStates((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  function handleBlowAll() {
    setBlownStates(Array(14).fill(true));
  }

  useEffect(() => {
    if (blownCount === 14 && !isAllBlown) {
      const t = setTimeout(() => setIsAllBlown(true), 400);
      return () => clearTimeout(t);
    }
  }, [blownCount, isAllBlown]);

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-8 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #FFFDF8 0%, #F7F3EB 60%, #ECE4D4 100%)",
      }}
    >
      {/* Ambient Warm Candlelight Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[120px] transition-opacity duration-1000"
        style={{
          background: isAllBlown
            ? "radial-gradient(circle, rgba(245,198,203,0.3) 0%, rgba(212,175,55,0.15) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(255,190,70,0.35) 0%, rgba(212,175,55,0.2) 60%, transparent 80%)",
        }}
      />

      {/* Light Confetti burst when all 14 candles are blown */}
      {isAllBlown && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {Array.from({ length: 48 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center space-y-6 sm:space-y-8">
        {/* Header Titles */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="space-y-2 px-2"
        >
          <p className="font-serif text-xs uppercase tracking-[0.45em] text-[#B58A2B]">
            A 14th Birthday Wish
          </p>

          <h1 className="font-serif text-2xl sm:text-4xl text-[#6A2135] font-light leading-tight">
            Blow the candles to continue
          </h1>

          <p className="font-serif text-xs sm:text-sm italic text-[#2D2A26]/75 tracking-wider">
            Tap the candles to blow them
          </p>
        </motion.div>

        {/* Interactive Candle Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 rounded-full border border-[#B58A2B]/30 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="text-xs text-[#B58A2B]">
            {isAllBlown ? "✨" : "🕯️"}
          </span>
          <span className="font-serif text-xs uppercase tracking-widest text-[#6A2135] font-medium">
            {isAllBlown
              ? "All 14 candles blown! ✨"
              : `${remainingCount} candle${remainingCount === 1 ? "" : "s"} remaining`}
          </span>
        </motion.div>

        {/* 14 Candles Cake Spread Platform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 flex flex-col items-center"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(250,246,238,0.7) 100%)",
            boxShadow: "0 20px 60px rgba(181,138,43,0.12), 0 4px 16px rgba(0,0,0,0.04)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          {/* Back Row (Candles 1 to 7) */}
          <div className="flex items-end justify-center gap-1.5 sm:gap-3.5 z-10">
            {Array.from({ length: 7 }).map((_, i) => (
              <Candle
                key={i}
                index={i}
                isBlown={blownStates[i]}
                onBlow={handleBlow}
              />
            ))}
          </div>

          {/* Cake Tier Divider / Platform */}
          <div
            className="w-full h-3 rounded-full my-2 relative z-20"
            style={{
              background: "linear-gradient(90deg, #F5E6CC 0%, #D4AF37 50%, #F5E6CC 100%)",
              boxShadow: "0 2px 8px rgba(181,138,43,0.25)",
            }}
          />

          {/* Front Row (Candles 8 to 14) */}
          <div className="flex items-end justify-center gap-1.5 sm:gap-3.5 z-30">
            {Array.from({ length: 7 }).map((_, i) => (
              <Candle
                key={i + 7}
                index={i + 7}
                isBlown={blownStates[i + 7]}
                onBlow={handleBlow}
              />
            ))}
          </div>

          {/* Cake Base Rim */}
          <div
            className="w-4/5 h-4 rounded-b-2xl mt-1"
            style={{
              background: "linear-gradient(180deg, #F3ECE0 0%, #E2D5C0 100%)",
              border: "1px solid rgba(181,138,43,0.2)",
            }}
          />
        </motion.div>

        {/* Quick Helper Button: "Blow all at once ✨" (if not all blown) */}
        {!isAllBlown && blownCount > 0 && blownCount < 14 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBlowAll}
            className="font-serif text-[11px] uppercase tracking-widest text-[#B58A2B] hover:text-[#6A2135] transition-colors cursor-pointer"
          >
            Blow all remaining candles ✨
          </motion.button>
        )}

        {/* Unlocked Continue Button Area */}
        <div className="h-16 flex items-center justify-center pt-2">
          <AnimatePresence>
            {isAllBlown && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-col items-center gap-3"
              >
                <p className="font-serif text-sm italic text-[#6A2135] font-light">
                  "May all 14 of your birthday wishes come true, my love."
                </p>

                <motion.button
                  onClick={() => goTo(FLOW.ROTATE_LANDSCAPE)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-10 py-3.5 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/50 font-serif text-xs uppercase tracking-widest shadow-xl hover:bg-[#8b2b46] transition-all cursor-pointer"
                >
                  Continue →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
