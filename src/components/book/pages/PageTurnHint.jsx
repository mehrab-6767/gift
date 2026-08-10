import { AnimatePresence, motion } from "framer-motion";

import { useBook } from "../BookContext";
import { BOOK_STATE } from "../bookState";

function PageTurnHint() {
  const { bookState, hasTurnedPage } = useBook();

  const visible =
    bookState === BOOK_STATE.OPEN &&
    !hasTurnedPage;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .45 }}
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-black/40
            px-5
            py-2
            text-xs
            tracking-wide
            text-white
            backdrop-blur-md
            pointer-events-none
            z-50
          "
        >
          ✨ Tap the page to continue
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageTurnHint;