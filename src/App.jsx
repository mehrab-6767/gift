import { useState, useEffect } from "react";
import AppBackground from "./components/layout/AppBackground";
import SceneManager from "./components/layout/SceneManager";
import { useAppFlow } from "./context/AppFlowContext";
import { FLOW } from "./config/flow";
import LoadingScreen from "./components/LoadingScreen";

const DEV_STAGE_OPTIONS = [
  { label: "Welcome", value: FLOW.WELCOME },
  { label: "14 Candles", value: FLOW.CANDLES },
  { label: "Rotate Landscape", value: FLOW.ROTATE_LANDSCAPE },
  { label: "Memory Book", value: FLOW.MEMORY_BOOK },
  { label: "Rotate Portrait", value: FLOW.ROTATE_PORTRAIT },
  { label: "Gift Room", value: FLOW.GIFT_ROOM },
  { label: "Distance", value: FLOW.DISTANCE },

  { label: "Letter", value: FLOW.LETTER },
  { label: "Future", value: FLOW.FUTURE },
  { label: "Thank You", value: FLOW.THANK_YOU },
  { label: "Ending", value: FLOW.ENDING },
];

function DevStageSwitcher() {
  const { currentStage, goTo } = useAppFlow();

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-52 rounded-xl border border-[#6A2135]/20 bg-white/80 p-3 shadow-[0_12px_40px_rgba(74,21,43,0.18)] backdrop-blur-md">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6A2135]/70">
        Dev Pages
      </p>

      <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
        {DEV_STAGE_OPTIONS.map(({ label, value }) => {
          const isActive = currentStage === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => goTo(value)}
              className={`w-full rounded-md border px-2 py-1.5 text-left text-xs transition ${
                isActive
                  ? "border-[#6A2135] bg-[#6A2135] text-white"
                  : "border-[#6A2135]/10 bg-[#F7EEF0] text-[#6A2135] hover:border-[#6A2135]/30"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let minTimeElapsed = false;
    let assetsLoaded = false;

    const checkReady = () => {
      if (minTimeElapsed && assetsLoaded && mounted) {
        setIsReady(true);
        setProgress(100);
      }
    };

    // Minimum 2-second display timer
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkReady();
    }, 2000);

    // Preload all actual assets
    const loadAssets = async () => {
      // 1. Wait for fonts
      try {
        await document.fonts.ready;
      } catch (e) {
        // Continue even if fonts API fails
      }
      if (mounted) setProgress(15);

      // 2. Preload all known images (gifts + memories)
      const imageUrls = [
        "/gifts/flowers.png",
        "/gifts/lipgloss.png",
        "/gifts/plushie.png",
        "/gifts/churi.png",
        "/gifts/jhumkas.png",
        "/gifts/ring.png",
        ...Array.from({ length: 14 }, (_, i) =>
          `/memories/${String(i + 1).padStart(2, "0")}.jpg`
        ),
      ];

      let loaded = 0;
      const total = imageUrls.length;

      const loadImage = (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false); // Don't block on failures
          img.src = src;
        });

      await Promise.all(
        imageUrls.map(async (url) => {
          await loadImage(url);
          loaded++;
          if (mounted) {
            // Scale progress: 15% (fonts) + 85% (images)
            setProgress(Math.round(15 + (loaded / total) * 85));
          }
        })
      );

      assetsLoaded = true;
      checkReady();
    };

    loadAssets();

    return () => {
      mounted = false;
      clearTimeout(minTimer);
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <LoadingScreen 
          progress={progress} 
          isReady={isReady} 
          onComplete={handleLoadingComplete} 
        />
      )}
      
      {!loading && (
        <>
          <AppBackground />
          <SceneManager />
          <DevStageSwitcher />
        </>
      )}
    </>
  );
}

export default App;