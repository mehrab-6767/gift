import { motion } from "framer-motion";

function PhoneMockup() {
  return (
    <motion.div
      className="relative h-44 w-24 rounded-[32px] border-[5px] border-[#2d2a26] bg-[#111] shadow-2xl"
    >
      {/* Screen */}
      <div className="absolute inset-[5px] rounded-[24px] bg-[var(--background)]" />

      {/* Camera */}
      <div className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700" />
    </motion.div>
  );
}

export default PhoneMockup;