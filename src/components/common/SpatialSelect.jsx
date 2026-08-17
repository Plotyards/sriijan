import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

/**
 * Spatial UI Custom Select Component
 * Inspired by Vision OS spatial glassmorphism and modern dynamic micro-interactions.
 */
const SpatialSelect = ({
  options = [],
  value,
  onChange,
  label = "",
  placeholder = "Select option...",
  icon: IconComponent = null,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize options array into [{ value, label, subtext, badge }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return {
      value: opt.value ?? opt.id ?? opt.key,
      label: opt.label ?? opt.name ?? opt.title ?? (opt.value ?? opt.id),
      subtext: opt.subtext ?? opt.description ?? opt.date,
      badge: opt.badge ?? opt.status ?? (opt.percentage !== undefined ? `${opt.percentage}%` : null)
    };
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value)) || normalizedOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full text-left font-sans ${isOpen ? 'z-[999]' : 'z-20'} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          {selectedOption?.badge && (
            <span className="text-[10px] bg-amber-500/15 text-amber-800 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
              {selectedOption.badge}
            </span>
          )}
        </label>
      )}

      {/* Spatial Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
          isOpen
            ? 'bg-white border-2 border-amber-500 ring-4 ring-amber-500/20 shadow-lg scale-[1.01]'
            : 'bg-slate-50/90 hover:bg-white border border-slate-200/90 text-slate-900 hover:border-amber-400'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {IconComponent ? (
            <IconComponent size={16} className="text-amber-600 shrink-0" />
          ) : (
            <Sparkles size={15} className="text-amber-500 shrink-0" />
          )}

          <div className="truncate">
            <span className="text-slate-900 font-black block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {selectedOption?.subtext && (
              <span className="text-[10px] text-slate-500 font-medium block truncate mt-0.5">
                {selectedOption.subtext}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-500 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-amber-600 font-bold' : ''
          }`}
        />
      </button>

      {/* Spatial Floating Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 z-[9999] mt-1.5 max-h-72 overflow-y-auto scrollbar-none rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200/90 shadow-[0_25px_60px_rgba(0,0,0,0.25)] p-2 space-y-1.5"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm'
                      : 'text-slate-800 hover:bg-slate-100/90 hover:text-amber-900'
                  }`}
                >
                  <div className="min-w-0 flex-grow">
                    <div className="truncate flex items-center gap-2">
                      <span className="truncate">{opt.label}</span>
                    </div>
                    {opt.subtext && (
                      <div className={`text-[10px] font-medium truncate mt-0.5 ${
                        isSelected ? 'text-slate-900/80' : 'text-slate-500'
                      }`}>
                        {opt.subtext}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {opt.badge && !isSelected && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md border border-slate-200">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-xs">
                        <Check size={13} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpatialSelect;
