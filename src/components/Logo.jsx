const Logo = ({ className = "", size = "normal", variant = "light" }) => {
  // Height sizing
  const heightClasses = {
    small: "h-8 sm:h-9",
    normal: "h-10 sm:h-11",
    large: "h-14 sm:h-16"
  };

  const currentHeight = heightClasses[size] || heightClasses.normal;

  return (
    <div className={`flex items-center select-none group cursor-pointer transition-transform duration-200 hover:scale-[1.02] ${className}`}>
      {/* Clean, High-Resolution Sriizan Circular Logo */}
      <img
        src="/logo.PNG"
        alt="Sriizan"
        className={`${currentHeight} w-auto object-contain drop-shadow-sm rounded-full`}
        onError={(e) => {
          // Clean fallback if image fails
          e.target.style.display = 'none';
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'flex';
          }
        }}
      />

      {/* Pristine Fallback Emblem */}
      <div className="hidden items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
          S
        </div>
        <div className="flex flex-col">
          <span className={`font-serif font-black text-xl tracking-tight leading-none ${variant === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Sriizan
          </span>
          <span className="text-[8px] font-extrabold tracking-widest text-emerald-700 uppercase mt-0.5">
            BUILT • TRACKED • TRADED
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
