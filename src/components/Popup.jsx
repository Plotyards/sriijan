import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp } from 'lucide-react';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay (e.g., 2 seconds)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    let hideTimer;
    if (isVisible) {
      // Hide popup after 6 seconds of being visible
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-36 md:bottom-10 left-4 right-4 md:left-6 md:right-auto z-50 max-w-sm bg-[#111]/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden"
        >
          {/* Subtle top gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow via-brand-red to-brand-yellow"></div>
          
          <div className="relative p-5">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-4 mt-1">
              <div className="bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 border border-brand-yellow/30 p-2.5 rounded-xl flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(226,157,34,0.15)]">
                <TrendingUp className="w-5 h-5 text-brand-yellow" />
              </div>
              <div className="pr-4">
                <h4 className="font-bold text-white text-base mb-1.5 leading-tight tracking-wide">
                  Join The Community!
                </h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed capitalize">
                  10,000+ Buyers Are Tracking Their Property
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
