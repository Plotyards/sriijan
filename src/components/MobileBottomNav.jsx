import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useApp();

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleLaunchClick = () => {
    if (currentUser && currentUser.isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
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
        onClick={handleLaunchClick}
        className="pointer-events-auto relative overflow-hidden flex items-center justify-between w-full max-w-[360px] bg-white text-slate-900 py-3 px-4 rounded-[2rem] shadow-2xl transition-all active:scale-95 group border border-slate-200 cursor-pointer"
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <LayoutDashboard size={20} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider">PROMOHOMEX DASHBOARD</span>
            <span className="text-sm font-black tracking-wide text-slate-900">
              {currentUser && currentUser.isLoggedIn ? `Go To My Dashboard` : 'Launch Buyer Dashboard'}
            </span>
          </div>
        </div>
        
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center relative z-10 border border-slate-200">
          <ArrowRight className="w-4 h-4 text-amber-600 group-active:translate-x-1 transition-transform" />
        </div>
      </button>
    </motion.div>
  );
};

export default MobileBottomNav;
