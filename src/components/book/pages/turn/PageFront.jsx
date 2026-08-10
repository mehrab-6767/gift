function PageFront({ children }) {
  return (
    <div
      className="
        absolute
        inset-0
        rounded-r-[8px]
        bg-[var(--paper)]
        overflow-hidden
        shadow-[inset_12px_0_24px_rgba(0,0,0,.08)]
        [backface-visibility:hidden]
      "
    >
      {/* Inner spine shadow gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />

      {children}

      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.5) .4px, transparent .4px)",
          backgroundSize: "12px 12px",
        }}
      />
    </div>
  );
}

export default PageFront;