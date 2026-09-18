import { motion } from 'framer-motion';
import { 
  Building2, TrendingUp, Video, Camera, Palette, Code, 
  Megaphone, UserCheck, Home, Compass, Sparkles, ArrowRight 
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'track',
    label: 'Track Construction',
    subtext: 'Live Milestones & Drones',
    icon: Building2,
    color: 'from-emerald-500 to-teal-700',
    targetId: 'tracking-section'
  },
  {
    id: 'sell',
    label: 'Sell My Property',
    subtext: '0% Brokerage Resale',
    icon: TrendingUp,
    color: 'from-amber-500 to-amber-700',
    targetId: 'resale-section'
  },
  {
    id: 'editors',
    label: 'Video Editors',
    subtext: 'Reels & 4K Tours',
    icon: Video,
    color: 'from-purple-500 to-indigo-600',
    targetCategory: 'Video Editors'
  },
  {
    id: 'drone',
    label: 'Drone & Videography',
    subtext: 'DGCA Pilots & Shoots',
    icon: Camera,
    color: 'from-blue-500 to-cyan-600',
    targetCategory: 'Videographers & Drone'
  },
  {
    id: 'design',
    label: 'Graphic Designers',
    subtext: '3D Floor Plans & Ads',
    icon: Palette,
    color: 'from-rose-500 to-pink-600',
    targetCategory: 'Graphic Designers'
  },
  {
    id: 'webdev',
    label: 'Web Developers',
    subtext: 'Lead Gen Landing Pages',
    icon: Code,
    color: 'from-slate-700 to-slate-900',
    targetCategory: 'Website Developers'
  },
  {
    id: 'ads',
    label: 'Marketing & Ads',
    subtext: 'Meta & Google Ads',
    icon: Megaphone,
    color: 'from-orange-500 to-red-600',
    targetCategory: 'Marketing & Ads'
  },
  {
    id: 'realtors',
    label: 'Book My Realtor',
    subtext: 'HARERA Verified Brokers',
    icon: UserCheck,
    color: 'from-emerald-700 to-emerald-900',
    targetCategory: 'Realtors & Brokers'
  },
  {
    id: 'interior',
    label: 'Interior Design',
    subtext: 'Turnkey 3D Homes',
    icon: Home,
    color: 'from-violet-600 to-purple-800',
    targetCategory: 'Interior Designers'
  },
  {
    id: 'vastu',
    label: 'Vastu & Astrology',
    subtext: 'Home Energy & Muhurat',
    icon: Compass,
    color: 'from-amber-600 to-orange-700',
    targetCategory: 'Vastu & Astrology'
  }
];

const RealEstateBlinkitBar = ({ onSelectCategory, onOpenListService }) => {
  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/90 py-5 sticky top-16 md:top-20 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span>Real Estate Super-Market</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-300">
                Blinkit for Real Estate
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-slate-500 hidden md:inline">
              Need video, marketing, or property advice?
            </span>
            <button
              onClick={onOpenListService}
              className="inline-flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-emerald-700 to-teal-700 text-white px-3.5 py-1.5 rounded-full shadow-xs hover:from-emerald-800 hover:to-teal-800 transition cursor-pointer border border-emerald-600"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span>List Your Profile (₹699 Lifetime)</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Scrollable Quick Services Category Ribbon */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.targetId) {
                    handleScrollTo(cat.targetId);
                  } else if (cat.targetCategory) {
                    onSelectCategory(cat.targetCategory);
                    handleScrollTo('creative-marketing-section');
                  }
                }}
                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-sm transition-all duration-200 shrink-0 text-left cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon size={16} />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 group-hover:text-emerald-900 transition-colors whitespace-nowrap">
                    {cat.label}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600 whitespace-nowrap">
                    {cat.subtext}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RealEstateBlinkitBar;
