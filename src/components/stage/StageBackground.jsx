function StageBackground({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f3ec]">
      {/* Warm sunlight */}
      <div className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#fff6dc] opacity-70 blur-3xl" />

      {/* Secondary light */}
      <div className="absolute -right-24 bottom-0 h-[500px] w-[500px] rounded-full bg-white opacity-30 blur-3xl" />

      {/* Table */}
      <div
        className="
          absolute
          bottom-0
          h-[38%]
          w-full
          bg-gradient-to-b
          from-[#c9a274]
          via-[#b48659]
          to-[#8f6543]
        "
      />

      {/* Table highlight */}
      <div
        className="
          absolute
          bottom-[38%]
          h-px
          w-full
          bg-white/20
        "
      />

      {children}
    </div>
  );
}

export default StageBackground;