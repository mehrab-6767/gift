import useOrientation from "../../../hooks/useOrientation";

function OrientationOverlay() {
  const orientation = useOrientation();

  if (orientation === "landscape") return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#F7F3EC]/95
        backdrop-blur-sm
        px-8
      "
    >
      <div className="max-w-sm text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[var(--gold)]">
          The Story of Arshiya
        </p>

        <h2 className="font-serif text-4xl text-[var(--text)]">
          Rotate your phone
        </h2>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          This story was handcrafted to be experienced like a real photo album.
        </p>

        <p className="mt-4 text-neutral-500">
          Rotate your phone to landscape to begin.
        </p>
      </div>
    </div>
  );
}

export default OrientationOverlay;