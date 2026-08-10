import { motion } from "framer-motion";
import { useEffect } from "react";

import CoverTitle from "./CoverTitle";

import { useBook } from "../BookContext";
import { BOOK_STATE } from "../bookState";

function FrontCover() {
  const { bookState, setBookState } = useBook();

  function handleClick() {
    if (bookState === BOOK_STATE.CLOSED) {
      setBookState(BOOK_STATE.PRESSING);
    }
  }

  useEffect(() => {
    let timer;

    if (bookState === BOOK_STATE.PRESSING) {
      timer = setTimeout(() => {
        setBookState(BOOK_STATE.LIFTING);
      }, 140);
    }

    if (bookState === BOOK_STATE.LIFTING) {
      timer = setTimeout(() => {
        setBookState(BOOK_STATE.OPENING);
      }, 260);
    }

    return () => clearTimeout(timer);
  }, [bookState, setBookState]);

  return (
    <motion.div
      onClick={handleClick}
      className="
        absolute
        right-[-2px]
        top-0
        h-full
        w-1/2
        overflow-hidden
        rounded-r-[18px]
        border-2
        border-[#B58A2B]/60
        cursor-pointer
        bg-gradient-to-br
        from-[#7b2940]
        via-[#6A2135]
        to-[#481523]
        shadow-[0_30px_70px_rgba(0,0,0,.35),-10px_0_20px_rgba(0,0,0,.2)]
        select-none
      "
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateY:
          bookState === BOOK_STATE.OPENING ||
          bookState === BOOK_STATE.OPEN
            ? -180
            : 0,

        y:
          bookState === BOOK_STATE.LIFTING
            ? -10
            : 0,

        scale:
          bookState === BOOK_STATE.PRESSING
            ? 0.988
            : 1,
      }}
      transition={{
        rotateY: {
          duration: 1.8,
          ease: [0.25, 0.1, 0.25, 1],
        },
        y: {
          duration: 0.28,
        },
        scale: {
          duration: 0.12,
        },
      }}
      onAnimationComplete={() => {
        if (bookState === BOOK_STATE.OPENING) {
          setBookState(BOOK_STATE.OPEN);
        }
      }}
    >
      {/* Handcrafted organic leather grain texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 1px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Gold metallic corner guards */}
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#B58A2B] rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#B58A2B] rounded-br-lg pointer-events-none" />

      {/* Soft cover lighting sheen */}
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-2/5
          bg-gradient-to-r
          from-white/15
          via-white/5
          to-transparent
          pointer-events-none
        "
      />

      {/* Deep spine crease shadow */}
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-[16px]
          bg-gradient-to-r
          from-black/40
          to-transparent
          pointer-events-none
        "
      />

      {/* Double gold foil filigree border */}
      <div
        className="
          absolute
          inset-4
          rounded-[12px]
          border
          border-[#B58A2B]/40
          pointer-events-none
        "
      />
      <div
        className="
          absolute
          inset-5
          rounded-[10px]
          border
          border-[#B58A2B]/20
          pointer-events-none
        "
      />

      {/* Cover content */}
      <CoverTitle />
    </motion.div>
  );
}

export default FrontCover;