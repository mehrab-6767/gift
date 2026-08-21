/**
 * FrontCoverContent — the visual design of the front cover.
 * Used as a static React element passed into FlipBook.
 * The FlipBook handles all open/close animation.
 */
function FrontCoverContent() {
  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      style={{
        background: "linear-gradient(135deg, #7b2940 0%, #6A2135 55%, #481523 100%)",
        borderRadius: "8px 18px 18px 8px",
      }}
    >
      {/* Leather grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 1px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Soft cover lighting sheen */}
      <div
        aria-hidden
        className="absolute top-0 left-0 h-full w-2/5 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04), transparent)",
        }}
      />

      {/* Deep spine crease shadow */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-4 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
      />

      {/* Gold filigree borders */}
      <div
        aria-hidden
        className="absolute inset-2 sm:inset-4 rounded-lg sm:rounded-xl pointer-events-none"
        style={{ border: "1px solid rgba(181,138,43,0.4)" }}
      />
      <div
        aria-hidden
        className="absolute inset-3 sm:inset-5 rounded-md sm:rounded-lg pointer-events-none"
        style={{ border: "1px solid rgba(181,138,43,0.2)" }}
      />

      {/* Gold corner guards */}
      <div aria-hidden className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-5 h-5 sm:w-8 sm:h-8 pointer-events-none"
        style={{ borderTop: "2px solid rgba(181,138,43,0.7)", borderRight: "2px solid rgba(181,138,43,0.7)", borderRadius: "0 6px 0 0" }} />
      <div aria-hidden className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-8 sm:h-8 pointer-events-none"
        style={{ borderBottom: "2px solid rgba(181,138,43,0.7)", borderRight: "2px solid rgba(181,138,43,0.7)", borderRadius: "0 0 6px 0" }} />
      <div aria-hidden className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-5 h-5 sm:w-8 sm:h-8 pointer-events-none"
        style={{ borderTop: "2px solid rgba(181,138,43,0.5)", borderLeft: "2px solid rgba(181,138,43,0.5)", borderRadius: "6px 0 0 0" }} />
      <div aria-hidden className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-5 h-5 sm:w-8 sm:h-8 pointer-events-none"
        style={{ borderBottom: "2px solid rgba(181,138,43,0.5)", borderLeft: "2px solid rgba(181,138,43,0.5)", borderRadius: "0 0 0 6px" }} />

      {/* Cover title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-12 text-center">
        <p
          className="uppercase"
          style={{
            fontSize: "clamp(0.5rem, 1.8cqw, 0.65rem)",
            letterSpacing: "0.45em",
            color: "#d8bb67",
            marginBottom: "clamp(0.4rem, 2cqh, 1.2rem)"
          }}
        >
          A Birthday Gift
        </p>

        <h1
          style={{
            fontFamily: "serif",
            fontSize: "clamp(1.6rem, 5.5cqw, 3.8rem)",
            color: "#B58A2B",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          For
        </h1>

        <h2
          style={{
            fontFamily: "serif",
            fontSize: "clamp(1.3rem, 4.5cqw, 2.8rem)",
            color: "#f2deb0",
            fontWeight: 400,
            letterSpacing: "0.05em",
            marginTop: "0.25rem",
          }}
        >
          Arshiya
        </h2>

        <div
          className="rounded-full"
          style={{
            height: "1px",
            width: "clamp(32px, 8cqw, 60px)",
            background: "rgba(181,138,43,0.4)",
            margin: "clamp(0.4rem, 2cqh, 1.4rem) auto"
          }}
        />

        <p
          className="uppercase"
          style={{
            fontSize: "clamp(0.5rem, 1.8cqw, 0.65rem)",
            letterSpacing: "0.35em",
            color: "#d8bb67CC"
          }}
        >
          August 23, 2026
        </p>
      </div>
    </div>
  );
}

export default FrontCoverContent;
