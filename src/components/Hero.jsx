import { ArrowRight, ShieldCheck, Sparkles, Building2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero = ({ onRegisterClick }) => {
  return (
    <div className="relative min-h-[88vh] overflow-hidden bg-gradient-to-b from-amber-500/5 via-slate-50 to-white text-slate-900 flex items-center pb-16 lg:pb-0 pt-20 border-b border-slate-200/80">
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-[140px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4.5 py-2 rounded-full spatial-glass border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-6 text-amber-800 font-black text-xs sm:text-sm tracking-wider uppercase"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2.5 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.9)]"></span>
            Bharat’s Premier Construction Tracking Platform
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.08] text-slate-900">
            Tracking Homes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Building Trust.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mb-8 font-medium leading-relaxed">
            Empowering homebuyers with stage-wise construction progress, drone surveys, document vaults, and live market resale appreciation tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRegisterClick}
              className="px-8 py-4 rounded-2xl text-sm sm:text-base font-black text-slate-950 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-[0_10px_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2.5 group cursor-pointer border border-amber-300"
            >
              <span>Track Your Property Live</span>
              <ArrowRight className="h-4 w-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-bold">
            <div className="flex items-center gap-2 spatial-glass px-3.5 py-2 rounded-xl border border-white/80 shadow-xs">
              <ShieldCheck size={16} className="text-amber-600" /> RERA Stamped Reports
            </div>
            <div className="flex items-center gap-2 spatial-glass px-3.5 py-2 rounded-xl border border-white/80 shadow-xs">
              <Building2 size={16} className="text-amber-600" /> 100+ Verified Builders
            </div>
          </div>
        </motion.div>

        {/* Right side phone frame (Clean Light Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[550px] lg:h-[600px] w-full items-center justify-center hidden lg:flex perspective-[2000px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing background */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-300/30 rounded-full blur-[100px]"></div>

            {/* Smartphone Mockup (Light Theme) */}
            <motion.div
              initial={{ y: 15 }}
              animate={{ y: -15 }}
              transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
              className="relative w-[310px] h-[570px] bg-white rounded-[3rem] border-4 border-slate-300 shadow-2xl overflow-hidden transform-style-3d border-slate-200"
              style={{ transform: "translateZ(50px) rotateY(-10deg) rotateX(6deg)" }}
            >
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-200 rounded-b-2xl w-1/3 mx-auto z-50"></div>

              {/* Mock App Screen */}
              <div className="absolute inset-[4px] bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col pt-6">
                {/* Header with Logo */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between z-10 shadow-xs">
                  <Logo size="small" variant="light" />
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    LIVE TRACKER
                  </span>
                </div>

                {/* Dashboard Card Preview */}
                <div className="p-4 space-y-3 flex-1 overflow-hidden bg-slate-50 text-slate-900 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-amber-700 font-extrabold">
                      <span>TOWER B • UNIT 1402</span>
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded">68% DONE</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">Promohomex Residency</h4>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[68%]"></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold">Resale Market Valuation</div>
                    <div className="text-lg font-black text-slate-900">₹1.60 Crores</div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <TrendingUp size={12} /> +₹35 Lakhs Appreciation (+28%)
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-bold flex items-center gap-2 shadow-xs">
                    <Sparkles size={15} className="text-amber-600 shrink-0" /> HD Site Drone Survey Video Available
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
