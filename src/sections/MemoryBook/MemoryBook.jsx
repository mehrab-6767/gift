import Book from "../../components/book/Book";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

import StageBackground from "./Stage/StageBackground";
import WoodenTable from "./Stage/WoodenTable";
import Sunlight from "./Stage/Sunlight";
import DustParticles from "./Stage/DustParticles";
import CameraRig from "./Stage/CameraRig";

import OrientationOverlay from "./Overlay/OrientationOverlay";

function MemoryBook() {
  const { goTo } = useAppFlow();

  return (
    <StageBackground>
      <Sunlight />
      <WoodenTable />
      <DustParticles />

      <CameraRig>
        <main className="relative flex h-[100dvh] h-screen w-full items-center justify-center p-2 sm:p-4 overflow-hidden">
          <Book onFinish={() => goTo(FLOW.ROTATE_PORTRAIT)} />
        </main>
      </CameraRig>

      <OrientationOverlay />
    </StageBackground>
  );
}

export default MemoryBook;