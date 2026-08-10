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
        className="absolute inset-4 rounded-xl pointer-events-none"
        style={{ border: "1px solid rgba(181,138,43,0.4)" }}
      />
      <div
        aria-hidden
        className="absolute inset-5 rounded-lg pointer-events-none"
        style={{ border: "1px solid rgba(181,138,43,0.2)" }}
      />

      {/* Gold corner guards */}
      <div aria-hidden className="absolute top-2 right-2 w-8 h-8 pointer-events-none"
        style={{ borderTop: "2px solid rgba(181,138,43,0.7)", borderRight: "2px solid rgba(181,138,43,0.7)", borderRadius: "0 6px 0 0" }} />
      <div aria-hidden className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none"
        style={{ borderBottom: "2px solid rgba(181,138,43,0.7)", borderRight: "2px solid rgba(181,138,43,0.7)", borderRadius: "0 0 6px 0" }} />
      <div aria-hidden className="absolute top-2 left-2 w-8 h-8 pointer-events-none"
        style={{ borderTop: "2px solid rgba(181,138,43,0.5)", borderLeft: "2px solid rgba(181,138,43,0.5)", borderRadius: "6px 0 0 0" }} />
      <div aria-hidden className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none"
        style={{ borderBottom: "2px solid rgba(181,138,43,0.5)", borderLeft: "2px solid rgba(181,138,43,0.5)", borderRadius: "0 0 0 6px" }} />

      {/* Cover title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
        <p
          className="uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.5em", color: "#d8bb67", marginBottom: "1.4rem" }}
        >
          A Birthday Gift
        </p>

        <h1
          style={{
            fontFamily: "serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
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
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            color: "#f2deb0",
            fontWeight: 400,
            letterSpacing: "0.05em",
            marginTop: "0.5rem",
          }}
        >
          Arshiya
        </h2>

        <div
          className="rounded-full"
          style={{ height: "1px", width: "60px", background: "rgba(181,138,43,0.4)", margin: "1.8rem auto" }}
        />

        <p
          className="uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#d8bb67CC" }}
        >
          August 23, 2026
        </p>
      </div>
    </div>
  );
}

export default FrontCoverContent;
