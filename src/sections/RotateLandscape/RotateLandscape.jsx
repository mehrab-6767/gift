import { useEffect } from "react";
import { motion } from "framer-motion";

import PhoneMockup from "./PhoneMockup";
import OrientationHint from "./OrientationHint";

import useOrientation from "../../hooks/useOrientation";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const TRANSITION_DELAY = 900;

function RotateLandscape() {
  const orientation = useOrientation();
  const { goTo } = useAppFlow();

  useEffect(() => {
    if (orientation !== "landscape") return;

    const timer = setTimeout(() => {
      goTo(FLOW.MEMORY_BOOK);
    }, TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [orientation, goTo]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-8">
      {/* Warm light */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#fff2ca] opacity-30 blur-3xl" />

      <motion.div
        animate={{
          rotate: orientation === "portrait" ? [0, 90] : 90,
        }}
        transition={{
          duration: 1.8,
          repeat: orientation === "portrait" ? Infinity : 0,
          repeatDelay: 1,
        }}
      >
        <PhoneMockup />
      </motion.div>

      <div className="mt-20">
        <OrientationHint />
      </div>
    </main>
  );
}

export default RotateLandscape;