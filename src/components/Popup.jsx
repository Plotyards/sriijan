import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Sparkles } from 'lucide-react';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    let hideTimer;
    if (isVisible) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 7000);
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
          className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-6 md:right-auto z-50 max-w-sm bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700"></div>

          <div className="relative p-5">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer bg-slate-100 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3 mt-1">
              <div className="bg-emerald-100/80 border border-emerald-200 p-2.5 rounded-xl shrink-0 text-emerald-800">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="pr-4">
                <h4 className="font-extrabold text-slate-900 text-sm mb-1 leading-tight flex items-center gap-1.5">
                  <Sparkles size={14} className="text-emerald-700" /> Sriizan Live Tracker
                </h4>
                <p className="text-slate-600 font-medium text-xs leading-relaxed">
                  Over 10,000+ homebuyers are tracking construction progress & resale appreciation live!
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
