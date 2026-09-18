import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

/**
 * Spatial UI Custom Select Component
 * Inspired by Apple Vision OS spatial glassmorphism and modern dynamic micro-interactions.
 * Replaces clunky OS-native selects with smooth, animated, styled dropdowns.
 */
const SpatialSelect = ({
  options = [],
  value,
  onChange,
  label = "",
  placeholder = "Select option...",
  icon: IconComponent = null,
  colorScheme = "emerald", // 'emerald' | 'amber' | 'indigo' | 'slate'
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
  name = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize options array into [{ value, label, subtext, badge, icon }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return {
      value: opt.value ?? opt.id ?? opt.key ?? opt.label,
      label: opt.label ?? opt.name ?? opt.title ?? String(opt.value ?? opt.id ?? ''),
      subtext: opt.subtext ?? opt.description ?? opt.date ?? null,
      badge: opt.badge ?? opt.status ?? (opt.percentage !== undefined ? `${opt.percentage}%` : null),
      icon: opt.icon ?? null
    };
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value)) ||
    (value !== undefined && value !== null && value !== '' ? normalizedOptions[0] : null);

  // Close dropdown on click outside or Escape key (supports desktop & touch devices)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (option) => {
    if (disabled) return;
    if (onChange) {
      // Pass value, and also pass synthetic event object for backwards compatibility
      onChange(option.value, {
        target: { name, value: option.value },
        currentTarget: { name, value: option.value }
      });
    }
    setIsOpen(false);
  };

  // Color theme class configurations
  const themeStyles = {
    emerald: {
      activeRing: 'bg-white border-2 border-emerald-500 ring-4 ring-emerald-500/20 shadow-lg scale-[1.01]',
      hoverBorder: 'hover:border-emerald-500/60',
      iconColor: 'text-emerald-600',
      selectedItem: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm',
      selectedSubtext: 'text-emerald-100',
      selectedCheck: 'bg-white text-emerald-700',
      hoverItem: 'hover:bg-emerald-50/90 hover:text-emerald-950 text-slate-800',
      labelBadge: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    },
    amber: {
      activeRing: 'bg-white border-2 border-amber-500 ring-4 ring-amber-500/20 shadow-lg scale-[1.01]',
      hoverBorder: 'hover:border-amber-500/60',
      iconColor: 'text-amber-600',
      selectedItem: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm font-black',
      selectedSubtext: 'text-slate-900/80',
      selectedCheck: 'bg-slate-950 text-amber-400',
      hoverItem: 'hover:bg-amber-50/90 hover:text-amber-950 text-slate-800',
      labelBadge: 'bg-amber-50 text-amber-800 border-amber-300'
    },
    indigo: {
      activeRing: 'bg-white border-2 border-indigo-500 ring-4 ring-indigo-500/20 shadow-lg scale-[1.01]',
      hoverBorder: 'hover:border-indigo-500/60',
      iconColor: 'text-indigo-600',
      selectedItem: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm',
      selectedSubtext: 'text-indigo-100',
      selectedCheck: 'bg-white text-indigo-700',
      hoverItem: 'hover:bg-indigo-50/90 hover:text-indigo-950 text-slate-800',
      labelBadge: 'bg-indigo-50 text-indigo-800 border-indigo-300'
    },
    slate: {
      activeRing: 'bg-white border-2 border-slate-700 ring-4 ring-slate-400/20 shadow-lg scale-[1.01]',
      hoverBorder: 'hover:border-slate-500',
      iconColor: 'text-slate-700',
      selectedItem: 'bg-slate-900 text-white shadow-sm',
      selectedSubtext: 'text-slate-300',
      selectedCheck: 'bg-white text-slate-900',
      hoverItem: 'hover:bg-slate-100 hover:text-slate-950 text-slate-800',
      labelBadge: 'bg-slate-100 text-slate-800 border-slate-300'
    }
  };

  const currentTheme = themeStyles[colorScheme] || themeStyles.emerald;

  // Size configurations
  const sizeStyles = {
    sm: {
      trigger: 'py-2 px-3 text-xs rounded-xl',
      iconSize: 13,
      menu: 'p-1.5 space-y-1',
      item: 'p-2 rounded-lg text-xs'
    },
    md: {
      trigger: 'py-2.5 px-3.5 text-xs rounded-xl sm:rounded-2xl',
      iconSize: 15,
      menu: 'p-2 space-y-1.5',
      item: 'p-2.5 rounded-xl text-xs'
    },
    lg: {
      trigger: 'py-3.5 px-4 text-sm rounded-2xl',
      iconSize: 17,
      menu: 'p-2.5 space-y-2',
      item: 'p-3 rounded-xl text-sm'
    }
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  // Render option icon helper
  const renderIcon = (optIcon, iconSize = 15) => {
    if (!optIcon) return null;
    if (typeof optIcon === 'string') {
      return <span className="text-base select-none shrink-0 leading-none">{optIcon}</span>;
    }
    if (React.isValidElement(optIcon)) {
      return optIcon;
    }
    if (typeof optIcon === 'function' || typeof optIcon === 'object') {
      const CustomIcon = optIcon;
      return <CustomIcon size={iconSize} className="shrink-0" />;
    }
    return null;
  };

  return (
    <div className={`relative w-full text-left font-sans ${isOpen ? 'z-[999]' : 'z-10'} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          {selectedOption?.badge && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${currentTheme.labelBadge}`}>
              {selectedOption.badge}
            </span>
          )}
        </label>
      )}

      {/* Spatial Trigger Pill */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 font-bold transition-all duration-200 cursor-pointer shadow-2xs text-left ${currentSize.trigger} ${
          disabled
            ? 'opacity-60 cursor-not-allowed bg-slate-100 border border-slate-200 text-slate-400'
            : isOpen
            ? currentTheme.activeRing
            : `bg-slate-50/90 hover:bg-white border border-slate-200/90 text-slate-900 ${currentTheme.hoverBorder}`
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {selectedOption?.icon ? (
            renderIcon(selectedOption.icon, currentSize.iconSize)
          ) : IconComponent ? (
            <IconComponent size={currentSize.iconSize} className={`${currentTheme.iconColor} shrink-0`} />
          ) : (
            <Sparkles size={currentSize.iconSize} className={`${currentTheme.iconColor} shrink-0`} />
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
          size={currentSize.iconSize + 1}
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${
            isOpen ? `rotate-180 ${currentTheme.iconColor} font-bold` : ''
          }`}
        />
      </button>

      {/* Spatial Floating Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute left-0 right-0 z-[9999] mt-1.5 max-h-72 overflow-y-auto scrollbar-none rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${currentSize.menu}`}
          >
            {normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left font-extrabold transition-all flex items-center justify-between gap-3 cursor-pointer ${currentSize.item} ${
                    isSelected
                      ? currentTheme.selectedItem
                      : currentTheme.hoverItem
                  }`}
                >
                  <div className="min-w-0 flex-grow flex items-center gap-2.5">
                    {opt.icon && renderIcon(opt.icon, currentSize.iconSize)}
                    <div className="truncate min-w-0">
                      <div className="truncate flex items-center gap-2">
                        <span className="truncate">{opt.label}</span>
                      </div>
                      {opt.subtext && (
                        <div className={`text-[10px] font-medium truncate mt-0.5 ${
                          isSelected ? currentTheme.selectedSubtext : 'text-slate-500'
                        }`}>
                          {opt.subtext}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {opt.badge && !isSelected && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md border border-slate-200">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black shadow-2xs ${currentTheme.selectedCheck}`}>
                        <Check size={12} strokeWidth={3} />
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
