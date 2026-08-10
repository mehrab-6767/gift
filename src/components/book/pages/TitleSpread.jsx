function TitleSpread() {
  return (
    <div className="absolute inset-0 flex">
      {/* Left Page */}
      <div
        className="
          relative
          flex-1
          bg-[var(--paper)]
          border-r
          border-[#eee4d4]
        "
      >
        <div
          className="
            absolute
            left-10
            top-10
            h-20
            w-20
            rounded-full
            border
            border-[#e8dbc2]
            opacity-30
          "
        />

        <div
          className="
            absolute
            bottom-10
            left-10
            text-[#b58a2b]
            opacity-50
            italic
            text-sm
          "
        >
          A journey told with love.
        </div>
      </div>

      {/* Right Page */}
      <div
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          bg-[var(--paper)]
          px-10
          text-center
        "
      >
        <p className="tracking-[0.4em] uppercase text-xs text-[var(--gold)]">
          Birthday Album
        </p>

        <h1 className="mt-6 font-display text-6xl text-[var(--text)]">
          The Story
        </h1>

        <h2 className="font-serif text-5xl text-[var(--burgundy)]">
          of Arshiya
        </h2>

        <div className="mt-12 space-y-2">
          <p className="font-serif text-xl text-[var(--text)]">
            Created with love,
          </p>

          <p className="font-serif text-xl text-[var(--text)]">
            for your 14th birthday.
          </p>
        </div>

        <div className="mt-16 text-sm uppercase tracking-[0.3em] text-[#8b7d68]">
          23 August
        </div>
      </div>
    </div>
  );
}

export default TitleSpread;