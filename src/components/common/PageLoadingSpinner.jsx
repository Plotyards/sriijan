import { motion } from 'framer-motion';
import Logo from '../Logo';

const PageLoadingSpinner = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-500/20 flex items-center justify-center">
            <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-xs font-black uppercase tracking-widest text-slate-700">Loading Sriizan</div>
          <div className="text-[11px] text-slate-400 font-medium">Preparing verified view...</div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageLoadingSpinner;
