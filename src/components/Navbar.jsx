import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Shield, ChevronRight, ChevronDown, Home, Sparkles, User, 
  Menu, X, UserPlus, LogOut, UserCheck, TrendingUp, Building2, Camera, ShieldCheck, Grid 
} from 'lucide-react';

const Navbar = ({ onRegisterClick, onSellClick, onListServiceClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'explore' | 'resources' | 'user' | null
  const timeoutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdminAuthenticated, logoutUser, logoutAdmin } = useApp();

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change without cascading effect renders
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }

  // Click / tap outside to close dropdowns & Escape key support
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isAuthenticated = (currentUser && currentUser.isLoggedIn) || isAdminAuthenticated;
  const isFreelancer = currentUser && currentUser.isLoggedIn && currentUser.role === 'freelancer';

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
          {/* Left: Brand Logo + WebRTC Live Pulse */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Logo variant="light" size="normal" />
            </Link>

          </div>

          {/* Center: Desktop Nav Links (Clean, merged into sleek dropdowns) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/90 text-xs font-bold text-slate-700">
            {/* 1. Home */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter(null)}
              onClick={() => {
                setActiveDropdown(null);
                if (location.pathname !== '/') navigate('/');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                location.pathname === '/' && !location.hash ? 'bg-white text-slate-900 shadow-xs font-black' : 'hover:text-emerald-800'
              }`}
            >
              Home
            </button>

            {/* 2. Explore Dropdown (Merged: Track Projects, Resale Units, Services & Experts) */}
            <div 
              className="relative nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('explore')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(prev => prev === 'explore' ? null : 'explore');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeDropdown === 'explore' || location.pathname.startsWith('/resale')
                    ? 'bg-white text-slate-950 shadow-xs font-black'
                    : 'hover:bg-white/80 hover:text-slate-950 text-slate-800'
                }`}
              >
                <span>Explore</span>
                <ChevronDown 
                  size={13} 
                  className={`transition-transform duration-200 ${activeDropdown === 'explore' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} 
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'explore' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 text-slate-800 space-y-1 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection('tracking-section')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">Track Construction</div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">Live tower CCTV, milestones & updates</div>
                      </div>
                    </button>

                    <Link
                      to="/resale"
                      onClick={() => setActiveDropdown(null)}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-start gap-3 group cursor-pointer ${
                        location.pathname.startsWith('/resale') ? 'bg-amber-50' : 'hover:bg-amber-50/80'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-900 flex items-center gap-1.5">
                          Resale Marketplace
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full">0% Fee</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">Verified buyer resale & distress units</div>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => scrollToSection('creative-marketing-section')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Camera size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-800">Services & Experts</div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">Photographers, drone pilots & editors</div>
                      </div>
                    </button>

                    <div className="pt-1.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onListServiceClick) onListServiceClick();
                        }}
                        className="w-full p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-bold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-500" />
                          List as Creator (₹699)
                        </span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Resources Dropdown (Merged: How It Works, Trust Standards, FAQs) */}
            <div 
              className="relative nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(prev => prev === 'resources' ? null : 'resources');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeDropdown === 'resources'
                    ? 'bg-white text-slate-950 shadow-xs font-black'
                    : 'hover:bg-white/80 hover:text-slate-950 text-slate-800'
                }`}
              >
                <span>Resources</span>
                <ChevronDown 
                  size={13} 
                  className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} 
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2.5 w-68 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 text-slate-800 space-y-1 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection('how-it-works')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Building2 size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">How It Works</div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">5-stage milestone escrow workflow</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('trust-section')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Trust Standards</div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">On-site audits & legal verification</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('faqs')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">FAQs</div>
                        <div className="text-[10px] text-slate-500 font-normal leading-tight">Common questions & instant answers</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Direct Role-Aware Quick Dashboard Shortcut */}
            {currentUser && currentUser.isLoggedIn && (
              <>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                {isFreelancer ? (
                  <Link
                    to="/provider-dashboard"
                    onMouseEnter={() => handleMouseEnter(null)}
                    onClick={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      location.pathname.startsWith('/provider-dashboard')
                        ? 'bg-purple-700 text-white shadow-xs font-black'
                        : 'text-purple-800 hover:bg-purple-50 font-bold'
                    }`}
                  >
                    <Grid size={13} />
                    <span>Creator Hub</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onMouseEnter={() => handleMouseEnter(null)}
                    onClick={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      location.pathname.startsWith('/dashboard')
                        ? 'bg-emerald-700 text-white shadow-xs font-black'
                        : 'text-emerald-800 hover:bg-emerald-50 font-bold'
                    }`}
                  >
                    <LayoutDashboard size={13} />
                    <span>Dashboard</span>
                  </Link>
                )}
              </>
            )}

            {/* Admin Console Pill */}
            {isAdminAuthenticated && (
              <>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <Link
                  to="/admin"
                  onMouseEnter={() => handleMouseEnter(null)}
                  onClick={() => setActiveDropdown(null)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-slate-900 text-white shadow-xs font-black'
                      : 'text-slate-800 hover:bg-slate-200 font-bold'
                  }`}
                >
                  <Shield size={13} className="text-amber-400" />
                  <span>Admin</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Primary Action: Sell Property */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter(null)}
              onClick={onSellClick}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm hover:shadow-md cursor-pointer border border-amber-400 whitespace-nowrap shrink-0"
            >
              <TrendingUp size={13} className="text-slate-950 stroke-[2.5]" />
              <span>Sell Property</span>
            </button>

            {/* UNAUTHENTICATED STATE: Clean Sign In & Sign Up Free Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  onMouseEnter={() => handleMouseEnter(null)}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <User size={14} />
                  <span>Log In</span>
                </Link>

                <Link
                  to="/signup"
                  onMouseEnter={() => handleMouseEnter(null)}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs hover:shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  <UserPlus size={14} />
                  <span>Sign Up Free</span>
                </Link>
              </div>
            ) : (
              /* AUTHENTICATED STATE: Rich Profile Dropdown */
              <div className="flex items-center gap-2">
                {currentUser && currentUser.isLoggedIn && (
                  <div 
                    className="relative nav-dropdown-wrapper"
                    onMouseEnter={() => handleMouseEnter('user')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(prev => prev === 'user' ? null : 'user');
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                        isFreelancer
                          ? 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 text-purple-900'
                          : 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isFreelancer ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="whitespace-nowrap max-w-[90px] sm:max-w-[120px] truncate">{currentUser.name}</span>
                      <span className={`hidden md:inline text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                        isFreelancer ? 'bg-purple-200 text-purple-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {isFreelancer ? 'Creator' : 'Buyer'}
                      </span>
                      <ChevronDown 
                        size={13} 
                        className={`transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'user' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-2.5 w-68 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 text-slate-800 space-y-1 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                        >
                          {/* User Details Header */}
                          <div className={`p-2.5 rounded-xl border ${
                            isFreelancer ? 'bg-purple-50/70 border-purple-100' : 'bg-emerald-50/70 border-emerald-100'
                          }`}>
                            <div className="text-xs font-black text-slate-900 truncate">{currentUser.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                            <div className="mt-1.5">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                isFreelancer ? 'bg-purple-200 text-purple-900' : 'bg-emerald-200 text-emerald-900'
                              }`}>
                                <UserCheck size={11} />
                                {isFreelancer ? 'Verified Creator / Freelancer' : 'Verified Property Buyer'}
                              </span>
                            </div>
                          </div>

                          {/* Role Specific Actions */}
                          {isFreelancer ? (
                            <>
                              <Link
                                to="/provider-dashboard"
                                onClick={() => setActiveDropdown(null)}
                                className="w-full text-left p-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-purple-900 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                  <Grid size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate">Freelancer Dashboard</div>
                                  <div className="text-[10px] text-slate-400 font-normal truncate">Inquiries, bookings & earnings</div>
                                </div>
                              </Link>

                              <Link
                                to={`/freelancer/${currentUser.providerId || 'SZ-ED-1001'}`}
                                onClick={() => setActiveDropdown(null)}
                                className="w-full text-left p-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-purple-900 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                  <Camera size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate">View Public Profile</div>
                                  <div className="text-[10px] text-slate-400 font-normal truncate">Instagram-style showcase</div>
                                </div>
                              </Link>

                              <Link
                                to="/dashboard"
                                onClick={() => setActiveDropdown(null)}
                                className="w-full text-left p-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                  <LayoutDashboard size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate">Property Tracking</div>
                                  <div className="text-[10px] text-slate-400 font-normal truncate">Booked units & milestones</div>
                                </div>
                              </Link>
                            </>
                          ) : (
                            <Link
                              to="/dashboard"
                              onClick={() => setActiveDropdown(null)}
                              className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-emerald-900 cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <LayoutDashboard size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="truncate">My Property Dashboard</div>
                                <div className="text-[10px] text-slate-400 font-normal truncate">Live construction & documents</div>
                              </div>
                            </Link>
                          )}

                          <div className="pt-1 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveDropdown(null);
                                logoutUser();
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2 text-xs font-bold cursor-pointer"
                            >
                              <LogOut size={14} />
                              <span>Log Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
      </motion.header>

      {/* Full-Screen Animated Mobile Menu Overlay with Architectural Grid */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-3xl p-5 flex flex-col justify-between overflow-y-auto text-white architectural-grid-dark"
          >
            {/* Top Header Row with Close Cross Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-md mx-auto w-full">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (location.pathname !== '/') navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer text-left"
              >
                <Logo variant="dark" size="normal" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Content */}
            <div className="py-4 space-y-4 max-w-md mx-auto w-full">
              {/* Section 1: Explore & Properties */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Explore Sriizan
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname !== '/') navigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-2xl font-black text-sm flex items-center gap-3 border transition-all cursor-pointer ${
                    location.pathname === '/'
                      ? 'bg-white/15 border-white/20 text-emerald-400'
                      : 'hover:bg-white/10 text-white border-white/5'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Home size={16} />
                  </div>
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('tracking-section')}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <span>Track Construction Projects</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/resale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-2xl font-black text-sm flex items-center gap-3 border transition-all cursor-pointer ${
                    location.pathname.startsWith('/resale')
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'hover:bg-white/10 text-white border-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    location.pathname.startsWith('/resale') ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    <TrendingUp size={16} />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span>Resale Marketplace</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">0% Fee</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('creative-marketing-section')}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Camera size={16} />
                  </div>
                  <span>Services & Expert Freelancers</span>
                </button>
              </div>

              {/* Section 2: Resources */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Platform & Trust
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Building2 size={16} />
                  </div>
                  <span>How It Works</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('faqs')}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/10 font-black text-sm flex items-center gap-3 border border-white/5 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-500/20 text-slate-300 flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <span>FAQs & Help</span>
                </button>
              </div>

              {/* Section 3: Actions */}
              <div className="space-y-2 pt-1">
                {/* List Profile */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onListServiceClick) onListServiceClick();
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm flex items-center justify-between transition-all cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0">
                      <UserPlus size={16} />
                    </div>
                    <div>
                      <span className="block text-xs font-black">List Profile (₹699 Lifetime)</span>
                      <span className="text-[10px] text-emerald-200 font-normal">Editors, Videographers & Marketers</span>
                    </div>
                  </div>
                  <ChevronRight size={16} />
                </button>

                {/* Sell Property */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSellClick) onSellClick();
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-between transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
                      <TrendingUp size={16} />
                    </div>
                    <span>Sell My Property (List Free)</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Bottom Auth & Info */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 max-w-md mx-auto w-full">
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-black text-xs text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <User size={14} /> Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signup');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-center shadow-md shadow-emerald-700/30 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <UserPlus size={14} /> Sign Up Free
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentUser && currentUser.isLoggedIn && (
                    <>
                      {isFreelancer ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              navigate('/provider-dashboard');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full p-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-black text-xs flex items-center justify-between cursor-pointer transition-colors shadow-md"
                          >
                            <div className="flex items-center gap-2">
                              <Grid size={16} />
                              <span>Creator Dashboard ({currentUser.name})</span>
                            </div>
                            <ChevronRight size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              navigate(`/freelancer/${currentUser.providerId || 'SZ-ED-1001'}`);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 font-bold text-xs flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Camera size={15} />
                              <span>View Public Showcase</span>
                            </div>
                            <ChevronRight size={15} />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate('/dashboard');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-between cursor-pointer transition-colors shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <LayoutDashboard size={16} />
                            <span>Buyer Dashboard ({currentUser.name})</span>
                          </div>
                          <ChevronRight size={16} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logoutUser();
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-900/90 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <LogOut size={14} />
                        <span>Log Out ({currentUser.name})</span>
                      </button>
                    </>
                  )}

                  {isAdminAuthenticated && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/admin');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-black text-xs flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Shield size={16} className="text-amber-400" />
                          <span>Builder Admin Panel</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logoutAdmin();
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-900/90 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <LogOut size={14} />
                        <span>Log Out Admin</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="text-center text-[10px] text-slate-500 font-bold pt-1">
                Sriizan &bull; Built • Tracked • Traded
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
