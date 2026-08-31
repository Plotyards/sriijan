import { motion } from 'framer-motion';
import { ShoppingBag, Eye, KeyRound, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const UserJourneyMap = () => {
  const steps = [
    {
      step: "01",
      title: "Buy",
      subtitle: "Verified Inventory",
      icon: ShoppingBag,
      description: "Explore RERA-audited under-construction projects with transparent builder ratings, master plans & milestone-linked payment schedules.",
      tag: "RERA Due Diligence",
      color: "emerald"
    },
    {
      step: "02",
      title: "Track Construction",
      subtitle: "Live Milestone Audits",
      icon: Eye,
      description: "Monitor your exact unit with monthly 4K drone surveys, civil engineer stage audits (85% brickwork, 100% RCC), and photo galleries.",
      tag: "4K Drone Surveys",
      color: "emerald"
    },
    {
      step: "03",
      title: "Possession",
      subtitle: "Zero-Delay Handover",
      icon: KeyRound,
      description: "Receive automated occupancy certificate (OC) verification, pre-possession snagging checklists, and timely key handover tracking.",
      tag: "OC & Snagging Check",
      color: "emerald"
    },
    {
      step: "04",
      title: "Resale",
      subtitle: "Maximum Capital Yield",
      icon: TrendingUp,
      description: "Sell your unit directly on the Sriizan marketplace with live micro-market valuations, documented construction history & zero broker fees.",
      tag: "+28% Resale Gain",
      color: "amber"
    }
  ];

  return (
    <section id="journey" className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-black uppercase tracking-wider">
            <Sparkles size={13} className="text-emerald-700" /> Complete Property Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Sriizan Works for You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Sriizan is not a traditional classifieds portal. We are a specialized <strong>construction tracking + verified resale marketplace</strong> designed to protect your hard-earned real estate investment.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group hover:border-emerald-500"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                    {item.step}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    item.color === 'amber' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    <Icon size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-xs font-bold text-emerald-800">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {item.tag}
                  </span>
                  <span className="text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer Pill */}
        <div className="mt-12 p-4 bg-slate-950 text-white rounded-2xl max-w-2xl mx-auto text-center text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 border border-emerald-500/20 shadow-lg">
          <span className="flex items-center gap-1.5 text-emerald-400 font-black">
            <ShieldCheck size={16} /> The Sriizan Promise:
          </span>
          <span className="text-slate-300">
            From the day foundation is poured until you exit with maximum resale ROI — 100% documented transparency.
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserJourneyMap;
