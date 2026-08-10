import BookSpread from "../BookSpread";
import { useBook } from "../../BookContext";

function TitleSpread() {
  const { nextSpread, previousSpread } = useBook();

  return (
    <BookSpread
      onLeftPageClick={previousSpread}
      onRightPageClick={nextSpread}
      leftContent={
        <div className="relative flex h-full flex-col items-center justify-center px-10 text-center select-none">
          {/* Handcrafted botanical ring emblem */}
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#B58A2B]/30 bg-[#FFFDF8]/50 shadow-[0_8px_20px_rgba(181,138,43,0.06)]">
            <span className="text-3xl text-[#B58A2B]">❀</span>
            <div className="absolute inset-2 rounded-full border border-dashed border-[#B58A2B]/20" />
          </div>

          <p className="mt-8 font-serif text-lg italic text-[#6A2135]/80 font-light leading-relaxed max-w-xs">
            "Every page is a piece of my heart, kept safe across every mile."
          </p>

          <p className="absolute bottom-8 left-0 right-0 text-center text-xs uppercase tracking-[0.3em] text-[#B58A2B]/60">
            Handcrafted Volume I
          </p>
        </div>
      }
      rightContent={
        <div className="flex h-full flex-col items-center justify-center px-10 text-center select-none">
          <p className="text-xs uppercase tracking-[0.45em] text-[#B58A2B] font-medium">
            Personal Keepsake
          </p>

          <h1 className="mt-6 font-display text-6xl sm:text-7xl text-[#6A2135] font-normal leading-tight">
            The Story
          </h1>

          <h2 className="font-serif text-4xl sm:text-5xl text-[#2D2A26] font-light tracking-wide italic">
            of Arshiya
          </h2>

          <div className="my-8 h-[1px] w-20 bg-gradient-to-r from-transparent via-[#B58A2B]/50 to-transparent" />

          <div className="space-y-2">
            <p className="font-serif text-xl text-[#2D2A26]/80 font-light">
              Created with love,
            </p>
            <p className="font-serif text-xl text-[#6A2135] font-medium italic">
              for your 14th birthday.
            </p>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.35em] text-[#B58A2B]/80 font-medium">
            23 August 2026
          </p>
        </div>
      }
    />
  );
}

export default TitleSpread;