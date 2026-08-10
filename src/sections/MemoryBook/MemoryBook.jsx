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
        <main className="relative flex min-h-screen items-center justify-center px-4 pb-16">
          <Book onFinish={() => goTo(FLOW.ROTATE_PORTRAIT)} />
        </main>
      </CameraRig>

      <OrientationOverlay />
    </StageBackground>
  );
}

export default MemoryBook;