import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Waveform — animated bar equalizer, only pulses while playing.
 *
 * Props:
 *   isPlaying — bool
 *   barCount  — number of bars (default 28)
 */
export default function Waveform({ isPlaying, barCount = 28 }) {
  // Pre-generate stable random heights so bars don't re-randomize on every render
  const barsRef = useRef(
    Array.from({ length: barCount }, () => ({
      baseH: 4 + Math.random() * 14,
      maxH:  12 + Math.random() * 28,
      dur:   0.4 + Math.random() * 0.6,
      delay: Math.random() * 0.4,
    }))
  );

  return (
    <div
      className="flex items-center justify-center gap-[3px]"
      style={{ height: 48 }}
      aria-hidden
    >
      {barsRef.current.map((bar, i) => (
        <motion.div
          key={i}
          className="rounded-full flex-shrink-0"
          style={{
            width: 2.5,
            background: "rgba(212,175,55,0.65)",
          }}
          animate={
            isPlaying
              ? {
                  height: [bar.baseH, bar.maxH, bar.baseH],
                  opacity: [0.5, 1, 0.5],
                }
              : {
                  height: bar.baseH,
                  opacity: 0.25,
                }
          }
          transition={
            isPlaying
              ? {
                  duration: bar.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar.delay,
                }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  );
}
