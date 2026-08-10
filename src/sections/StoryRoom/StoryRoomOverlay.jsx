import { motion } from "framer-motion";

function StoryRoomOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="absolute inset-x-0 bottom-10 z-20 mx-auto flex max-w-xl justify-center px-6"
    >
      <div className="rounded-[2rem] border border-white/50 bg-white/70 px-8 py-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--burgundy)]/70">
          Story Room
        </p>
        <h2 className="mt-3 font-display text-3xl text-[var(--burgundy)]">
          A quiet place for your memories
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--text)]">
          This room is ready for your next chapter.
        </p>
      </div>
    </motion.div>
  );
}

export default StoryRoomOverlay;
