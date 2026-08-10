import { motion } from "framer-motion";

import StoryRoomStage from "./StoryRoomStage";
import StoryRoomOverlay from "./StoryRoomOverlay";
import StoryRoomCamera from "./StoryRoomCamera";

function StoryRoom() {
  return (
    <StoryRoomStage>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full max-w-5xl items-center justify-center"
      >
        <StoryRoomCamera />
        <StoryRoomOverlay />
      </motion.div>
    </StoryRoomStage>
  );
}

export default StoryRoom;
