import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrackClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'register' } });
    } else {
      onRegisterClick();
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none"
    >
      <div 
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 rounded-full ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-2xl backdrop-saturate-200 border-[0.5px] border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
            : 'bg-transparent backdrop-blur-md border border-white/10 shadow-sm'
        } px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center`}
      >
        <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
          <Logo />
        </Link>
        

        <div className="flex items-center">
          <button 
            onClick={handleTrackClick} 
            className="relative overflow-hidden group bg-gradient-to-r from-brand-red to-[#c00000] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(155,0,0,0.4)] hover:shadow-[0_0_25px_rgba(226,157,34,0.5)] transform hover:-translate-y-0.5 whitespace-nowrap border border-white/20"
          >
            <span className="relative z-10">Track Property</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
