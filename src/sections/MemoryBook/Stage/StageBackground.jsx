function StageBackground({ children }) {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#FAFAFA]
      "
    >
      {/* Room Ambient Light */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.9),transparent_55%)]
        "
      />

      {/* Soft vignette */}
      <div
        className="
          absolute
          inset-0
          shadow-[inset_0_0_180px_rgba(0,0,0,.12)]
        "
      />

      {children}
    </div>
  );
}

export default StageBackground;