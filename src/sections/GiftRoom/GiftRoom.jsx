import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";
import { GIFTS } from "../../data/giftData";
import GiftBox from "./GiftBox";
import GiftRevealModal from "./GiftRevealModal";
import FinalGiftReveal from "./FinalGiftReveal";

/*
  Sequential state machine:
  ─────────────────────────
  phase: "intro"         → Intro text visible, user reads the message
  phase: "gifting"       → One gift at a time: currentGiftIndex tracks which one
  phase: "finalWait"     → All 6 opened, 2-second pause before final box rises
  phase: "finalGift"     → The special 7th mystery box + letter reveal
  phase: "transitioning" → Fade-out into next scene
*/

export default function GiftRoom() {
  const { goTo } = useAppFlow();

  const [phase, setPhase] = useState("intro");
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [openedGiftIds, setOpenedGiftIds] = useState(new Set());
  const [activeReveal, setActiveReveal] = useState(null); // gift being shown in modal

  const currentGift = GIFTS[currentGiftIndex];
  const allSixOpened = openedGiftIds.size === GIFTS.length;

  /* ── Intro → first gift ─────────────────────────────── */
  function handleIntroFinished() {
    setPhase("gifting");
  }

  /* ── Open a gift box ────────────────────────────────── */
  function handleOpenGift(gift) {
    setOpenedGiftIds((prev) => new Set(prev).add(gift.id));
    setActiveReveal(gift);
  }

  /* ── Close the reveal modal ─────────────────────────── */
  function handleCloseModal() {
    setActiveReveal(null);

    // After closing, check if we should advance
    if (currentGiftIndex < GIFTS.length - 1) {
      // Show next gift after a short beat
      setTimeout(() => {
        setCurrentGiftIndex((prev) => prev + 1);
      }, 600);
    } else if (!allSixOpened) {
      // The last regular gift was just opened but set hasn't updated yet
      // (it updates above in handleOpenGift, so allSixOpened will be true next render)
      setTimeout(() => {
        setPhase("finalWait");
        setTimeout(() => setPhase("finalGift"), 2000);
      }, 600);
    } else {
      // Already all opened, transition to final
      setTimeout(() => {
        setPhase("finalWait");
        setTimeout(() => setPhase("finalGift"), 2000);
      }, 600);
    }
  }

  /* ── Final gift letter finished → next scene ────────── */
  const handleFinalFinished = useCallback(() => {
    setPhase("transitioning");
    setTimeout(() => goTo(FLOW.DISTANCE), 2500);
  }, [goTo]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] px-4 py-12 select-none">

      {/* ── Room Ambience Layer ── */}
      <RoomAmbience />

      {/* ── Main Content ── */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center gap-8"
      >

        {/* ── Phase: INTRO ── */}
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-8 py-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="space-y-3"
              >
                <p className="font-serif text-xs uppercase tracking-[0.45em] text-[#B58A2B]">
                  A Room Full of Surprises
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl text-[#6A2135] italic font-normal">
                  Some Virtual Gifts For You
                </h1>
              </motion.div>

              {/* The exact intro message — appears with slow stagger */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="max-w-lg px-6"
              >
                <p className="font-serif text-base sm:text-lg text-[#2D2A26]/85 leading-relaxed italic font-light">
                  "Here are some gifts i wish i couldve given you in real life, but in sha allah one day ill give them to you. For now, i hope your cute eyes take a look at these virtual ones"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <div className="h-px w-12 bg-[#D4AF37]/40 mx-auto mb-6" />
                <button
                  onClick={handleIntroFinished}
                  className="px-10 py-4 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/40 font-serif text-xs uppercase tracking-widest shadow-xl hover:bg-[#8b2b46] transition-all duration-300 cursor-pointer"
                >
                  Open Your Gifts ✦
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Phase: GIFTING (sequential one-at-a-time) ── */}
        <AnimatePresence mode="wait">
          {phase === "gifting" && currentGift && (
            <motion.div
              key={`gift-${currentGift.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 py-8"
            >
              {/* Progress indicator */}
              <div className="flex items-center gap-2">
                {GIFTS.map((g, i) => (
                  <div
                    key={g.id}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === currentGiftIndex ? 20 : 6,
                      height: 6,
                      background:
                        i < currentGiftIndex
                          ? "#D4AF37"
                          : i === currentGiftIndex
                          ? "#6A2135"
                          : "rgba(181,138,43,0.25)",
                    }}
                  />
                ))}
              </div>

              <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#B58A2B]">
                Present {currentGiftIndex + 1} of {GIFTS.length}
              </p>

              {/* Single Gift Box */}
              <GiftBox
                gift={currentGift}
                index={0}
                isOpened={openedGiftIds.has(currentGift.id)}
                onOpen={handleOpenGift}
              />

              {!openedGiftIds.has(currentGift.id) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-serif text-xs italic text-[#6A2135]/70"
                >
                  Tap the gift to unwrap
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Phase: FINAL WAIT ── */}
        {phase === "finalWait" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-16"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1 w-1 rounded-full bg-[#D4AF37]"
            />
            <p className="font-serif text-xs italic text-[#B58A2B]/60">
              Wait…
            </p>
          </motion.div>
        )}

        {/* ── Phase: FINAL GIFT ── */}
        {phase === "finalGift" && (
          <FinalGiftReveal visible onFinished={handleFinalFinished} />
        )}

        {/* ── Phase: TRANSITIONING ── */}
        {phase === "transitioning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#FAFAFA]"
          />
        )}
      </motion.div>

      {/* ── Gift Reveal Modal (overlays everything) ── */}
      {activeReveal && (
        <GiftRevealModal gift={activeReveal} onClose={handleCloseModal} />
      )}
    </main>
  );
}

/* ── Room Ambience (extracted for clarity) ──────────────────────────────── */
function RoomAmbience() {
  return (
    <>
      {/* Warm gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(180deg, rgba(250,250,250,0.2) 0%, rgba(240,240,240,0.4) 60%, rgba(210,210,210,0.5) 100%)",
        }}
      />

      {/* Wooden floor planks */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[45vh] opacity-[0.07]"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #3a1c12, #3a1c12 120px, #26110a 121px, #26110a 240px)",
          transform: "perspective(600px) rotateX(45deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Golden sunlight rays */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[700px] w-[700px] rotate-45 opacity-35 blur-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,250,250,0.6) 40%, rgba(250,250,250,0) 80%)",
        }}
      />

      {/* Floating dust particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#B58A2B]/25"
            style={{
              width: Math.random() * 3 + 1.5 + "px",
              height: Math.random() * 3 + 1.5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.65, 0.15] }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </>
  );
}