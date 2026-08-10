import StageBackground from "../../components/stage/StageBackground";
import StoryRoomLighting from "./StoryRoomLighting";

function StoryRoomStage({ children }) {
  return (
    <StageBackground>
      <StoryRoomLighting />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-16">
        {children}
      </div>
    </StageBackground>
  );
}

export default StoryRoomStage;
