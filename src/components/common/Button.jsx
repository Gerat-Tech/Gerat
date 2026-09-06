import Link from "next/link";

export default function Button({
  children,
  href = "#",
  className = "",
  textColor = "text-white",
  bgColor = "bg-white",
  borderColor = "border-white",
  padding = "px-[20px] py-[10px]",
}) {
  return (
    <Link
      href={href}
      // className={`${className} group relative isolate inline-block hover:animate-glitch-twice motion-reduce:hover:animate-none`}
      className={`${className} group relative isolate inline-block  hover:[animation:glitch_0.1s_linear_2]`}
    >
      <div className="glitch-wrapper">
        {/* <div className="px-[20px] py-[10px]"> */}
        <div className={`${padding}`}>
          {/* DOT */}

          <div
            className={`${bgColor} absolute left-0 top-1/2 -translate-y-1/2 size-[10px] rounded-[3px]
                opacity-0 transition-all duration-300 ease-in-out group-hover:left-2 group-hover:opacity-100`}
          />

          {/* TEXT */}
          <div
            className={`${textColor} font-azeret relative isolate flex -translate-x-[5px] overflow-hidden transition-transform duration-400
          ease-in-out group-hover:translate-x-[5px]`}
          >
            <span className=" text-[12px] uppercase transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
              {children}
            </span>

            <span
              className="absolute inset-0 text-[12px] uppercase translate-y-full transition-transform duration-400
          ease-in-out group-hover:translate-y-0"
            >
              {children}
            </span>
          </div>
        </div>

        {/* CORNER  */}

        <div
          className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${borderColor}`}
        />
        <div
          className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${borderColor}`}
        />
        <div
          className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${borderColor}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${borderColor}`}
        />
      </div>
    </Link>
  );
}
