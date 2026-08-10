import { motion } from "framer-motion";

function TurnShadow({ turning }) {
  return (
    <motion.div
      className="
        absolute
        inset-0
        pointer-events-none
        rounded-r-[8px]
        bg-gradient-to-l
        from-black/45
        via-black/15
        to-transparent
      "
      animate={{
        opacity: turning ? 1 : 0,
        scaleX: turning ? 1.05 : 0.2,
        x: turning ? -12 : 0,
      }}
      transition={{
        duration: 0.38,
        ease: "easeInOut",
      }}
    />
  );
}

export default TurnShadow;