import { motion } from "framer-motion";

function DustParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#B58A2B]/20"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

function LandingContent({ onOpen }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      <DustParticles />

      {/* Warm gentle beam of light */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,248,220,0.8) 0%, rgba(247,243,236,0) 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl space-y-8"
      >
        {/* Subtle decorative top motif */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex items-center justify-center gap-3 text-[#B58A2B]/60 text-sm tracking-[0.3em] uppercase"
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B58A2B]/40" />
          <span>A Birthday Keepsake</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B58A2B]/40" />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="space-y-3"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-[#6A2135] font-normal leading-tight tracking-wide drop-shadow-sm">
            Happy 14th Birthday,
          </h1>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#2D2A26] font-light tracking-wide italic">
            Arshiya❤️
          </h2>
        </motion.div>

        {/* Subtitle / Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-serif text-lg sm:text-xl text-[#2D2A26]/70 max-w-lg mx-auto font-light leading-relaxed tracking-wide italic"
        >
          "A small gift I made for you, i hope it makes you smile, blush, and even cry a little bit."
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="pt-6"
        >
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full bg-[#FFFDF8] border border-[#B58A2B]/30 text-[#6A2135] shadow-[0_10px_30px_rgba(106,33,53,0.08)] hover:shadow-[0_15px_40px_rgba(106,33,53,0.15)] transition-all duration-500 cursor-pointer"
          >
            <span className="font-serif text-lg tracking-widest uppercase text-[#6A2135] font-medium">
              Open Your Gift
            </span>
            <span className="text-[#B58A2B] group-hover:translate-x-1 transition-transform duration-300">
              ✦
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingContent;