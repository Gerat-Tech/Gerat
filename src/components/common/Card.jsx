export default function Card({ bg, title, img, number, text }) {
  return (
    <div
      className={`${bg} text-black flex aspect-[1.3/1] max-h-[500px] min-h-[300px] w-full max-w-[668px] flex-col justify-between gap-8 rounded-[20px] px-5 py-10 md:min-h-[500px] md:px-10 md:py-14`}
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-8">
        <h3 className="text-sm md:text-base font-semibold uppercase max-w-[360px] leading-snug">
          {title}
        </h3>

        <img
          src={img}
          alt=""
          className="w-8 h-8 md:w-[60px] md:h-[60px] object-contain shrink-0"
        />
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-7">
        <div className="border-b border-black/20 pb-2">
          <p className="text-xs tracking-widest font-mono">{number}</p>
        </div>

        <p className="text-sm md:text-base leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
