import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { FLOW } from "../config/flow";

const AppFlowContext = createContext(null);

export function AppFlowProvider({ children }) {
  const [currentStage, setCurrentStage] = useState(FLOW.WELCOME);

  useEffect(() => {
    console.log("CURRENT STAGE:", currentStage);
  }, [currentStage]);

  function goTo(stage) {
    console.log("GOING TO:", stage);
    console.trace();

    setCurrentStage(stage);
  }

  const value = useMemo(
    () => ({
      currentStage,
      goTo,
    }),
    [currentStage]
  );

  return (
    <AppFlowContext.Provider value={value}>
      {children}
    </AppFlowContext.Provider>
  );
}

export function useAppFlow() {
  const context = useContext(AppFlowContext);

  if (!context) {
    throw new Error("useAppFlow must be used inside AppFlowProvider");
  }

  return context;
}