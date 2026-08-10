function BookContainer({ children }) {
  return (
    <div
      className="
        relative
        w-[94vw]
        max-w-[980px]
        aspect-[16/9]
        select-none
        [perspective:2600px]
      "
      style={{
        transform: "rotate(-2deg)",
      }}
    >
      {/* Floor shadow */}
      <div
        className="
          absolute
          left-1/2
          bottom-[-45px]
          h-14
          w-[72%]
          -translate-x-1/2
          rounded-full
          bg-black/20
          blur-3xl
          pointer-events-none
        "
      />

      {children}
    </div>
  );
}

export default BookContainer;