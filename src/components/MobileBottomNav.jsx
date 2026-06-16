import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const scrollToRegistration = () => {
    const element = document.getElementById('register');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      className="fixed bottom-6 left-0 right-0 z-50 md:hidden px-4 flex justify-center pointer-events-none"
    >
      <button 
        onClick={scrollToRegistration}
        className="pointer-events-auto relative overflow-hidden flex items-center justify-between w-full max-w-[360px] bg-gray-900/90 backdrop-blur-2xl text-white py-3 px-4 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all active:scale-95 group border border-white/10"
      >
        {/* Shimmer effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-active:animate-[shimmer_1s_infinite] animate-[shimmer_3s_infinite]" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-brand-red flex items-center justify-center shadow-[0_0_15px_rgba(226,157,34,0.4)]">
            <Target className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Stay Updated</span>
            <span className="text-base font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Track Property
            </span>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center relative z-10 border border-white/10 group-hover:bg-white/10 transition-colors">
          <ArrowRight className="w-5 h-5 text-brand-yellow group-active:translate-x-1 transition-transform" />
        </div>
      </button>
    </motion.div>
  );
};

export default MobileBottomNav;
