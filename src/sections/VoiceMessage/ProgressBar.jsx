/**
 * ProgressBar — thin, elegant seek bar.
 *
 * Props:
 *   duration     — total audio duration in seconds
 *   currentTime  — current playback time in seconds
 *   onSeek       — (newTime: number) => void
 */
export default function ProgressBar({ duration, currentTime, onSeek }) {
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  function handleClick(e) {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio * duration);
  }

  return (
    <div
      role="slider"
      aria-valuenow={Math.round(currentTime)}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      className="relative w-full h-8 flex items-center cursor-pointer group"
      onClick={handleClick}
    >
      {/* Track */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-white/15" />

      {/* Filled portion */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full transition-all duration-100"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(to right, rgba(212,175,55,0.7), rgba(212,175,55,1))",
        }}
      />

      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ left: `calc(${pct}% - 6px)` }}
      />
    </div>
  );
}
