import LeftBoard from "./LeftBoard";
import PageBlock from "./PageBlock";
import PageEdges from "./PageEdges";
import Spine from "./Spine";
import RightBoard from "./RightBoard";

import FrontCover from "../cover/FrontCover";
import ClosedSpine from "../cover/ClosedSpine";

import SpreadManager from "../pages/SpreadManager";
import PageTurnHint from "../pages/PageTurnHint";

import { useBook } from "../BookContext";
import { BOOK_STATE } from "../bookState";

function BookBody() {
  const { bookState } = useBook();

  const isClosed =
    bookState === BOOK_STATE.CLOSED ||
    bookState === BOOK_STATE.PRESSING ||
    bookState === BOOK_STATE.LIFTING;

  return (
    <div className="absolute inset-0">
      {/* ================= CLOSED BOOK ================= */}
      {isClosed && (
        <>
          <ClosedSpine />
          <FrontCover />
        </>
      )}

      {/* ================= OPEN BOOK ================= */}
      {!isClosed && (
        <>
          {/* Open cover (behind everything after opening) */}
          <FrontCover />

          {/* Left hardcover */}
          <LeftBoard />

          {/* Paper stack */}
          <PageBlock />

          {/* Page edges */}
          <PageEdges />

          {/* Current spread */}
          <div className="absolute inset-0 z-30">
            <SpreadManager />
          </div>

          {/* Page turn hint */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <PageTurnHint />
          </div>

          {/* Center spine */}
          <Spine />

          {/* Right hardcover */}
          <RightBoard />
        </>
      )}
    </div>
  );
}

export default BookBody;