function PageBack() {
  return (
    <div
      className="
        absolute
        inset-0
        rounded-l-[8px]
        bg-[#f4efe5]
        [transform:rotateY(180deg)]
        [backface-visibility:hidden]
        shadow-[inset_-8px_0_18px_rgba(0,0,0,.05)]
      "
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.5) .4px, transparent .4px)",
          backgroundSize: "12px 12px",
        }}
      />
    </div>
  );
}

export default PageBack;