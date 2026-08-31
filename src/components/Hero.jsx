import { ArrowRight, ShieldCheck, Sparkles, Building2, TrendingUp, Compass, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import DualActionHub from './home/DualActionHub';

const Hero = ({ onTrackClick, onSellClick }) => {
  return (
    <div className="relative min-h-[92vh] overflow-hidden bg-slate-50 text-slate-900 flex flex-col justify-center pt-24 sm:pt-28 pb-12 border-b border-slate-200/90">
      {/* Architectural CAD Blueprint Gridlines Background with Radial Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none architectural-grid blueprint-mask opacity-85"></div>

      {/* Dual Radiant Ambient Light Orbs (Emerald + Champagne Gold) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/4 w-[550px] h-[550px] bg-emerald-300/20 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute bottom-16 right-1/4 w-[450px] h-[450px] bg-amber-300/15 rounded-full blur-[130px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Subtle CAD Blueprint Corner Crosshairs */}
      <div className="absolute top-28 left-6 hidden xl:block text-emerald-800/30 font-mono text-[11px] select-none pointer-events-none">
        + LAT 28.4595° N • LONG 77.0266° E [CAD-SURVEY]
      </div>
      <div className="absolute top-28 right-6 hidden xl:block text-emerald-800/30 font-mono text-[11px] select-none pointer-events-none">
        + RERA AUDIT SPEC 2026.08
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left side text content (7 columns) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left lg:col-span-7 space-y-6"
        >
          {/* Institutional Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-600/30 shadow-[0_4px_20px_rgba(4,120,87,0.12)] text-emerald-950 font-black text-xs sm:text-sm tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Bharat’s Construction Tracking + Resale Marketplace</span>
          </motion.div>

          {/* Majestic Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.06] text-slate-900">
            Know What's Being Built. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Know What's Available.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Sriizan connects buyers, builders, and property owners on a unified transparent ledger — from the first foundation pour to 4K drone surveillance and verified resale exits.
          </p>

          {/* Color-Differentiated Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            {/* CTA 1: Forest Emerald (Construction Tracking) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTrackClick}
              className="px-7 py-4 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 transition-all duration-300 shadow-[0_10px_25px_rgba(4,120,87,0.3)] flex items-center justify-center gap-2.5 group cursor-pointer border border-emerald-600"
            >
              <Building2 className="h-4 w-4 text-emerald-300" />
              <span>Track Construction Live</span>
              <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* CTA 2: Warm Champagne Gold (Sell My Property) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSellClick}
              className="px-7 py-4 rounded-2xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-[0_10px_25px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2.5 cursor-pointer border border-amber-400"
            >
              <TrendingUp className="h-4 w-4 text-slate-950 stroke-[2.5]" />
              <span>Sell My Property (List Free)</span>
            </motion.button>
          </div>

          {/* Institutional Trust Pillars Bottom Row */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-700 font-bold">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>100% RERA Audited</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <Video size={16} className="text-cyan-600" />
              <span>Monthly 4K Drone Audits</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <Sparkles size={16} className="text-amber-500" />
              <span>Zero Brokerage Resale</span>
            </div>
          </div>
        </motion.div>

        {/* Right side floating smartphone mockup (5 columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:col-span-5 h-[530px] sm:h-[580px] w-full items-center justify-center hidden lg:flex perspective-[2000px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Emerald-Gold Aura */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-emerald-400/25 rounded-full blur-[90px]"></div>

            {/* Smartphone Mockup */}
            <motion.div
              initial={{ y: 12 }}
              animate={{ y: -12 }}
              transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
              className="relative w-[310px] h-[550px] bg-slate-950 rounded-[3rem] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border-4 border-slate-700 transform-style-3d"
              style={{ transform: "translateZ(40px) rotateY(-8deg) rotateX(5deg)" }}
            >
              {/* Screen Content */}
              <div className="w-full h-full bg-slate-50 rounded-[2.3rem] overflow-hidden flex flex-col pt-3 border border-slate-200">
                {/* Phone Notch */}
                <div className="h-5 bg-slate-900 rounded-b-xl w-28 mx-auto -mt-3 mb-2"></div>

                {/* Mock App Header */}
                <div className="bg-white px-3.5 py-2 border-b border-slate-200 flex items-center justify-between shadow-xs">
                  <Logo size="small" variant="light" />
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                    LIVE TRACKER
                  </span>
                </div>

                {/* Dashboard Card Preview */}
                <div className="p-3.5 space-y-3 flex-1 overflow-hidden bg-slate-100/60 text-xs">
                  {/* Construction Card */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-emerald-800 font-extrabold">
                      <span>TOWER B • UNIT 1402</span>
                      <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-mono">68% DONE</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">Sriizan Residency</h4>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[68%]"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      Current: <strong>Brickwork & Plaster (85%)</strong>
                    </div>
                  </div>

                  {/* Resale Market Valuation Card */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold">Resale Market Valuation</div>
                    <div className="text-lg font-black text-slate-900">₹1.60 Crores</div>
                    <div className="text-[10px] text-amber-600 font-extrabold flex items-center gap-1">
                      <TrendingUp size={12} className="stroke-[2.5]" /> +₹35 Lakhs Gain (+28%)
                    </div>
                  </div>

                  {/* 4K Drone Survey Clip Pill */}
                  <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-[10.5px] text-cyan-950 font-bold flex items-center gap-2 shadow-xs">
                    <Video size={14} className="text-cyan-600 shrink-0" />
                    <span>August 2026 Drone Audit Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dual-Action Interactive Command Hub (Track Construction + Sell My Property) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
        <DualActionHub onOpenSellModal={onSellClick} onTrackSelect={onTrackClick} />
      </div>
    </div>
  );
};

export default Hero;
