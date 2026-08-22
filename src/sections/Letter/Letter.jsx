import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

function WaxSeal({ onBreak }) {
  const [cracking, setCracking] = useState(false);

  function handleClick() {
    if (cracking) return;
    setCracking(true);
    setTimeout(onBreak, 700);
  }

  return (
    <motion.button
      id="wax-seal-btn"
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative cursor-pointer outline-none border-none bg-transparent"
      aria-label="Break the wax seal"
    >
      <AnimatePresence>
        {cracking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" width="120" height="120">
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,240,200,0.9)" strokeWidth="1.5" />
              <line x1="15" y1="25" x2="85" y2="75" stroke="rgba(255,240,200,0.7)" strokeWidth="1" />
              <line x1="85" y1="25" x2="15" y2="75" stroke="rgba(255,240,200,0.7)" strokeWidth="1" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={cracking ? { scale: [1, 1.15, 0.8], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-2"
      >
        <svg viewBox="0 0 120 120" width={110} height={110}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const cx = 60 + 50 * Math.cos(angle);
            const cy = 60 + 50 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r={8} fill="#8e1c30" />;
          })}
          <circle cx="60" cy="60" r="44" fill="url(#sealGrad)" />
          <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,220,180,0.3)" strokeWidth="1" />
          <text
            x="60"
            y="66"
            textAnchor="middle"
            fontSize="20"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontWeight="bold"
            fill="rgba(255,240,200,0.95)"
          >
            A & M
          </text>
          <defs>
            <radialGradient id="sealGrad" cx="38%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#c0293f" />
              <stop offset="60%" stopColor="#8e1c30" />
              <stop offset="100%" stopColor="#5c0f1e" />
            </radialGradient>
          </defs>
        </svg>
        <p className="font-serif text-xs italic tracking-widest text-[#B58A2B]/90">
          Touch seal to break
        </p>
      </motion.div>
    </motion.button>
  );
}

const LETTER_PARAGRAPHS = [
  "My Dearest Arshiya,",
  "Happy 14th Birthday, my love. ❤️",
  "It's hard to believe that this is your first birthday we're celebrating together.",
  "We met on 25 October 2025, completely online, never knowing that a simple meeting would eventually become something so important to both of us. And then, on 22 November 2025 at 12:49 AM, we became us.",
  "Now here I am, writing a birthday letter to the girl who somehow became such a huge part of my life.",
  "I wish I could be beside you today. I wish I could see your face when you wake up, give you your presents myself, and hear you laugh when you open them.",
  "But even with 150 kilometres between us, I wanted to send you a little piece of my heart.",
  "And I hope you know just how beautiful I think you are.",
  "Your eyes are one of my favorite things about you. I could look into them forever and still find something beautiful about them. And your smile... I genuinely don't think you realize how easily it can make my entire day better.",
  "Your lips, your hair, your face, those tiny expressions you make without even noticing—you somehow manage to look beautiful without even trying.",
  "But as much as I love the way you look, that's not what made me fall for you.",
  "It was you.",
  "Your personality.",
  "Your kindness.",
  "Your silly side.",
  "Your stubbornness(its cute and also your freaky side hehe).",
  "The way you care about me. The way you get excited over little things. The way you can make me laugh when I don't even feel like laughing.",
  "I love all those little pieces of you that make you Arshiya.",
  "We've had our beautiful days, and we've had our difficult ones too. We've argued, misunderstood each other, gotten annoyed, and sometimes hurt each other.",
  "But through all of it, I'm grateful that we've continued choosing each other.",
  "Because when I think about us, I don't want to remember the arguments.",
  "I want to remember the late-night conversations, the stupid jokes, the random things we tell each other, the moments when we miss each other, the moments only we knows about, and all the little memories that somehow became important just because they were ours.",
  "Today, though, I don't want you thinking about any of that.",
  "Today is about you.",
  "I hope 14 brings you countless reasons to smile. I hope you become even more confident, happier, and more yourself.",
  "And I hope you always remember that, there's a boy who is incredibly grateful that you were born.",
  "One day, I hope birthdays won't have to be celebrated through a screen.",
  "I hope I'll be standing right in front of you, handing you your gift, looking into those beautiful eyes of yours, and saying:",
  "\"Happy Birthday, my love.\"",
  "Until then, I'll keep finding little ways to cross the distance.",
  "So here's to you, my beautiful wifey.",
  "Happy 14th Birthday, Arshiya. ❤️",
  "Thank you for coming into my life.",
  "Thank you for every memory.",
  "And thank you for simply being you.",
  "I love you more than this little letter could ever explain.",
  "Forever yours,",
  "~ Mehrab ❤️",
];

