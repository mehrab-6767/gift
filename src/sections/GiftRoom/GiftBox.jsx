import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftBox({ gift, index, isOpened, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUntying, setIsUntying] = useState(false);

  function handleClick() {
    if (isOpened) {
      onOpen(gift);
      return;
    }
    setIsUntying(true);
    setTimeout(() => {
      onOpen(gift);
      setIsUntying(false);
    }, 800);
  }

  // Floating idle delay based on index for natural wave effect
  const floatDelay = index * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="relative flex flex-col items-center select-none"
    >
      {/* Interactive 3D Gift Container */}
      <motion.div
        animate={
          isOpened
            ? { y: 0 }
            : {
                y: [0, -8, 0],
              }
        }
        transition={
          isOpened
            ? {}
            : {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              }
        }
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative h-44 w-44 sm:h-48 sm:w-48 [perspective:1000px] cursor-pointer group"
      >
        {/* Soft Table Surface Shadow */}
        <motion.div
          animate={
            isHovered
              ? { scale: 1.15, opacity: 0.35 }
              : { scale: 1, opacity: 0.25 }
          }
          className="absolute -bottom-4 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-[#2A150D] blur-md pointer-events-none transition-all duration-300"
        />

        {/* Gift Box Base */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className={`relative h-full w-full rounded-2xl bg-gradient-to-br ${gift.boxGradient} border border-[#D4AF37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.35)] flex items-center justify-center overflow-hidden transition-all duration-300`}
        >
          {/* Subtle Box Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />

          {/* Filigree Gold Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/50" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/50" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/50" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/50" />

          {/* Vertical Satin Ribbon */}
          <div
            className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 shadow-sm"
            style={{
              background: `linear-gradient(to right, ${gift.ribbonColor}, #FFF3B0, ${gift.ribbonColor})`,
            }}
          />

          {/* Horizontal Satin Ribbon */}
          <div
            className="absolute inset-x-0 top-1/2 h-9 -translate-y-1/2 shadow-sm"
            style={{
              background: `linear-gradient(to bottom, ${gift.ribbonColor}, #FFF3B0, ${gift.ribbonColor})`,
            }}
          />

          {/* Box Lid Animation */}
          <motion.div
            animate={
              isOpened
                ? { y: -50, rotateX: -35, opacity: 0.3 }
                : isUntying
                ? { y: -20, opacity: 0.8 }
                : { y: 0, rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-x-[-2px] top-[-4px] h-12 rounded-t-2xl bg-gradient-to-r from-[#6A2135] via-[#7d2940] to-[#541a29] border-b border-[#D4AF37]/60 z-20 flex items-center justify-center shadow-md"
          >
            {/* Ribbon Bow Knot */}
            <AnimatePresence>
              {!isOpened && !isUntying && (
                <motion.div
                  exit={{ scale: 1.4, opacity: 0 }}
                  className="relative flex items-center justify-center z-30"
                >
                  <div
                    className="h-10 w-10 rounded-full border border-[#FFFDF8] shadow-lg flex items-center justify-center text-xs font-serif"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #FFF3B0, ${gift.ribbonColor})`,
                      color: "#6A2135",
                    }}
                  >
                    ✦
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Soft Interior Glow when opening / opened */}
          {(isUntying || isOpened) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
              <div
                className="h-28 w-28 rounded-full blur-xl animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${gift.accentColor} 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          )}

          {/* Label when unopened vs opened */}
          <div className="absolute bottom-3 inset-x-0 z-30 text-center">
            {isOpened ? (
              <span className="font-serif text-[10px] uppercase tracking-widest text-[#FFFDF8] bg-[#6A2135]/80 px-2.5 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                Opened ✦
              </span>
            ) : (
              <span className="font-serif text-[10px] uppercase tracking-widest text-[#FFFDF8]/90 bg-[#2D2A26]/60 px-2.5 py-1 rounded-full backdrop-blur-sm group-hover:bg-[#6A2135] transition-colors">
                Gift 0{index + 1}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
