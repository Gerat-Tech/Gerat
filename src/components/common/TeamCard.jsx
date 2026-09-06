"use client";

export default function TeamCard({ name, role, image }) {
  return (
    <div className="relative flex flex-col gap-[8px] md:gap-[20px]">
      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        // className="aspect-[0.8/1] object-cover w-full"
        className="aspect-[0.8/1] object-cover w-[140px] md:w-[200px]"
      />

      {/* TEXT */}
      <div className="flex flex-col items-start gap-[4px]">
        <h3 className="text-sm md:text-base font-medium">{name}</h3>

        <div className="flex items-start gap-[8px]">
          <div className="w-[8px] h-[8px] border-b border-l border-white/40"></div>
          <p className="text-white/60 text-xs md:text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