export default function Letter() {
  const { goTo } = useAppFlow();
  const [sealed, setSealed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);

  function handleSealBreak() {
    setSealed(false);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setShowCta(true), 2500);
    }, 600);
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-4 py-12 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 20%, #2d1b0e 0%, #1a0f08 50%, #0f0806 100%)",
      }}
    >
      {/* Candlelight glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full opacity-20 blur-[80px]"
        style={{ background: "radial-gradient(circle, #c8760a 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-1"
        >
          <p className="font-serif text-xs uppercase tracking-[0.5em] text-[#D4AF37]">
            Handwritten Sealed Letter
          </p>
          <h1 className="font-serif italic font-light text-3xl sm:text-4xl text-[#FFF8F0]">
            For Arshiya
          </h1>
        </motion.div>

        {/* Envelope / Letter Paper Container */}
        <motion.div
          layout
          animate={{ y: sealed ? [0, -3, 0] : 0 }}
          transition={{
            layout: { duration: 0.8 },
            y: sealed
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 },
          }}
          className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-10 md:p-12"
          style={{
            background: "linear-gradient(160deg, #FFFFFF 0%, #FBFBFB 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,140,80,0.3)",
            minHeight: sealed ? 320 : 480,
          }}
        >
          {/* Subtle paper texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Left margin line */}
          <div
            className="absolute top-0 bottom-0 w-px opacity-15"
            style={{ left: "6%", sm: { left: "8%" }, background: "#6A2135" }}
          />

          {/* Sealed View */}
          <AnimatePresence>
            {sealed && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
              >
                <WaxSeal onBreak={handleSealBreak} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter Text View */}
          {!sealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-3 sm:space-y-4 pl-4 sm:pl-6 text-left"
            >
              <div className="text-right font-serif text-xs italic text-[#B58A2B] mb-4">
                23 August 2026
              </div>

              {LETTER_PARAGRAPHS.map((p, idx) => {
                const isTitle = idx === 0;
                const isPreSignature = idx === LETTER_PARAGRAPHS.length - 2;
                const isSignature = idx === LETTER_PARAGRAPHS.length - 1;
                const isShortCallout =
                  p === "It was you." ||
                  p === "Your personality." ||
                  p === "Your kindness." ||
                  p === "Your silly side." ||
                  p === "Your stubbornness. 😭" ||
                  p === "Today is about you.";

                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{
                      delay: Math.min(idx * 0.07 + 0.2, 2.5),
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`font-serif leading-relaxed ${
                      isTitle
                        ? "text-xl sm:text-2xl font-normal text-[#6A2135] italic pb-1"
                        : isPreSignature
                        ? "text-sm sm:text-base font-normal text-[#6A2135] italic pt-3"
                        : isSignature
                        ? "text-base sm:text-lg font-bold text-[#6A2135] italic text-right mt-3"
                        : isShortCallout
                        ? "text-sm sm:text-base text-[#6A2135] italic font-medium pl-2"
                        : p.startsWith('"Happy Birthday') || p.includes('Happy 14th Birthday')
                        ? "text-sm sm:text-base text-[#6A2135] font-normal"
                        : "text-xs sm:text-sm text-[#2D2A26]/85 font-light"
                    }`}
                  >
                    {p}
                  </motion.p>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <AnimatePresence>
          {showCta && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              onClick={() => goTo(FLOW.FUTURE)}
              className="px-10 py-4 rounded-full bg-[#6A2135] text-[#FFFDF8] border border-[#D4AF37]/40 font-serif text-xs uppercase tracking-widest shadow-xl hover:bg-[#8b2b46] transition-all cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Dream With Me ✦
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}