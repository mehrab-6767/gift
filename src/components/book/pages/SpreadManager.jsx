import { useBook } from "../BookContext";

import TitleSpread from "./spreads/TitleSpread";
import MemorySpread from "./spreads/MemorySpread";
import BirthdayLetterSpread from "./spreads/BirthdayLetterSpread";

import { memories } from "../../../data/memories";

function Placeholder({ text }) {
  return (
    <div className="flex h-full items-center justify-center text-center px-8">
      <h1 className="font-serif text-4xl text-[var(--burgundy)]">
        {text}
      </h1>
    </div>
  );
}

function SpreadManager() {
  const { currentSpread, nextSpread, previousSpread } = useBook();

  // ===== Title =====
  if (currentSpread === 0) {
    return <TitleSpread onNext={nextSpread} />;
  }

  // ===== Memory Pages =====
  const memoryIndex = currentSpread - 1;

  if (memoryIndex >= 0 && memoryIndex < memories.length) {
    const memory = memories[memoryIndex];

    return <MemorySpread memory={memory} />;
  }

  // ===== Final Letter =====
  return (
    <BirthdayLetterSpread
      left={<Placeholder text="One Last Thing..." />}
      right={<Placeholder text="Happy Birthday ❤️" />}
      onLeftPageClick={previousSpread}
    />
  );
}

export default SpreadManager;