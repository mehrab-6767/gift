function PageEdges() {
  return (
    <>
      {/* Right paper stack block */}
      <div
        className="
          absolute
          right-[2px]
          top-[10px]
          h-[calc(100%-20px)]
          w-[12px]
          rounded-r-md
          bg-gradient-to-r
          from-[#e2d7c5]
          via-[#f8f5ee]
          to-[#fffdf8]
          shadow-[inset_-1px_0_3px_rgba(0,0,0,.15),0_4px_12px_rgba(0,0,0,.08)]
        "
      >
        {/* Fine paper lines simulation */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, #8a7a60 1px, transparent 1px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      {/* Bottom paper stack block */}
      <div
        className="
          absolute
          bottom-[2px]
          left-[50%]
          h-[10px]
          w-[calc(50%-10px)]
          rounded-b-md
          bg-gradient-to-b
          from-[#dfd4c2]
          to-[#fffdf8]
          shadow-[inset_0_-1px_3px_rgba(0,0,0,.12)]
        "
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, #8a7a60 1px, transparent 1px)",
            backgroundSize: "3px 100%",
          }}
        />
      </div>
    </>
  );
}

export default PageEdges;