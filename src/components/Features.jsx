import { Eye, TrendingUp, FileText, BrainCircuit } from 'lucide-react';

const features = [
  {
    name: 'Stage-Wise Transparency',
    description: 'Get verified photo & drone video updates straight from your construction site, eliminating guesswork.',
    icon: Eye,
  },
  {
    name: 'Live Investment Tracking',
    description: 'Monitor your booked property’s capital appreciation, builder price hikes, and current market resale value.',
    icon: TrendingUp,
  },
  {
    name: 'Encrypted Document Vault',
    description: 'Access stamped BBA agreements, payment receipts, demand letters, and floor plans digitally anytime.',
    icon: FileText,
  },
  {
    name: 'AI Predictive Insights',
    description: 'AI-driven possession price forecasting, delay risk scores, and Plotyards instant resale listing integration.',
    icon: BrainCircuit,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-200">
            WHY PROMHOMEX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mt-4">
            Built for Modern Homebuyers
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium mt-3">
            We bridge the communication gap in real estate, offering complete transparency and intelligence throughout your property journey.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="liquid-glass-card rounded-3xl p-8 border border-white/80 flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_10px_25px_rgba(245,158,11,0.3)] border border-amber-300 font-extrabold">
                <feature.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{feature.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
