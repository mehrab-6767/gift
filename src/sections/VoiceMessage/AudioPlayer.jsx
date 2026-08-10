import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Waveform from "./Waveform";
import ProgressBar from "./ProgressBar";

const AUDIO_SRC = "/audio/final-message.mp3";

function fmt(s) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ── Icons ─────────────────────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 translate-x-[2px]">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

/**
 * AudioPlayer
 *
 * Props:
 *   onTimeUpdate  — (currentTime: number) => void
 *   onEnded       — () => void
 */
export default function AudioPlayer({ onTimeUpdate, onEnded }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  /* ── Wire up audio events ─────────────────────────────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onTime   = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };
    const onEnd    = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    const onErr    = () => setAudioError(true);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, [onTimeUpdate, onEnded]);

  /* ── Controls ─────────────────────────────────────────────── */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => setAudioError(true));
    }
  }, [isPlaying]);

  const handleSeek = useCallback((t) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = t;
    setCurrentTime(t);
  }, []);

  const handleReplay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
    setHasStarted(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      {/* Hidden native audio element */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* Waveform */}
      <Waveform isPlaying={isPlaying} />

      {/* Big play / pause button */}
      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.93 }}
        className="relative flex items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition-all cursor-pointer"
        style={{
          width: 72,
          height: 72,
          background: "radial-gradient(circle at 38% 38%, rgba(212,175,55,0.18), rgba(212,175,55,0.04))",
          boxShadow: isPlaying
            ? "0 0 40px rgba(212,175,55,0.25), 0 0 80px rgba(212,175,55,0.08)"
            : "0 0 20px rgba(212,175,55,0.1)",
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {/* Outer ring pulse when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-[#D4AF37]/30"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </motion.button>

      {/* Audio-not-found notice */}
      {audioError && (
        <p className="font-serif text-[11px] italic text-[#FFFDF8]/40 text-center">
          Audio file not found yet — add it to /public/audio/final-message.mp3
        </p>
      )}

      {/* Progress bar + times */}
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col gap-1"
        >
          <ProgressBar
            duration={duration}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
          <div className="flex justify-between text-[10px] font-serif text-[#FFFDF8]/40 tracking-wider">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </motion.div>
      )}

      {/* Replay button — appears after playback starts */}
      {hasStarted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={handleReplay}
          className="flex items-center gap-1.5 font-serif text-[11px] uppercase tracking-widest text-[#FFFDF8]/35 hover:text-[#D4AF37]/70 transition-colors cursor-pointer"
          aria-label="Replay"
        >
          <ReplayIcon />
          Replay
        </motion.button>
      )}
    </div>
  );
}
