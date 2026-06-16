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
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-6 md:right-auto z-50 max-w-sm bg-white rounded-xl shadow-2xl border-l-4 border-brand-yellow overflow-hidden"
        >
          <div className="relative p-5">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 mt-1">
              <div className="bg-yellow-100 p-2.5 rounded-full flex-shrink-0 mt-1">
                <TrendingUp className="w-6 h-6 text-brand-yellow" />
              </div>
              <div className="pr-4">
                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
                  Join The Community!
                </h4>
                <p className="text-gray-600 font-medium capitalize">
                  10,000 Buyers Are Tracking Their Property
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
