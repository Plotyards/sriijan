import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Shield, ChevronRight, Home, Layers, Sparkles, User, Menu, X, UserPlus, LogOut, UserCheck } from 'lucide-react';

const Navbar = () => {
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
    { label: 'Home', path: '/', isScroll: false },
    { label: 'How It Works', id: 'how-it-works', isScroll: true },
    { label: 'Features', id: 'features', isScroll: true },
    { label: 'FAQs', id: 'faqs', isScroll: true },
  ];

  const isAuthenticated = (currentUser && currentUser.isLoggedIn) || isAdminAuthenticated;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-7xl transition-all duration-300 rounded-2xl md:rounded-full ${
            scrolled
              ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2.5 px-4 sm:px-6'
              : 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-3 px-4 sm:px-6'
          } flex justify-between items-center`}
        >
          {/* Left: Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="transition-transform group-hover:scale-105">
              <Logo variant="light" size="normal" />
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 text-xs font-extrabold text-slate-700">
            {navLinks.map((link) => {
              const isActive = link.isScroll ? false : location.pathname === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.isScroll) {
                      scrollToSection(link.id);
                    } else {
                      navigate(link.path);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs font-black'
                      : 'hover:text-amber-700 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* If Authenticated as Buyer */}
            {currentUser && currentUser.isLoggedIn && (
              <>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                    location.pathname.startsWith('/dashboard')
                      ? 'bg-amber-600 text-white shadow-xs font-black'
                      : 'text-amber-800 hover:bg-amber-50 font-extrabold'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <Shield size={14} className="text-amber-500" /> Admin Panel
                </Link>
              </>
            )}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* UNAUTHENTICATED STATE: Show Dedicated Login & Sign Up Links (Desktop / Tablet) */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-xs font-black text-slate-800 hover:text-amber-700 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 whitespace-nowrap shrink-0"
                >
                  <User size={15} /> Log In
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer border border-amber-300 whitespace-nowrap shrink-0"
                >
                  <UserPlus size={15} /> Sign Up
                </Link>
              </div>
            ) : (
              /* AUTHENTICATED STATE: Show Profile / Logout */
              <div className="flex items-center gap-2">
                {currentUser && currentUser.isLoggedIn && (
                  <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold text-amber-900 shrink-0">
                    <UserCheck size={14} className="text-amber-600" />
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
                    <Shield size={14} className="text-amber-400" />
                    <span className="whitespace-nowrap">Builder Admin</span>
                    <button
                      onClick={logoutAdmin}
                      className="ml-1 text-slate-400 hover:text-amber-400 p-0.5 cursor-pointer"
                      title="Log Out Admin"
                    >
                      <LogOut size={13} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100/90 text-slate-800 hover:bg-slate-200 transition-colors border border-slate-200/80 cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Full-Screen Animated Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-3xl text-white pt-24 pb-10 px-6 flex flex-col justify-between overflow-y-auto pointer-events-auto"
            >
              {/* Header inside full-screen menu with prominent Cross / Close button */}
              <div className="max-w-md mx-auto w-full flex items-center justify-between pt-2 pb-4 border-b border-slate-800">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md"
                  title="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Top Navigation Links */}
              <div className="space-y-6 max-w-md mx-auto w-full pt-4">

                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left p-4 rounded-2xl hover:bg-white/10 font-black text-base flex items-center gap-3 border border-white/5 transition-all active:scale-98"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Home size={18} />
                    </div>
                    Home Page
                  </Link>

                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="w-full text-left p-4 rounded-2xl hover:bg-white/10 font-black text-base flex items-center gap-3 border border-white/5 transition-all cursor-pointer active:scale-98"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Layers size={18} />
                    </div>
                    How It Works
                  </button>

                  <button
                    onClick={() => scrollToSection('features')}
                    className="w-full text-left p-4 rounded-2xl hover:bg-white/10 font-black text-base flex items-center gap-3 border border-white/5 transition-all cursor-pointer active:scale-98"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Sparkles size={18} />
                    </div>
                    Features
                  </button>
                </div>

                {/* Account & Action Controls */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-1 gap-3">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-sm shadow-md active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <User size={18} className="text-amber-400" /> Log In
                        </span>
                        <ChevronRight size={18} />
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 active:scale-98"
                      >
                        <span className="flex items-center gap-2">
                          <UserPlus size={18} /> Sign Up Free
                        </span>
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentUser && currentUser.isLoggedIn && (
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm shadow-lg active:scale-98"
                        >
                          <span className="flex items-center gap-2">
                            <LayoutDashboard size={18} /> Launch Buyer Dashboard
                          </span>
                          <ChevronRight size={18} />
                        </Link>
                      )}

                      {isAdminAuthenticated && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white font-black text-sm border border-slate-800 shadow-md active:scale-98"
                        >
                          <span className="flex items-center gap-2">
                            <Shield size={18} className="text-amber-400" /> Admin Control Panel
                          </span>
                          <ChevronRight size={18} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Brand Tagline */}
              <div className="text-center text-xs text-slate-500 font-bold pt-6 border-t border-slate-900 max-w-md mx-auto w-full">
                Promohomex &bull; Real-Time Property Tracking Platform
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
