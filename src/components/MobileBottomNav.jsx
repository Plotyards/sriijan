import React from 'react';
import { Target, ArrowRight } from 'lucide-react';

const MobileBottomNav = () => {
  const scrollToRegistration = () => {
    const element = document.getElementById('register');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden px-5 flex justify-center pointer-events-none">
      <button 
        onClick={scrollToRegistration}
        className="pointer-events-auto relative overflow-hidden flex items-center justify-center gap-3 w-full max-w-[340px] bg-gradient-to-r from-brand-red to-brand-yellow text-white font-bold py-4 px-6 rounded-full shadow-[0_10px_40px_rgba(226,157,34,0.5)] transition-transform active:scale-95 text-lg group border border-white/20"
      >
        {/* Animated background sheen effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-active:translate-x-full transition-transform duration-700 ease-out" />
        
        <Target className="w-6 h-6 animate-pulse" />
        <span className="relative z-10 tracking-wide">
          Track Your Property
        </span>
        <ArrowRight className="w-5 h-5 group-active:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default MobileBottomNav;
