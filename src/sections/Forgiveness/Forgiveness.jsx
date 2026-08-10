import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppFlow } from "../../context/AppFlowContext";
import { FLOW } from "../../config/flow";

const FORGIVENESS_ENTRIES = [
  {
    id: 1,
    date: "26 May 2026",
    text: "The Wafiq incident.... it has been the biggest misunderstanding of our relation, im honestly so sorry for that. without even knowing the whole context, i crashed out, said many things to you which i shouldnt have said. the main reason, JEALOUSY, i hate it honestly, well my love even tho i behaved so rudely, you still forgave me, i love you so much. and again, im so sorry, things like that wont repeat ever again.",
  },
  {
    id: 2,
    date: "05 June 2026",
    text: "Jealousy got the better of me, i again made you angry, and sad.. IM SO SORRY MY DEAR",
  },
  {
    id: 3,
    date: "10 June 2026",
    text: "Again jealousy.... i behaved honestly so rudely that night, even made you cry, even got to hear you crying.. honestly that sound, made my heart feel the heaviest, im so sorry my love, i said many outrageous things that night, sorry for all of that, but after that night, you became very very close and free with me, which i honestly was praying for a long time. and you even sent me SO MANY VMs the next day, which mightve been seen small for you, but you have no idea how happy hearing to your voice, even for just 1 second makes me (hope you take notes hehe). anyways, i behaved so bad that night, im again so sorry.",
  },
  {
    id: 4,
    date: "13 June 2026",
    text: "Caffeine...... well tumi thik i ultapalta korso, but ami onek kharap bhabe bolsi, khub baje bhabe. honestly babe IM SO SORRYY... ETO BAJE BEHAVE AMI KEMNE KEN KORSILAM AMI NIJEO BUJHTESI NAH PLEASE FORGIVE ME MY DEAR IM SO SORRY",
  },
  {
    id: 5,
    date: "14 July 2026",
    text: "Interruption during THAT thing.... well babe lets not say anything, but im really sorry for my rude behavior that day too",
  },
  {
    id: 6,
    date: "17 July 2026",
    text: "VC.... jealousy....once again jealousy got the better out of me, IM SO SOOO SORRY MY DEAR I KEEP BRAGGING ABOUT HOW YOUR TEARS ARE WORTH MORE THAN DIAMONDS TO ME BUT I STILL KEEP ON MAKING YOU CRY PLEASE FORGIVE ME MY LOVE FROM I PROMISE ILL TRY MY BEST TO CONTROL MY JEALOUSY",
  },
  {
    id: 7,
    date: "01 August 2026",
    text: "Again that fucking jealousy.... abar o i behaved the worst with you instead of trying to calm you down...IM SO SORRYY FOR THAT DAY MY LOVE PLEASE FORGIVE ME",
  },
];

export default function Forgiveness() {
  const { goTo } = useAppFlow();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentEntry = FORGIVENESS_ENTRIES[currentIndex];

  function handleNext() {
    if (currentIndex < FORGIVENESS_ENTRIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handlePrev() {
    if (isFinished) {
      setIsFinished(false);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-12 select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1f1412 0%, #120a09 60%, #080404 100%)",
      }}
    >
      {/* Candlelight Warmth Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #d97736 0%, #6A2135 60%, transparent 80%)" }}
      />

      {/* Subtle Dust Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#B58A2B]/20"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ y: [0, -25, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-2"
        >
          <p className="font-serif text-xs uppercase tracking-[0.5em] text-[#B58A2B]">
            Admitting my mistakes
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl italic font-light text-[#FFFDF8]">
            Seeking forgiveness
          </h1>
          <p className="font-serif text-xs italic text-[#FFFDF8]/60">
            "My love, I think it's a good time to seek for your forgiveness for all the terrible things ive done with you, im sorry babe"
          </p>
        </motion.div>

        {/* Journal Page Card */}
        <div
          className="relative w-full min-h-[380px] rounded-2xl p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-[#B58A2B]/20 flex flex-col justify-between overflow-hidden"
          style={{ background: "linear-gradient(165deg, #FFFDF8 0%, #F5EFE6 100%)" }}
        >
          {/* Paper Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Page margin line */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-8 sm:left-12 w-px bg-[#6A2135]/15" />

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentEntry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col gap-6 text-left pl-6 sm:pl-8"
              >
                {/* Date & Entry Number */}
                <div className="flex items-center justify-between border-b border-[#B58A2B]/20 pb-3">
                  <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#B58A2B]">
                    {currentEntry.date}
                  </span>
                  <span className="font-serif text-xs italic text-[#2D2A26]/50">
                    Entry 0{currentEntry.id} / 0{FORGIVENESS_ENTRIES.length}
                  </span>
                </div>

                {/* Single text block */}
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2D2A26]/85 font-light italic">
                  {currentEntry.text}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="promise-summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-center h-full my-auto text-center px-4 space-y-6"
              >
                <span className="text-3xl text-[#B58A2B]">❀</span>
                <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#B58A2B]">
                  My Solemn Promise
                </p>
                <blockquote className="font-serif text-lg sm:text-xl text-[#6A2135] italic leading-relaxed font-light max-w-md">
                  "I cannot change those moments. But I promise to become someone who gives you more reasons to smile than to cry. And even after all those terrible things, we still kept on loving each other like always, thank you so much for that."
                </blockquote>
                <div className="h-px w-16 bg-[#B58A2B]/40 my-2" />
                <p className="font-serif text-xs text-[#2D2A26]/60 italic">
                  — Mehrab
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Footer */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-[#B58A2B]/20">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0 && !isFinished}
              className={`font-serif text-xs uppercase tracking-widest transition-opacity cursor-pointer ${
                currentIndex === 0 && !isFinished
                  ? "opacity-0 pointer-events-none"
                  : "text-[#2D2A26]/60 hover:text-[#6A2135]"
              }`}
            >
              ← Previous
            </button>

            {!isFinished ? (
              <button
                onClick={handleNext}
                className="font-serif text-xs uppercase tracking-widest text-[#6A2135] hover:text-[#B58A2B] font-medium transition-colors cursor-pointer"
              >
                {currentIndex === FORGIVENESS_ENTRIES.length - 1 ? "Reflect →" : "Next →"}
              </button>
            ) : (
              <button
                onClick={() => goTo(FLOW.LETTER)}
                className="px-6 py-2.5 rounded-full bg-[#6A2135] text-[#FFFDF8] font-serif text-xs uppercase tracking-widest hover:bg-[#8b2b46] transition-all cursor-pointer shadow-md"
              >
                Read My Letter ✦
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
