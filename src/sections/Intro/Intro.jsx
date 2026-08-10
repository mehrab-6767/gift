import { useState } from "react";

import IntroVideo from "./IntroVideo";
import IntroOverlay from "./IntroOverlay";

import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

function Intro() {
  const [videoFinished, setVideoFinished] = useState(false);

  const { goTo } = useAppFlow();

  if (!videoFinished) {
    return (
      <IntroVideo
        onEnded={() => setVideoFinished(true)}
      />
    );
  }

  return (
    <IntroOverlay
      onBegin={() => {
        // Temporary until Memory Book exists
        goTo(FLOW.BOOK);
      }}
    />
  );
}

export default Intro;