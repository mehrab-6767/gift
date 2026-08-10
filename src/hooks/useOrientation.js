import { useEffect, useState } from "react";

function getOrientation() {
  return window.innerWidth > window.innerHeight
    ? "landscape"
    : "portrait";
}

export default function useOrientation() {
  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    function handleResize() {
      setOrientation(getOrientation());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return orientation;
}