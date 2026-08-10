import { useState } from "react";

import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import BookSpineGap from "./BookSpineGap";

function BookSpread({
  leftContent,
  rightContent,
  onLeftPageClick,
  onRightPageClick,
}) {
  const [turnPhase, setTurnPhase] = useState("idle");
  const [turnDirection, setTurnDirection] = useState("forward"); // "forward" | "backward"

  function handleRightClick() {
    if (turnPhase !== "idle") return;
    setTurnDirection("forward");
    setTurnPhase("turning");
  }

  function handleLeftClick() {
    if (turnPhase !== "idle") return;
    setTurnDirection("backward");
    setTurnPhase("turning");
  }

  function handleHalfTurn() {
    if (turnDirection === "forward") {
      onRightPageClick?.();
    } else {
      onLeftPageClick?.();
    }
    setTurnPhase("finishing");
  }

  function handleFinished() {
    setTurnPhase("idle");
  }

  return (
    <div
      className="
        absolute
        left-[6px]
        right-[6px]
        top-[6px]
        bottom-[6px]
        flex
        gap-2
        z-20
      "
    >
      {/* Left Page Container */}
      <div className="relative flex-1">
        <LeftPage
          phase={turnPhase}
          direction={turnDirection}
          onClick={handleLeftClick}
          onHalfTurn={handleHalfTurn}
          onTurnComplete={handleFinished}
        >
          {leftContent}
        </LeftPage>
      </div>

      {/* Center Spine Gap */}
      <BookSpineGap />

      {/* Right Page Container */}
      <div className="relative flex-1">
        {/* Page underneath */}
        <div
          className="
            absolute
            inset-0
            rounded-r-[8px]
            bg-[var(--paper)]
            shadow-[inset_8px_0_18px_rgba(0,0,0,.05)]
          "
        />

        {/* Turning page sheet */}
        <RightPage
          phase={turnPhase}
          direction={turnDirection}
          onClick={handleRightClick}
          onHalfTurn={handleHalfTurn}
          onTurnComplete={handleFinished}
        >
          {rightContent}
        </RightPage>
      </div>
    </div>
  );
}

export default BookSpread;