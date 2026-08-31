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
        alt="Sriizan - Construction Tracking & Resale Marketplace"
        className={`${heightClasses[size] || heightClasses.normal} w-auto object-contain transition-all duration-300 border-none shadow-none ring-0 outline-none`}
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
        <span className="font-extrabold text-xl tracking-tight text-emerald-700">
          Sriizan
        </span>
        <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase -mt-1">
          BUILT • TRACKED • TRADED
        </span>
      </div>
    </div>
  );
};

export default Logo;
