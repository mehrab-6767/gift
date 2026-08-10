import { motion } from "framer-motion";

function CameraRig({ children }) {
  return (
    <motion.div
      className="relative h-full w-full"
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default CameraRig;