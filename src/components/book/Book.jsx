import FlipBook from "./FlipBook";
import FrontCoverContent from "./cover/FrontCoverContent";
import { buildPages } from "./PageContent";

const PAGES = buildPages();

function Book({ onFinish }) {
  return (
    <FlipBook
      pages={PAGES}
      coverFront={<FrontCoverContent />}
      coverBack={null}
      onFinish={onFinish}
    />
  );
}

export default Book;