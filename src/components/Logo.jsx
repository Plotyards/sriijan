const Logo = ({ className = "", size = "normal" }) => {
  // Height sizing mapping
  const heightClasses = {
    small: "h-7 sm:h-8",
    normal: "h-9 sm:h-11",
    large: "h-12 sm:h-16"
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logo.PNG"
        alt="Promohomex - Construction Tracked Live"
        className={`${heightClasses[size] || heightClasses.normal} w-auto object-contain transition-all duration-300 mix-blend-multiply border-none shadow-none ring-0 outline-none`}
        style={{
          boxShadow: 'none',
          filter: 'none',
          WebkitFilter: 'none'
        }}
        onError={(e) => {
          // Fallback clean inline text if image fails to load
          e.target.style.display = 'none';
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'flex';
          }
        }}
      />
      <div className="hidden flex-col items-start">
        <span className="font-extrabold text-xl tracking-tight text-amber-600">
          promo<span className="text-amber-700 uppercase">homeX</span>
        </span>
        <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase -mt-1">
          CONSTRUCTION • TRACKED • LIVE
        </span>
      </div>
    </div>
  );
};

export default Logo;
