export default function NavItem({ label, hovered, isActive, onMouseEnter }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="group/button text-[12px] text-white/80 font-azeret relative isolate flex items-center
      gap-[2px] uppercase whitespace-nowrap px-4 py-3 overflow-hidden"
    >
      <div
        className={`flex items-center gap-[8px] ${
          isActive ? "animate-[blink_0.2s_linear_2]" : ""
        }`}
        style={{
          filter: isActive ? "brightness(2)" : "none",
        }}
      >
        {/* Square Dot */}
        <div className="bg-white -mt-[2.5px] size-[9px] rounded-[2px] -translate-x-full opacity-0 blur-[32px] transition-all duration-500 group-hover/button:translate-x-0 group-hover/button:opacity-100 group-hover/button:blur-[0px]" />

        {/* Text animation */}
        <div className="relative isolate flex -translate-x-[13px] overflow-hidden transition-transform duration-500 group-hover/button:translate-x-0">
          <span className="transition-transform duration-500 group-hover/button:-translate-y-full">
            {label}
          </span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover/button:translate-y-0">
            {label}
          </span>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 transition-all duration-300 group-hover/button:opacity-100" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-0 transition-all duration-300 group-hover/button:opacity-100" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-0 transition-all duration-300 group-hover/button:opacity-100" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 transition-all duration-300 group-hover/button:opacity-100" />
    </div>
  );
}
