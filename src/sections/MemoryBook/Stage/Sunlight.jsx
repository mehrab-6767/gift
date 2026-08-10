import { motion } from "framer-motion";

function Sunlight() {
  return (
    <motion.div
      className="
        absolute
        -left-32
        -top-32
        h-[600px]
        w-[220px]
        rotate-[20deg]
        bg-white/25
        blur-3xl
      "
      animate={{
        opacity: [0.18, 0.3, 0.18],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default Sunlight;