import BookSpread from "../BookSpread";
import { useBook } from "../../BookContext";

function BirthdayLetterSpread({
  left,
  right,
}) {
  const {
    nextSpread,
    previousSpread,
  } = useBook();

  return (
    <BookSpread
      onLeftPageClick={previousSpread}
      onRightPageClick={nextSpread}
      leftContent={left}
      rightContent={right}
    />
  );
}

export default BirthdayLetterSpread;