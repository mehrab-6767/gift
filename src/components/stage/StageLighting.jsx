function StageLighting() {
  return (
    <>
      {/* Warm sunlight */}
      <div
        className="
          absolute
          left-[-20%]
          top-[-10%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#fff2c9]
          opacity-20
          blur-3xl
        "
      />

      {/* Soft reflected light */}
      <div
        className="
          absolute
          bottom-[-15%]
          right-[-10%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-white
          opacity-20
          blur-3xl
        "
      />
    </>
  );
}

export default StageLighting;