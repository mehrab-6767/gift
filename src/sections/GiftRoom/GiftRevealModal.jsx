import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftRevealModal({ gift, onClose }) {
  const [imgError, setImgError] = useState(false);

  if (!gift) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#120709]/75 backdrop-blur-md p-4 select-none"
      >
        {/* Soft Radial Ambient Backlight */}
        <div
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${gift.accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.8, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 20, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-2xl bg-[#FFFDF8] p-8 sm:p-10 border border-[#D4AF37]/50 shadow-[0_30px_90px_rgba(0,0,0,0.5)] text-center space-y-6 overflow-hidden"
        >
          {/* Subtle Paper Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Top Tag & Filigree */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#B58A2B]">
              {gift.tag}
            </span>
            <div className="h-px w-12 bg-[#D4AF37]/40" />
          </div>

          {/* Image Display Area (Optimized for Transparent PNGs) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-56 flex flex-col items-center justify-center p-2"
          >
            {/* Subtle glow behind the transparent item */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] opacity-80 pointer-events-none" />
            
            {!imgError ? (
              <img
                src={gift.image}
                alt={gift.placeholderLabel}
                onError={() => setImgError(true)}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]"
              />
            ) : null}

            {/* Elegant Luxury Placeholder Text Card (Displays when image is loading / placeholder) */}
            {imgError && (
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="h-12 w-12 rounded-full border border-[#B58A2B]/40 bg-[#FFFDF8] flex items-center justify-center text-[#6A2135] text-xl font-serif shadow-sm">
                  ✦
                </div>
                <p className="font-serif text-lg font-normal text-[#6A2135] tracking-wide">
                  {gift.placeholderLabel}
                </p>
                <p className="font-serif text-[11px] uppercase tracking-widest text-[#B58A2B]/80">
                  Virtual Gift Placeholder
                </p>
              </div>
            )}
          </motion.div>

          {/* Gift Title Fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-1"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6A2135] italic font-normal">
              {gift.title}
            </h2>
          </motion.div>

          {/* Message Slowly Appearing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="px-2"
          >
            <p className="font-serif text-base sm:text-lg text-[#2D2A26]/85 leading-relaxed italic font-light">
              "{gift.message}"
            </p>
          </motion.div>

          {/* Close Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-2"
          >
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/40 font-serif text-xs uppercase tracking-widest hover:bg-[#8b2b46] transition-all cursor-pointer shadow-md"
            >
              Keep Present ✦
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
