import { useEffect } from "react";
import { motion } from "framer-motion";
import useOrientation from "../../hooks/useOrientation";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const TRANSITION_DELAY = 1000;

function PhoneMockup({ orientation }) {
  return (
    <motion.div
      className="relative h-44 w-24 rounded-[32px] border-[5px] border-[#2d2a26] bg-[#111] shadow-2xl"
      animate={{
        rotate: orientation === "landscape" ? [90, 0] : 0,
      }}
      transition={{
        duration: 1.8,
        repeat: orientation === "landscape" ? Infinity : 0,
        repeatDelay: 1,
      }}
    >
      {/* Screen */}
      <div className="absolute inset-[5px] rounded-[24px] bg-[#F7F3EC]" />

      {/* Camera */}
      <div className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700" />
    </motion.div>
  );
}

function OrientationHint() {
  return (
    <div className="max-w-sm text-center px-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#B58A2B]">
        The Story of Arshiya
      </p>

      <h1 className="mt-6 font-serif text-3xl sm:text-4xl text-[#6A2135]">
        Rotate to Portrait
      </h1>

      <p className="mt-6 text-base sm:text-lg leading-8 text-[#2D2A26]/80 font-serif italic">
        The rest of the experience is designed to be felt in portrait.
      </p>

      <p className="mt-4 text-xs text-neutral-500 tracking-wider">
        We'll continue automatically once your phone is rotated.
      </p>
    </div>
  );
}

export default function RotatePortrait() {
  const orientation = useOrientation();
  const { goTo } = useAppFlow();

  useEffect(() => {
    if (orientation !== "portrait") return;

    const timer = setTimeout(() => {
      goTo(FLOW.GIFT_ROOM);
    }, TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [orientation, goTo]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F7F3EC] px-8 select-none">
      {/* Warm ambient glow */}
      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 opacity-30 blur-3xl" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#6A2135]/15 opacity-20 blur-3xl" />

      <div className="flex flex-col items-center justify-center gap-10">
        <PhoneMockup orientation={orientation} />
        <OrientationHint />
      </div>
    </main>
  );
}