import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero = ({ onRegisterClick }) => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-gray-900 text-white flex items-center">
      {/* Modern animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-red opacity-20"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-[500px] h-[500px] bg-brand-red-light rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side text content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mt-8 sm:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-brand-yellow font-medium text-xs sm:text-sm tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow mr-2 animate-pulse"></span>
            Bharat’s First Construction Tracking Platform
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.1]">
            Tracking Homes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">
              Building Trust.
            </span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-2xl text-gray-300 max-w-2xl mb-8 sm:mb-10 font-light capitalize">
            Empowering homebuyers with transparent, timely updates about your property's progress and value appreciation.
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button 
              onClick={onRegisterClick}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-[0_0_40px_rgba(226,157,34,0.4)] text-base sm:text-lg font-medium text-gray-900 bg-brand-yellow hover:bg-brand-yellow-light transition-all duration-300"
            >
              Start Tracking Now
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right side static 3D element container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center hidden lg:flex perspective-[2000px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing orb behind */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow/30 rounded-full blur-[120px]"></div>

            {/* Floating 3D Smartphone Frame (Static) */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: -20 }}
              transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
              className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden transform-style-3d"
              style={{ transform: "translateZ(50px) rotateY(-15deg) rotateX(10deg) rotateZ(5deg)" }}
            >
              {/* Phone Notch/Dynamic Island */}
              <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl w-1/3 mx-auto z-50"></div>

              {/* Phone Screen / WhatsApp Mockup */}
              <div className="absolute inset-[4px] bg-[#EFEAE2] rounded-[2.5rem] overflow-hidden flex flex-col">
                {/* App Header */}
                <div className="bg-[#075E54] text-white px-4 py-5 pb-3 flex items-center gap-3 pt-8 shadow-md z-10">
                  <div className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl p-1 h-10 w-24 overflow-hidden">
                    <Logo className="scale-[0.35] origin-center" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] leading-tight">Promohomex Updates</h4>
                    <p className="text-[11px] text-white/80">Ocean View A-102</p>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 space-y-4 overflow-hidden flex flex-col justify-end pb-8 relative z-0">
                  {/* Chat background pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] bg-cover mix-blend-overlay"></div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start relative z-10"
                  >
                    <p className="text-sm text-gray-800">Hello! Here is the latest progress on your property. 🏗️</p>
                    <span className="text-[10px] text-gray-400 mt-1 block text-right">10:00 AM</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="bg-white p-2 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start relative z-10"
                  >
                    <div className="w-full h-32 bg-gray-200 rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center"></div>
                    </div>
                    <p className="text-sm text-gray-800 mt-2 px-1">Floor 4 slab casting completed today!</p>
                    <span className="text-[10px] text-gray-400 mt-1 block text-right">10:02 AM</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 }}
                    className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%] self-end relative z-10"
                  >
                    <p className="text-sm text-gray-800">Looks amazing! Thanks for the update.</p>
                    <span className="text-[10px] text-gray-500 mt-1 block text-right">10:05 AM</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification Badge */}
            <motion.div 
              className="absolute z-20 w-56 h-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-4 flex items-center gap-4 transform translate-x-32 -translate-y-24"
              style={{ transform: "translateZ(100px)" }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/50">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Value Increased</h4>
                <p className="text-brand-yellow text-xs font-bold">+ ₹4.5 Lakhs</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
