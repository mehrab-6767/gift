import { motion } from "framer-motion";
import PageFront from "./turn/PageFront";
import PageBack from "./turn/PageBack";
import TurnShadow from "./turn/TurnShadow";

function LeftTurningSheet({
  children,
  phase,
  direction,
  onClick,
  onHalfTurn,
  onTurnComplete,
}) {
  const isBackwardTurn = direction === "backward" && (phase === "turning" || phase === "finishing");

  return (
    <div className="relative h-full w-full">
      {/* Underlying Left Base Page */}
      <div
        onClick={onClick}
        className="
          absolute
          inset-0
          overflow-hidden
          rounded-l-[8px]
          bg-[var(--paper)]
          shadow-[inset_-12px_0_24px_rgba(0,0,0,.08)]
          cursor-pointer
          select-none
        "
      >
        {children}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,.5) .4px, transparent .4px)",
            backgroundSize: "12px 12px",
          }}
        />
      </div>

      {/* Animated Left Page Flip (Flips Rightwards: 0deg to +180deg) */}
      {direction === "backward" && phase !== "idle" && (
        <motion.div
          className="
            absolute
            inset-0
            cursor-pointer
            z-30
            select-none
          "
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          animate={
            phase === "turning"
              ? {
                  rotateY: [3, 45, 90],
                  rotateZ: [0, 3.5, 2],
                  z: [0, 28, 42],
                  scaleX: [1, 0.96, 0.94],
                }
              : {
                  rotateY: [90, 145, 180],
                  rotateZ: [2, 0.8, 0],
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
            <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-transparent to-black/10 pointer-events-none opacity-60" />
            {children}
          </PageFront>

          <PageBack />
          <TurnShadow turning={isBackwardTurn} />
        </motion.div>
      )}
    </div>
  );
}

function LeftPage(props) {
  return <LeftTurningSheet {...props} />;
}

export default LeftPage;