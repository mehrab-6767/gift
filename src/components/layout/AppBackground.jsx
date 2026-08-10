function AppBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Base */}
      <div className="absolute inset-0 bg-[#F7F3EC]" />

      {/* Warm spotlight */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[900px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-70
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,248,235,.95) 0%, rgba(247,243,236,0) 70%)",
        }}
      />

      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.7) .5px, transparent .5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 220px rgba(0,0,0,.08)",
        }}
      />
    </div>
  );
}

export default AppBackground;