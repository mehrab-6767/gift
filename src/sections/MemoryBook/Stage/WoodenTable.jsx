function WoodenTable() {
  return (
    <div
      className="
        absolute
        bottom-0
        h-[38%]
        w-full
        overflow-hidden
      "
    >
      {/* Base wood */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#C69C6D]
          via-[#A8784F]
          to-[#8A5E3B]
        "
      />

      {/* Wood grain */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,.35) 2px, transparent 4px, transparent 18px)",
        }}
      />

      {/* Table edge */}
      <div className="absolute top-0 h-px w-full bg-white/30" />
    </div>
  );
}

export default WoodenTable;