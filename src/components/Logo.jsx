const Logo = ({ className = "", size = "normal", variant = "light" }) => {
  // Sizing configurations
  const sizeConfig = {
    small: {
      emblem: "w-8 h-8 text-base",
      text: "text-lg",
      tagline: "text-[7.5px]",
      dot: "w-1.5 h-1.5",
      gap: "gap-2"
    },
    normal: {
      emblem: "w-10 h-10 text-xl",
      text: "text-xl sm:text-2xl",
      tagline: "text-[8.5px]",
      dot: "w-1.5 h-1.5 sm:w-2 sm:h-2",
      gap: "gap-2.5"
    },
    large: {
      emblem: "w-14 h-14 text-2xl",
      text: "text-3xl sm:text-4xl",
      tagline: "text-[10px]",
      dot: "w-2.5 h-2.5",
      gap: "gap-3"
    }
  };

  const cfg = sizeConfig[size] || sizeConfig.normal;
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center select-none group cursor-pointer ${cfg.gap} ${className}`}>
      {/* Precision Engineered Emerald Emblem */}
      <div className="relative shrink-0">
        <div className={`relative ${cfg.emblem} rounded-full bg-gradient-to-br from-emerald-600 via-emerald-800 to-emerald-950 p-[1.5px] shadow-[0_0_20px_rgba(4,120,87,0.35)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300`}>
          {/* Outer Glass Bezel Ring */}
          <div className="w-full h-full rounded-full bg-emerald-900/90 border border-emerald-400/40 flex items-center justify-center overflow-hidden relative">
            {/* Soft inner reflection */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-white/20 rounded-full blur-xs pointer-events-none"></div>

            <img
              src="/logo.PNG"
              alt="Sriizan"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />

            {/* SVG Fallback Emblem */}
            <div className="hidden w-full h-full items-center justify-center font-serif font-black text-white">
              S
            </div>
          </div>
        </div>

        {/* Live Radar Pulse Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 border border-white"></span>
        </span>
      </div>

      {/* Typography Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight font-serif">
          <span className={`font-black ${cfg.text} ${isDark ? 'text-white' : 'text-slate-900'} leading-none`}>
            Sr
          </span>
          {/* The signature "ii" with radiant Champagne Gold metallic dots */}
          <span className="relative inline-flex items-baseline">
            <span className={`font-black ${cfg.text} ${isDark ? 'text-white' : 'text-slate-900'} leading-none tracking-tighter`}>
              ii
            </span>
            {/* Left Gold Dot */}
            <span
              className={`absolute top-0.5 left-[3px] sm:left-[4px] ${cfg.dot} rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-pulse`}
            ></span>
            {/* Right Gold Dot */}
            <span
              className={`absolute top-0.5 right-[2px] sm:right-[3px] ${cfg.dot} rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-pulse`}
            ></span>
          </span>
          <span className={`font-black ${cfg.text} ${isDark ? 'text-white' : 'text-slate-900'} leading-none`}>
            zan
          </span>
        </div>

        {/* Micro-Spaced Luxury Architecture Tagline */}
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`${cfg.tagline} font-black tracking-[0.25em] uppercase ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
            BUILT
          </span>
          <span className="text-[7px] text-amber-500 font-black">•</span>
          <span className={`${cfg.tagline} font-black tracking-[0.25em] uppercase ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            TRACKED
          </span>
          <span className="text-[7px] text-amber-500 font-black">•</span>
          <span className={`${cfg.tagline} font-black tracking-[0.25em] uppercase ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
            TRADED
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
