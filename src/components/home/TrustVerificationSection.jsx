import { ShieldCheck, Video, Users, FileCheck2, CheckCircle2, Lock } from 'lucide-react';

const TrustVerificationSection = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% RERA Registered & Audited",
      description: "Every construction project and resale unit is verified with Haryana & Central RERA registries. No unapproved approvals, zero disputed land parcels."
    },
    {
      icon: Video,
      title: "Physical Drone & Engineer Audits",
      description: "We don't rely on builder brochures. Our certified civil inspection teams perform monthly 4K drone surveillance and physical concrete strength tests."
    },
    {
      icon: Users,
      title: "Direct Owners & Builders (Zero Broker Spam)",
      description: "Connect directly with legitimate first allottees and official builder sales teams. No commission markups, no deceptive duplicate broker listings."
    },
    {
      icon: FileCheck2,
      title: "Escrow & Document Title Security",
      description: "Bank approval letters, Buyer-Builder Agreements (BBA), payment demand receipts, and title search records stored securely in 256-bit encrypted vaults."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
            <Lock size={12} /> Institutional Trust Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why India Trusts Sriizan
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Real estate in India is a lifelong financial commitment. We replace uncertainty with mathematical transparency, verified drone audits, and legal accountability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Icon size={22} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-black text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-extrabold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Sriizan Verified Standard
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
