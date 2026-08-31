const Logo = ({ className = "", size = "normal", variant = "light" }) => {
  const sizeConfig = {
    small: { img: "w-8 h-8", text: "text-lg", sub: "text-[7.5px]" },
    normal: { img: "w-10 h-10", text: "text-2xl", sub: "text-[8.5px]" },
    large: { img: "w-14 h-14", text: "text-3xl", sub: "text-[10px]" },
  };

  const cfg = sizeConfig[size] || sizeConfig.normal;
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Circular Emblem - Cropped to eliminate black background borders */}
      <div className={`relative ${cfg.img} rounded-full overflow-hidden shadow-md shadow-emerald-950/20 shrink-0 border border-emerald-500/30`}>
        <img
          src="/logo.PNG"
          alt="Sriizan"
          className="w-full h-full object-cover scale-[1.07] rounded-full"
          onError={(e) => {
            e.target.src = "/logo.svg";
          }}
        />
      </div>

      {/* Pristine Luxury Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 font-serif">
          <span className={`font-black tracking-tight ${cfg.text} ${isDark ? 'text-white' : 'text-slate-950'} leading-none`}>
            Sriizan
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        </div>
        <span className={`${cfg.sub} font-black tracking-[0.22em] uppercase text-emerald-800 leading-none mt-1`}>
          CONSTRUCTION &bull; RESALE
        </span>
      </div>
    </div>
  );
};

export default Logo;
