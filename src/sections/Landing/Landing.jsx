import LandingContent from "./LandingContent";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

function Landing() {
  const { goTo } = useAppFlow();

  return (
    <LandingContent
      onOpen={() => goTo(FLOW.ROTATE_LANDSCAPE)}
    />
  );
}

export default Landing;