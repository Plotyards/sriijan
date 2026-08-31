import { ArrowRight, ShieldCheck, Building2, TrendingUp, Lock, Sparkles, Wifi, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero = ({ onTrackClick, onSellClick }) => {
  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-slate-50 text-slate-900 flex items-center pt-28 sm:pt-32 pb-16 border-b border-slate-200/80">
      {/* Soft Architectural Gridlines (Subtle & Elegant) */}
      <div className="absolute inset-0 z-0 pointer-events-none architectural-grid blueprint-mask opacity-70"></div>

      {/* Gentle Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Clean, Spacious Headline & CTAs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left lg:col-span-7 space-y-6"
        >
          {/* Subtle Top Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Bharat's Premier Construction Tracking & Resale Marketplace</span>
          </div>

          {/* Clean Majestic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-black tracking-tight leading-[1.08] text-slate-950 font-serif">
            Know What's Being Built. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Know What's Available.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Track stage-by-stage construction milestones with certified civil audits, or list your under-construction flat for resale with zero brokerage harassment.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            {/* Primary CTA: Track Construction */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTrackClick}
              className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 transition-all duration-300 shadow-[0_10px_25px_rgba(4,120,87,0.25)] flex items-center justify-center gap-2.5 cursor-pointer border border-emerald-600"
            >
              <Building2 className="h-4 w-4 text-emerald-300" />
              <span>Track Construction Live</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.button>

            {/* Secondary CTA: Sell My Property */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSellClick}
              className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-[0_10px_25px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2.5 cursor-pointer border border-amber-400"
            >
              <TrendingUp className="h-4 w-4 text-slate-950 stroke-[2.5]" />
              <span>Sell My Property (List Free)</span>
            </motion.button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>100% RERA Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-emerald-700" />
              <span>Encrypted Owner-Only Media</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-500" />
              <span>Direct Resale Buyers</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Ultra-Realistic iPhone 16 Pro Mockup (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          {/* Realistic iPhone 16 Pro Titanium Frame */}
          <div className="relative w-[305px] h-[610px] bg-slate-950 rounded-[52px] p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border-[5px] border-slate-700/80 ring-1 ring-white/20 select-none">
            {/* Glossy Screen Glass Glare */}
            <div className="absolute inset-2.5 rounded-[46px] bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-30"></div>

            {/* Inner Display Screen */}
            <div className="w-full h-full bg-slate-50 rounded-[44px] overflow-hidden flex flex-col relative z-20">
              {/* Dynamic Island Header Bar */}
              <div className="bg-white pt-2.5 pb-2 px-5 flex items-center justify-between z-40 border-b border-slate-100">
                <span className="text-[11px] font-black text-slate-900 font-mono">9:41</span>
                
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-900">
                  <Wifi size={11} />
                  <Battery size={13} />
                </div>
              </div>

              {/* In-App App Bar */}
              <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <Logo size="small" variant="light" />
                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Unit
                </span>
              </div>

              {/* App Content Body */}
              <div className="p-3.5 space-y-3 flex-1 overflow-y-auto bg-slate-100/70 text-xs">
                {/* Unit Progress Card */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-extrabold text-slate-500 uppercase tracking-wider">TOWER B • UNIT 1402</span>
                    <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">68% DONE</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">Sriizan Grand Residency</h4>
                  
                  {/* Progress Bar */}
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

                {/* Resale Market Value */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Current Market Resale</div>
                  <div className="text-xl font-black text-slate-900">₹1.60 Crores</div>
                  <div className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                    <TrendingUp size={12} className="stroke-[2.5]" /> +₹35 Lakhs Gain (+28%)
                  </div>
                </div>

                {/* Owner Privacy Protected Media Card */}
                <div className="bg-emerald-950 text-white p-3.5 rounded-2xl space-y-2 shadow-sm border border-emerald-800/60">
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                    <Lock size={12} /> Confidential Owner Feed
                  </div>
                  <p className="text-[10.5px] text-slate-300 leading-snug">
                    4K Drone video survey and August milestone logs are locked for verified allottees.
                  </p>
                  <div className="pt-1">
                    <span className="text-[9.5px] font-bold text-amber-400 flex items-center gap-1">
                      ● Active Live Stream Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="bg-white py-2 flex justify-center border-t border-slate-100">
                <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
