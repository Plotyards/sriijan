import { ArrowRight, LayoutDashboard, Home, Layers, Building2, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdminAuthenticated } = useApp();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdmin = location.pathname.startsWith('/admin');

  const handleLaunchClick = () => {
    if (currentUser && currentUser.isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // If on Dashboard or Admin on mobile, show Native App Bottom Tab Bar using Grid Templates
  if (isDashboard || isAdmin) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-2 left-2 right-2 z-50 md:hidden pointer-events-auto"
      >
        <div className="bg-slate-950/95 backdrop-blur-2xl text-white p-1.5 rounded-2xl shadow-2xl border border-slate-800/90 grid grid-cols-5 gap-1 w-full text-center overflow-hidden items-center justify-items-center">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl cursor-pointer transition-all w-full overflow-hidden ${
              location.pathname === '/' ? 'text-emerald-500 font-bold bg-white/10' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home size={17} className="shrink-0" />
            <span className="text-[9px] font-black tracking-tight truncate w-full">Home</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl cursor-pointer transition-all w-full overflow-hidden ${
              isDashboard ? 'text-emerald-500 font-bold bg-white/10' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={17} className="shrink-0" />
            <span className="text-[9px] font-black tracking-tight truncate w-full">Unit Types</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl cursor-pointer transition-all text-slate-400 hover:text-white w-full overflow-hidden"
          >
            <Building2 size={17} className="shrink-0 text-emerald-600" />
            <span className="text-[9px] font-black tracking-tight truncate w-full">Tracker</span>
          </button>

          <button
            onClick={() => navigate('/admin')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl cursor-pointer transition-all w-full overflow-hidden ${
              isAdmin ? 'text-emerald-500 font-bold bg-white/10' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield size={17} className="shrink-0" />
            <span className="text-[9px] font-black tracking-tight truncate w-full">Admin</span>
          </button>

          {!currentUser?.isLoggedIn && !isAdminAuthenticated ? (
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl cursor-pointer text-slate-400 hover:text-white w-full overflow-hidden"
            >
              <User size={17} className="shrink-0" />
              <span className="text-[9px] font-black tracking-tight truncate w-full">Login</span>
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center gap-0.5 py-1 px-1 text-emerald-400 font-bold w-full overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-[9px] font-black tracking-tight truncate w-full">Active</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

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
          <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
            <LayoutDashboard size={20} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider">SRIIZAN DASHBOARD</span>
            <span className="text-sm font-black tracking-wide text-slate-900">
              {currentUser && currentUser.isLoggedIn ? `Go To My Dashboard` : 'Launch Buyer Dashboard'}
            </span>
          </div>
        </div>
        
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center relative z-10 border border-slate-200">
          <ArrowRight className="w-4 h-4 text-emerald-700 group-active:translate-x-1 transition-transform" />
        </div>
      </button>
    </motion.div>
  );
};

export default MobileBottomNav;
