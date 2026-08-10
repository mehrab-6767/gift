import { motion } from "framer-motion";
import introVideo from "../../assets/intro.mp4";

function IntroVideo({ onEnded }) {
  return (
    <motion.video
      className="fixed inset-0 h-full w-full object-cover"
      src={introVideo}
      autoPlay
      muted
      playsInline
      onEnded={onEnded}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
  );
}

export default IntroVideo;