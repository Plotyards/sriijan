import { ShieldCheck, Video, Users, FileCheck2, CheckCircle2, Lock, ArrowRight, KeyRound, Sparkles } from 'lucide-react';

const TrustVerificationSection = () => {
  const steps = [
    {
      step: "01",
      title: "RERA Discovery & Due Diligence",
      description: "100% Haryana & Central RERA verified projects with transparent builder track records, legal approvals, and milestone payment schedules.",
      icon: ShieldCheck,
      badge: "RERA Compliant"
    },
    {
      step: "02",
      title: "Civil & 4K Drone Audits",
      description: "Monthly certified structural engineering inspections, concrete strength logs, and high-definition aerial footage for your specific booked tower.",
      icon: Video,
      badge: "Monthly Audits"
    },
    {
      step: "03",
      title: "Pre-Possession Snagging & OC",
      description: "Guaranteed Occupancy Certificate compliance, comprehensive snagging checks, and tamper-proof encrypted digital document vault.",
      icon: KeyRound,
      badge: "Zero Delay Handover"
    },
    {
      step: "04",
      title: "0% Brokerage Direct Resale",
      description: "Direct owner-to-buyer transactions with zero broker spam, backed by verified construction histories for maximum capital appreciation.",
      icon: Users,
      badge: "Direct Connect"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
      <div id="trust-section" className="absolute -top-24 left-0 pointer-events-none"></div>
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Lock size={12} /> Institutional Trust & Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How Sriizan Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            From initial booking to civil engineering audits and direct owner resale, we replace real estate uncertainty with verified transparency.
          </p>
        </div>

        {/* 4 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800/90 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <span className="text-2xl font-mono font-black text-slate-700 group-hover:text-emerald-500/50 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-white pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Verified Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustVerificationSection;
