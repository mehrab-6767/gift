import { useAppFlow } from "../../context/AppFlowContext";

import { SCENES } from "../../config/scenes";

function SceneManager() {
  const { currentStage } = useAppFlow();

  const Scene = SCENES[currentStage];

  if (!Scene) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center font-serif text-[#6A2135]">
        Unknown Scene
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen w-full">
      <Scene />
    </div>
  );
}

export default SceneManager;