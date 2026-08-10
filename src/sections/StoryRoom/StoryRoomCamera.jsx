import { motion } from "framer-motion";

function StoryRoomCamera() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.7 }}
      className="relative h-[420px] w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,#f7efe3_0%,#efe2cf_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.16)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.8),_transparent_45%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-[#cfa67c] to-transparent" />

      <div className="absolute left-10 top-10 h-24 w-24 rounded-full border border-white/60 bg-white/30 blur-sm" />
      <div className="absolute right-12 top-16 h-40 w-40 rounded-full border border-white/40 bg-white/20 blur-xl" />

      <div className="absolute bottom-14 left-1/2 h-28 w-[62%] -translate-x-1/2 rounded-[2rem] border border-white/60 bg-white/30 backdrop-blur-md" />

      <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/60 bg-white/70 px-5 py-3 text-sm text-[var(--burgundy)] shadow-lg">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
        Scene ready
      </div>
    </motion.div>
  );
}

export default StoryRoomCamera;
