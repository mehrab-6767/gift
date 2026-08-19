import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Particle = ({ delay, duration, xStart, yStart, xEnd, yEnd, scale }) => {
  return (
    <motion.div
      initial={{ x: xStart, y: yStart, opacity: 0, scale: scale }}
      animate={{
        x: xEnd,
        y: yEnd,
        opacity: [0, 0.2, 0.2, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
      className="absolute h-1 w-1 rounded-full bg-[#D4AF37]"
      style={{ willChange: "transform, opacity" }}
    />
  );
};

const LoadingScreen = ({ progress, isReady, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static particle config once to avoid re-renders
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      xStart: `${Math.random() * 100}vw`,
      yStart: `${Math.random() * 100}vh`,
      xEnd: `${Math.random() * 100}vw`,
      yEnd: `${Math.random() * 100}vh`,
      scale: 0.5 + Math.random() * 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isReady && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]"
        >
          {/* Soft radial ambient light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(250,250,250,0)_70%)] pointer-events-none" />

          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <Particle key={p.id} {...p} />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic text-[#6A2135]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Loading...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-serif text-xs uppercase tracking-[0.4em] text-[#B58A2B]/70 text-center"
            >
              Preparing something made with love...
            </motion.p>

            {/* Loading Bar Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-[2px] w-[200px] overflow-hidden rounded-full bg-[#D4AF37]/20"
            >
              {/* Actual Loading Bar */}
              <motion.div
                className="h-full bg-[#D4AF37]"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                style={{ willChange: "transform" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
