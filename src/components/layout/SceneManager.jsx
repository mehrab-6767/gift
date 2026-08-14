import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { SCENES } from "../../config/scenes";

const EASE = [0.22, 1, 0.36, 1];

function SceneManager() {
  const { currentStage } = useAppFlow();
  const [displayedStage, setDisplayedStage] = useState(currentStage);
  const [transitioning, setTransitioning] = useState(false);
  const prevStageRef = useRef(currentStage);

  useEffect(() => {
    if (currentStage !== prevStageRef.current) {
      prevStageRef.current = currentStage;
      setTransitioning(true);

      // After the exit animation completes, swap the scene
      const t = setTimeout(() => {
        setDisplayedStage(currentStage);
        setTransitioning(false);
      }, 600);

      return () => clearTimeout(t);
    }
  }, [currentStage]);

  const Scene = SCENES[displayedStage];

  if (!Scene) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center font-serif text-[#6A2135]">
        Unknown Scene
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="min-h-screen w-full"
          style={{ willChange: "opacity" }}
        >
          <Scene />
        </motion.div>
      </AnimatePresence>

      {/* Warm light wash overlay during transitions */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="scene-transition-wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,250,250,0.95) 0%, rgba(250,250,250,0.7) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SceneManager;