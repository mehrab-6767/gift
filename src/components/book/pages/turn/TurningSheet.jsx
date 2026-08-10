import { motion } from "framer-motion";

import PageFront from "./PageFront";
import PageBack from "./PageBack";
import TurnShadow from "./TurnShadow";

function TurningSheet({
  children,
  phase,
  onClick,
  onHalfTurn,
  onTurnComplete,
}) {
  const isTurning = phase === "turning" || phase === "finishing";

  return (
    <motion.div
      onClick={onClick}
      className="
        absolute
        inset-0
        cursor-pointer
        z-20
        select-none
      "
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      animate={
        phase === "idle"
          ? { rotateY: 0, rotateZ: 0, z: 0, scaleX: 1 }
          : phase === "turning"
          ? {
              rotateY: [-3, -45, -90],
              rotateZ: [0, -3.5, -2],
              z: [0, 28, 42],
              scaleX: [1, 0.96, 0.94], // Paper flex distortion
            }
          : {
              rotateY: [-90, -145, -180],
              rotateZ: [-2, -0.8, 0],
              z: [42, 18, 0],
              scaleX: [0.94, 0.97, 1],
            }
      }
      transition={{
        duration: phase === "turning" ? 0.48 : 0.42,
        ease: phase === "turning" ? [0.34, 1.1, 0.64, 1] : [0.25, 0.1, 0.25, 1],
      }}
      onAnimationComplete={() => {
        if (phase === "turning") {
          onHalfTurn?.();
        } else if (phase === "finishing") {
          onTurnComplete?.();
        }
      }}
    >
      <PageFront>
        {/* Spine seam line */}
        <div
          className="
            absolute
            top-0
            bottom-0
            left-0
            w-[2px]
            bg-[#d7cdbb]
            -translate-x-px
          "
        />
        {/* Dynamic ambient highlight during rotation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/10 pointer-events-none"
          animate={{
            opacity: isTurning ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        {children}
      </PageFront>

      <PageBack />

      <TurnShadow turning={isTurning} />
    </motion.div>
  );
}

export default TurningSheet;