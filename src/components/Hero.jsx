import { ArrowRight, ShieldCheck, Building2, TrendingUp, Lock, Sparkles, Wifi, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero = ({ onTrackClick, onSellClick }) => {
  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900 pt-28 sm:pt-36 pb-16 sm:pb-20 border-b border-slate-200/80">
      {/* Subtle Architectural Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none architectural-grid opacity-60"></div>

      {/* Soft Ambient Radiance */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/3 w-[550px] h-[550px] bg-emerald-200/20 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-8 right-1/4 w-[400px] h-[400px] bg-amber-200/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Clean & Powerful Typography (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left lg:col-span-7 space-y-6"
        >
          {/* Top Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-900 font-extrabold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Bharat’s Construction Tracking + Resale Marketplace</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-tight leading-[1.08] text-slate-950 font-serif">
            Know What's Being Built. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Know What's Available.
            </span>
          </h1>

          {/* Body Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
            Monitor verified civil construction milestones and drone surveys for your under-construction flat — or list directly on India's transparent resale marketplace.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTrackClick}
              className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 transition-all duration-200 shadow-md shadow-emerald-800/20 flex items-center justify-center gap-2.5 cursor-pointer border border-emerald-600"
            >
              <Building2 className="h-4 w-4 text-emerald-300" />
              <span>Track Construction Live</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSellClick}
              className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2.5 cursor-pointer border border-amber-400"
            >
              <TrendingUp className="h-4 w-4 text-slate-950 stroke-[2.5]" />
              <span>Sell My Property (List Free)</span>
            </motion.button>
          </div>

          {/* Institutional Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-semibold border-t border-slate-200/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>100% RERA Registered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={15} className="text-emerald-700" />
              <span>Encrypted Owner-Only Media</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-amber-500" />
              <span>Direct Resale Buyers</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Pristine, Razor-Sharp iPhone 16 Pro Mockup (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          {/* True-Scale iPhone 16 Pro Frame (Upright, Clean, Retina-Crisp) */}
          <div className="w-[300px] sm:w-[315px] bg-slate-950 rounded-[50px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.28)] border-[5px] border-slate-700/80 ring-1 ring-white/20 select-none relative">
            {/* Screen Inner Container */}
            <div className="w-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col border border-slate-200">
              {/* Dynamic Island Notch & iOS Header */}
              <div className="bg-white pt-2.5 pb-2 px-5 flex items-center justify-between border-b border-slate-100">
                <span className="text-[11px] font-black text-slate-900 font-mono">9:41</span>
                
                {/* Dynamic Island Capsule */}
                <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-800">
                  <Wifi size={11} />
                  <Battery size={13} />
                </div>
              </div>

              {/* App Bar Inside Phone */}
              <div className="bg-white px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <Logo size="small" variant="light" />
                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Unit
                </span>
              </div>

              {/* In-App Content Screen */}
              <div className="p-3.5 space-y-3 bg-slate-100/80 text-xs">
                {/* Progress Card */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-extrabold text-slate-500 uppercase tracking-wider">TOWER B • UNIT 1402</span>
                    <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">68% DONE</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">Sriizan Grand Residency</h4>
                  
                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                      <div className="bg-emerald-600 h-full w-[68%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[9.5px] text-slate-500 font-semibold pt-0.5">
                      <span>Brickwork (85%)</span>
                      <span>Possession: Dec 2026</span>
                    </div>
                  </div>
                </div>

                {/* Resale Market Valuation */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Market Resale Valuation</div>
                  <div className="text-xl font-black text-slate-900">₹1.60 Crores</div>
                  <div className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                    <TrendingUp size={12} className="stroke-[2.5]" /> +₹35 Lakhs Appreciation (+28%)
                  </div>
                </div>

                {/* Owner Privacy Protected Media Card */}
                <div className="bg-emerald-950 text-white p-3.5 rounded-2xl space-y-1.5 shadow-xs border border-emerald-800/60">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                    <Lock size={12} /> Confidential Owner Feed
                  </div>
                  <p className="text-[10.5px] text-slate-300 leading-snug">
                    4K Drone flythrough video & August civil stage inspection logs are encrypted for unit owner.
                  </p>
                  <div className="pt-1">
                    <span className="text-[9.5px] font-bold text-amber-400 flex items-center gap-1">
                      ● 4K Drone Flight Stream Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* iOS Home Indicator */}
              <div className="bg-white py-2 flex justify-center border-t border-slate-100">
                <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
