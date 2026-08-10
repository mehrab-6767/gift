import AppBackground from "./components/layout/AppBackground";
import SceneManager from "./components/layout/SceneManager";
import { useAppFlow } from "./context/AppFlowContext";
import { FLOW } from "./config/flow";

const DEV_STAGE_OPTIONS = [
  { label: "Welcome", value: FLOW.WELCOME },
  { label: "Rotate Landscape", value: FLOW.ROTATE_LANDSCAPE },
  { label: "Memory Book", value: FLOW.MEMORY_BOOK },
  { label: "Rotate Portrait", value: FLOW.ROTATE_PORTRAIT },
  { label: "Gift Room", value: FLOW.GIFT_ROOM },
  { label: "Distance", value: FLOW.DISTANCE },
  { label: "Forgiveness", value: FLOW.FORGIVENESS },
  { label: "Letter", value: FLOW.LETTER },
  { label: "Future", value: FLOW.FUTURE },
  { label: "Voice Message", value: FLOW.VOICE_MESSAGE },
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
  return (
    <>
      <AppBackground />
      <SceneManager />
      <DevStageSwitcher />
    </>
  );
}

export default App;