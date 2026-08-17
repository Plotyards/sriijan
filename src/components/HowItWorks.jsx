import { Camera, Bell, Handshake } from 'lucide-react';

const steps = [
  {
    title: 'Register Booked Unit',
    description: 'Sign up and link your booked property (Project, Tower, Unit Number) on the secure Promohomex portal.',
    icon: Handshake,
    number: '01',
  },
  {
    title: 'Track Construction Progress',
    description: 'Get stage-wise completion percentages, HD drone surveys, and monthly site photos directly to your dashboard.',
    icon: Camera,
    number: '02',
  },
  {
    title: 'Monitor Investment & Resale',
    description: 'Track capital value appreciation, builder price revisions, documents, and list on Plotyards when ready.',
    icon: Bell,
    number: '03',
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            SIMPLE 3-STEP WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mt-4">
            How Promohomex Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium">
            From booking to possession and eventual resale — track your entire home ownership experience in one unified dashboard.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 -translate-y-1/2"></div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="relative group">
                <div className="liquid-glass-card rounded-3xl p-8 border border-white/80 flex flex-col items-center text-center relative z-10">
                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center mb-6 shadow-[0_10px_25px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform duration-300 font-extrabold border border-amber-300">
                    <step.icon className="w-9 h-9" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-6 right-6 text-4xl font-black text-slate-300 group-hover:text-amber-500/30 transition-colors">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
