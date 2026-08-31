import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Shield, ChevronRight, Home, Sparkles, User, 
  Menu, X, UserPlus, LogOut, UserCheck, TrendingUp, Building2, Camera, ShieldCheck 
} from 'lucide-react';

const Navbar = ({ onRegisterClick, onSellClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdminAuthenticated, logoutUser, logoutAdmin } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'How It Works', id: 'journey', isScroll: true, dotColor: 'bg-emerald-500' },
    { label: 'Resale Market', id: 'resale', isScroll: true, dotColor: 'bg-amber-400' },
    { label: 'Track Construction', id: 'register', isScroll: true, dotColor: 'bg-emerald-600' },
    { label: 'FAQs', id: 'faqs', isScroll: true, dotColor: 'bg-slate-400' },
  ];

  const isAuthenticated = (currentUser && currentUser.isLoggedIn) || isAdminAuthenticated;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-3 sm:top-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-7xl transition-all duration-300 rounded-2xl md:rounded-full ${
            scrolled
              ? 'bg-white/92 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_15px_45px_rgba(4,120,87,0.12)] py-2 sm:py-2.5 px-4 sm:px-6'
              : 'bg-white/85 backdrop-blur-xl border border-emerald-500/15 shadow-[0_10px_35px_rgba(4,120,87,0.06)] py-2.5 sm:py-3 px-4 sm:px-6'
          } flex justify-between items-center`}
        >
          {/* Left: Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Logo variant="light" size="normal" />
          </Link>

          {/* Center: Desktop Nav Links with Color-Coded Indicators */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 text-xs font-extrabold text-slate-700">
            <button
              onClick={() => {
                if (location.pathname !== '/') navigate('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                location.pathname === '/' ? 'bg-white text-slate-900 shadow-xs font-black' : 'hover:text-emerald-800'
              }`}
            >
              Home
            </button>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/70 hover:text-slate-950 flex items-center gap-1.5"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${link.dotColor}`}></span>
                <span>{link.label}</span>
              </button>
            ))}

            {/* If Authenticated as Buyer */}
            {currentUser && currentUser.isLoggedIn && (
              <>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                    location.pathname.startsWith('/dashboard')
                      ? 'bg-emerald-700 text-white shadow-xs font-black'
                      : 'text-emerald-800 hover:bg-emerald-50 font-extrabold'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <LayoutDashboard size={14} /> My Dashboard
                </Link>
              </>
            )}

            {/* If Authenticated as Admin */}
            {isAdminAuthenticated && (
              <>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-slate-900 text-white shadow-xs font-black'
                      : 'text-slate-800 hover:bg-slate-200 font-extrabold'
                  }`}
                >
                  <Shield size={14} className="text-amber-400" /> Admin Panel
                </Link>
              </>
            )}
          </nav>

          {/* Right: Actions (Color Differentiated) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Action A: Sell Property (Warm Champagne Gold Pill) */}
            <button
              type="button"
              onClick={onSellClick}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-98 cursor-pointer border border-amber-400/80 whitespace-nowrap shrink-0"
            >
              <TrendingUp size={13} className="text-slate-950 stroke-[2.5]" />
              <span>Sell Property</span>
            </button>

            {/* UNAUTHENTICATED STATE: Show Dedicated Login & Sign Up Links */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-xs font-black text-slate-800 hover:text-emerald-800 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200/90 whitespace-nowrap shrink-0"
                >
                  <User size={14} /> Log In
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_4px_16px_rgba(4,120,87,0.25)] hover:scale-105 active:scale-98 cursor-pointer border border-emerald-600 whitespace-nowrap shrink-0"
                >
                  <UserPlus size={14} /> Sign Up
                </Link>
              </div>
            ) : (
              /* AUTHENTICATED STATE: Show Profile / Logout */
              <div className="flex items-center gap-2">
                {currentUser && currentUser.isLoggedIn && (
                  <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-900 shrink-0">
                    <UserCheck size={14} className="text-emerald-700" />
                    <span className="whitespace-nowrap">{currentUser.name}</span>
                    <button
                      onClick={logoutUser}
                      className="ml-1 text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      title="Log Out"
                    >
                      <LogOut size={13} />
                    </button>
                  </div>
                )}

                {isAdminAuthenticated && (
                  <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold shrink-0">
                    <Shield size={14} className="text-emerald-400" />
                    <span className="whitespace-nowrap">Builder Admin</span>
                    <button
                      onClick={logoutAdmin}
                      className="ml-1 text-slate-400 hover:text-emerald-400 p-0.5 cursor-pointer"
                      title="Log Out Admin"
                    >
                      <LogOut size={13} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-emerald-50 focus:outline-none cursor-pointer border border-slate-200"
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Full-Screen Animated Mobile Menu Overlay with Architectural Grid */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-3xl p-5 flex flex-col justify-between overflow-y-auto text-white architectural-grid-dark"
            >
              {/* Top Header Row with Close Cross Button */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-md mx-auto w-full">
                <Logo variant="dark" size="normal" />

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links Group */}
              <div className="py-4 space-y-3 max-w-md mx-auto w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname !== '/') navigate('/');
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left p-3.5 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Home size={18} />
                  </div>
                  <span>Home</span>
                </button>

                <button
                  onClick={() => scrollToSection('journey')}
                  className="w-full text-left p-3.5 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                  <span>How It Works</span>
                </button>

                <button
                  onClick={() => scrollToSection('resale')}
                  className="w-full text-left p-3.5 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                  <span>Resale Marketplace</span>
                </button>

                <button
                  onClick={() => scrollToSection('register')}
                  className="w-full text-left p-3.5 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <span>Track Construction</span>
                </button>

                {/* Prominent Sell Button in Mobile */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSellClick) onSellClick();
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-between transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center">
                      <TrendingUp size={18} />
                    </div>
                    <span>Sell My Property (List Free)</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Bottom Auth & Info */}
              <div className="pt-4 border-t border-slate-800 space-y-3 max-w-md mx-auto w-full">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-black text-xs text-center"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-center shadow-md shadow-emerald-700/30"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full p-3.5 rounded-xl bg-emerald-700 text-white font-black text-xs flex items-center justify-between"
                  >
                    <span>Launch Buyer Dashboard</span>
                    <ChevronRight size={16} />
                  </Link>
                )}

                <div className="text-center text-[10px] text-slate-500 font-bold pt-2">
                  Sriizan &bull; Built • Tracked • Traded
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
