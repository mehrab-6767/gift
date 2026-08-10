import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const DUST_PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  dur: Math.random() * 5 + 4,
  delay: Math.random() * 4,
}));

const VERSES = [
  "150 kilometers of highways, rivers, and time.",
  "Late-night phone calls that whisper until dawn.",
  "Every message sent across the night sky holds a piece of my heart.",
  "No matter how many miles lie between us, you are my home.",
];

export default function Distance() {
  const { goTo } = useAppFlow();
  const [activeTab, setActiveTab] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [activeNode, setActiveNode] = useState(null); // 'm' or 'a'

  // Auto rotate verses every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % VERSES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Send a floating heart along the curve from Gopalganj to Dhaka
  function triggerSendHeart() {
    const newId = Date.now() + Math.random();
    setHearts((prev) => [...prev, newId]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((id) => id !== newId));
    }, 2200);
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden select-none px-4 py-12"
      style={{
        background: "radial-gradient(ellipse at 50% 35%, #1c0e13 0%, #100609 60%, #060204 100%)",
      }}
    >
      {/* Dual Ambient Glowing Background Orbs */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "#D4AF37" }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]"
        style={{ background: "#6A2135" }}
      />

      {/* Floating Dust Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {DUST_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#B58A2B]/20"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
            animate={{ y: [0, -25, 0], opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-2xl w-full">
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-2"
        >
          <p className="font-serif text-xs uppercase tracking-[0.55em] text-[#B58A2B]">
            Our Story Across Miles
          </p>
          <h1 className="font-serif italic font-light text-4xl sm:text-5xl text-[#FFFDF8]">
            Across Every Distance
          </h1>
          <p className="font-serif text-xs italic text-[#FFFDF8]/60 max-w-sm mx-auto">
            "150 km cannot dim what is written in our hearts."
          </p>
        </motion.div>

        {/* Interactive Map Connection Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full rounded-2xl p-6 sm:p-10 border border-[#B58A2B]/30 shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col items-center gap-6 overflow-hidden"
          style={{ background: "linear-gradient(165deg, #FFFDF8 0%, #F5EFE6 100%)" }}
        >
          {/* Subtle Paper Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Gold Filigree Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#B58A2B]/40 rounded-tl pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#B58A2B]/40 rounded-tr pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#B58A2B]/40 rounded-bl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#B58A2B]/40 rounded-br pointer-events-none" />

          {/* City Nodes & Connection Arc */}
          <div className="relative w-full flex items-center justify-between px-2 sm:px-6 pt-4 pb-2">
            
            {/* Left Node: Gopalganj (Mehrab) */}
            <div
              onClick={() => setActiveNode(activeNode === "m" ? null : "m")}
              className="relative flex flex-col items-center gap-2 cursor-pointer group z-20"
            >
              <div className="relative h-16 w-16 flex items-center justify-center">
                {/* Pulse Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#6A2135]/40 pointer-events-none"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#6A2135] via-[#521828] to-[#3a0f1a] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(106,33,53,0.5)] flex items-center justify-center transition-transform group-hover:scale-105">
                  <span className="font-serif text-base font-bold text-[#D4AF37]">M</span>
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-sm font-medium text-[#6A2135]">Gopalganj</p>
                <p className="font-serif text-[10px] uppercase tracking-widest text-[#B58A2B]">Mehrab</p>
                <p className="font-serif text-[9px] text-[#2D2A26]/50">23.00° N, 89.82° E</p>
              </div>

              {/* Popover note on tap */}
              <AnimatePresence>
                {activeNode === "m" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#6A2135] text-[#FFFDF8] px-3 py-1 rounded-full text-[10px] font-serif border border-[#D4AF37]/40 shadow-lg pointer-events-none"
                  >
                    Sending love from Gopalganj 💌
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SVG Connecting Arc Path with Traveling Pulses & Hearts */}
            <div className="relative flex-1 h-24 mx-2 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 80" preserveAspectRatio="none">
                {/* Background Shadow Arc */}
                <path
                  d="M 10,50 Q 120,5 230,50"
                  fill="none"
                  stroke="rgba(181,138,43,0.15)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Golden Arc Line */}
                <path
                  d="M 10,50 Q 120,5 230,50"
                  fill="none"
                  stroke="url(#goldenArcGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <defs>
                  <linearGradient id="goldenArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6A2135" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#6A2135" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated Light Pulse travelling continuously */}
              <motion.div
                className="absolute h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] pointer-events-none"
                animate={{
                  offsetDistance: ["0%", "100%"],
                }}
                style={{
                  offsetPath: "path('M 10,50 Q 120,5 230,50')",
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Interactive Flying Hearts */}
              {hearts.map((hId) => (
                <motion.div
                  key={hId}
                  className="absolute text-sm text-[#6A2135] pointer-events-none"
                  initial={{ offsetDistance: "0%", scale: 0.8, opacity: 1 }}
                  animate={{ offsetDistance: "100%", scale: 1.3, opacity: 0 }}
                  style={{
                    offsetPath: "path('M 10,50 Q 120,5 230,50')",
                  }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                >
                  ♥
                </motion.div>
              ))}

              {/* Central 150 KM Distance Badge */}
              <button
                onClick={triggerSendHeart}
                title="Tap to send love!"
                className="absolute bottom-1 px-3.5 py-1.5 rounded-full bg-[#6A2135] border border-[#D4AF37]/50 text-[#FFFDF8] font-serif text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#8b2b46] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 z-20"
              >
                <span>✦ 150 KM ✦</span>
              </button>
            </div>

            {/* Right Node: Dhaka (Arshiya) */}
            <div
              onClick={() => setActiveNode(activeNode === "a" ? null : "a")}
              className="relative flex flex-col items-center gap-2 cursor-pointer group z-20"
            >
              <div className="relative h-16 w-16 flex items-center justify-center">
                {/* Pulse Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/40 pointer-events-none"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#FFFDF8] via-[#F5EFE6] to-[#E8DFC8] border-2 border-[#6A2135] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-transform group-hover:scale-105">
                  <span className="font-serif text-base font-bold text-[#6A2135]">A</span>
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-sm font-medium text-[#6A2135]">Dhaka</p>
                <p className="font-serif text-[10px] uppercase tracking-widest text-[#B58A2B]">Arshiya</p>
                <p className="font-serif text-[9px] text-[#2D2A26]/50">23.81° N, 90.41° E</p>
              </div>

              {/* Popover note on tap */}
              <AnimatePresence>
                {activeNode === "a" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FFFDF8] text-[#6A2135] px-3 py-1 rounded-full text-[10px] font-serif border border-[#B58A2B]/40 shadow-lg pointer-events-none"
                  >
                    Receiving your love in Dhaka 🌸
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tap hint */}
          <button
            onClick={triggerSendHeart}
            className="font-serif text-[11px] italic text-[#6A2135]/70 hover:text-[#6A2135] transition-colors cursor-pointer"
          >
            "Tap anywhere on 150 KM to send a heart across the distance ♥"
          </button>
        </motion.div>

        {/* Verses Carousel Card */}
        <div className="w-full min-h-[90px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="font-serif text-base sm:text-lg text-[#FFFDF8] italic leading-relaxed font-light text-center"
            >
              "{VERSES[activeTab]}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => goTo(FLOW.FORGIVENESS)}
            className="px-10 py-4 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/40 font-serif text-xs uppercase tracking-widest hover:bg-[#8b2b46] transition-all cursor-pointer shadow-xl"
          >
            A Moment of Honesty ✦
          </button>
        </motion.div>
      </div>
    </main>
  );
}