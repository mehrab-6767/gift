import { createContext, useContext, useMemo, useState } from "react";

import { BOOK_STATE } from "./bookState";

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [bookState, setBookState] = useState(BOOK_STATE.CLOSED);

  const [currentSpread, setCurrentSpread] = useState(0);

  const [hasTurnedPage, setHasTurnedPage] = useState(false);

  const TOTAL_SPREADS = 15;

  function nextSpread() {
  setCurrentSpread((page) => {
    const next = Math.min(page + 1, TOTAL_SPREADS - 1);
    return next;
  });

  setHasTurnedPage(true);
 }

 function previousSpread() {
  setCurrentSpread((page) => Math.max(page - 1, 0));

  setHasTurnedPage(true);
 }

  const value = useMemo(
    () => ({
      bookState,
      setBookState,

      currentSpread,
      nextSpread,
      previousSpread,

      hasTurnedPage,
    }),
    [bookState, currentSpread, hasTurnedPage]
  );

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBook must be used inside BookProvider");
  }

  return context;
}