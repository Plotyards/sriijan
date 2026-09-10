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

  // Floating "Launch Buyer Dashboard" pill removed on public mobile views as requested
  return null;
};

export default MobileBottomNav;
