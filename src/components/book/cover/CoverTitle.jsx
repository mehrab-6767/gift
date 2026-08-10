function CoverTitle() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
      <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d8bb67]">
        A Birthday Gift
      </p>

      <h1 className="font-display text-6xl leading-none text-[var(--gold)] drop-shadow-sm">
        For
      </h1>

      <h2 className="mt-4 font-serif text-4xl font-medium tracking-wide text-[#f2deb0]">
        Arshiya
      </h2>

      <div className="mt-10 h-px w-16 bg-[#b58a2b66]" />

      <p className="mt-5 text-sm uppercase tracking-[0.3em] text-[#d8bb67]">
        August 23, 2026
      </p>
    </div>
  );
}

export default CoverTitle;