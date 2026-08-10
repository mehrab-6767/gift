import { motion, AnimatePresence } from "framer-motion";

/**
 * Transcript — sentence-by-sentence reveal, synced to audio time.
 *
 * Props:
 *   lines        — array of { time, text }
 *   currentTime  — current playback time in seconds
 *   isPlaying    — bool
 */
export default function Transcript({ lines, currentTime, isPlaying }) {
  // Which lines have been reached?
  const visibleLines = lines.filter((l) => currentTime >= l.time);
  const currentLineIndex = visibleLines.length - 1;

  if (visibleLines.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
      <AnimatePresence initial={false}>
        {visibleLines.map((line, i) => {
          const isCurrent = i === currentLineIndex;
          return (
            <motion.p
              key={line.time}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{
                opacity: isCurrent ? 1 : 0.38,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="font-serif text-center leading-relaxed"
              style={{
                fontSize: isCurrent ? "1.15rem" : "0.95rem",
                color: isCurrent ? "#FFFDF8" : "rgba(255,253,248,0.55)",
                fontStyle: "italic",
                fontWeight: isCurrent ? 400 : 300,
                transition: "font-size 0.5s ease, color 0.5s ease",
              }}
            >
              {line.text}
            </motion.p>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
