import { motion } from "framer-motion";

function IntroOverlay({ onBegin }) {
  return (
    <motion.section
      className="fixed inset-0 flex items-center justify-center bg-[var(--background)] px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">

        <motion.h1
          className="font-display text-5xl text-[var(--burgundy)]"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          The Story of Arshiya
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-sm text-lg text-[var(--text)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          A journey written with love,
          <br />
          one page at a time.
        </motion.p>

        <motion.button
          onClick={onBegin}
          className="mt-12 rounded-full border border-[var(--gold)] px-8 py-3 text-[var(--burgundy)] transition hover:bg-[var(--gold)] hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Tap to Begin
        </motion.button>

      </div>
    </motion.section>
  );
}

export default IntroOverlay;