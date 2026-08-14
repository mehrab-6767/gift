import BookSpread from "../BookSpread";
import { useBook } from "../../BookContext";

function MemorySpread({ memory }) {
  const { nextSpread, previousSpread } = useBook();

  if (!memory) return null;

  return (
    <BookSpread
      onLeftPageClick={previousSpread}
      onRightPageClick={nextSpread}
      leftContent={
        <div className="relative flex h-full flex-col items-center justify-center p-8 select-none">
          {/* Year watermark */}
          <div className="absolute top-6 left-8 font-serif text-3xl font-light tracking-widest text-[#B58A2B]/40">
            {memory.year}
          </div>

          {/* Archival framed photograph */}
          <div className="relative max-h-[78%] w-auto max-w-[85%] rounded-md bg-[#FFFFFF] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-[#E8DCC7]">
            <div className="relative overflow-hidden rounded">
              <img
                src={memory.photo}
                alt={memory.title}
                className="h-full w-full object-cover max-h-[260px] sm:max-h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            {memory.quote && (
              <p className="mt-3 text-center font-serif text-xs italic text-[#6A2135]/80 font-light">
                "{memory.quote}"
              </p>
            )}
          </div>

          <p className="absolute bottom-6 text-xs uppercase tracking-[0.3em] text-[#B58A2B]/60 font-medium">
            Volume I • {memory.year}
          </p>
        </div>
      }
      rightContent={
        <div className="flex h-full flex-col justify-center px-10 sm:px-12 py-8 select-none">
          {/* Top header */}
          <div className="flex items-center gap-3 text-[#B58A2B] text-xs uppercase tracking-[0.35em]">
            <span className="h-[1px] w-8 bg-[#B58A2B]/40" />
            <span>Chapter {memory.year}</span>
          </div>

          {/* Main Title */}
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-[#6A2135] font-normal leading-snug">
            {memory.title}
          </h2>

          <div className="my-6 h-[1px] w-16 bg-[#B58A2B]/30" />

          {/* Story Narrative */}
          <p className="font-serif text-lg sm:text-xl text-[#2D2A26]/85 font-light leading-relaxed italic">
            "{memory.story}"
          </p>

          <p className="mt-10 font-serif text-sm italic text-[#B58A2B]/80 font-medium">
            ✦ Tap right page to continue
          </p>
        </div>
      }
    />
  );
}

export default MemorySpread;