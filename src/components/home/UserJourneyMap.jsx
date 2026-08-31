import { motion } from 'framer-motion';
import { ShoppingBag, Eye, KeyRound, TrendingUp, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const UserJourneyMap = () => {
  const steps = [
    {
      step: "01",
      title: "Buy",
      subtitle: "RERA Verified Discovery",
      icon: ShoppingBag,
      description: "Explore Haryana & Central RERA-audited projects with transparent builder track records, master floor plans & milestone-linked payment schedules.",
      tag: "RERA Due Diligence",
      bgLight: "bg-blue-50/70",
      borderLight: "border-blue-200",
      textColor: "text-blue-900",
      badgeColor: "bg-blue-100 text-blue-800",
      iconBg: "bg-blue-600 text-white shadow-blue-500/20"
    },
    {
      step: "02",
      title: "Track Construction",
      subtitle: "Civil Engineer & Drone Audits",
      icon: Eye,
      description: "Monitor your exact booked flat with monthly 4K drone surveillance, certified structural audits (85% brickwork, 100% RCC), and verified photo logs.",
      tag: "4K Drone Inspections",
      bgLight: "bg-emerald-50/70",
      borderLight: "border-emerald-200",
      textColor: "text-emerald-950",
      badgeColor: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-700 text-white shadow-emerald-600/20"
    },
    {
      step: "03",
      title: "Possession",
      subtitle: "Zero-Delay Handover",
      icon: KeyRound,
      description: "Automated Occupancy Certificate (OC) verification, pre-possession civil snagging audits, and guaranteed timeline tracking before you accept keys.",
      tag: "OC & Snagging Audits",
      bgLight: "bg-cyan-50/70",
      borderLight: "border-cyan-200",
      textColor: "text-cyan-950",
      badgeColor: "bg-cyan-100 text-cyan-800",
      iconBg: "bg-cyan-600 text-white shadow-cyan-500/20"
    },
    {
      step: "04",
      title: "Resale",
      subtitle: "Maximum Capital Yield",
      icon: TrendingUp,
      description: "Exit with maximum profit on Sriizan's marketplace. Connect directly with verified buyers using documented construction histories & zero broker commission.",
      tag: "+28% Resale Gain",
      bgLight: "bg-amber-50/70",
      borderLight: "border-amber-200",
      textColor: "text-amber-950",
      badgeColor: "bg-amber-100 text-amber-900 font-black",
      iconBg: "bg-amber-500 text-slate-950 shadow-amber-500/30"
    }
  ];

  return (
    <section id="journey" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-xs font-black uppercase tracking-wider">
            <Sparkles size={13} className="text-emerald-700" /> Complete Property Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Sriizan Works for You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Sriizan is not a classifieds directory. We are a specialized <strong>construction tracking + verified resale marketplace</strong> designed to protect your hard-earned real estate investment.
          </p>
        </div>

        {/* 4 Steps Grid (Color Differentiated for the Human Eye) */}
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
                className={`relative ${item.bgLight} rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border ${item.borderLight} flex flex-col justify-between group hover:scale-[1.02]`}
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-slate-300 font-mono group-hover:text-slate-500 transition-colors">
                    {item.step}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${item.iconBg} transition-transform group-hover:scale-110`}>
                    <Icon size={22} className="stroke-[2.2]" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-6">
                  <h3 className={`text-xl font-black ${item.textColor}`}>
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-600">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <span className="text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
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
