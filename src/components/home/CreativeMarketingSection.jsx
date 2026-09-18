import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Search, ArrowRight, UserPlus, Grid
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/serviceProvidersData';
import RealEstateServiceCard from './RealEstateServiceCard';

const CreativeMarketingSection = ({ 
  selectedCategory = 'All', 
  onSelectCategory,
  onOpenListService,
  onOpenProviderModal
}) => {
  const { serviceProviders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = (serviceProviders || []).filter(provider => {
    const matchesCategory = selectedCategory === 'All' || provider.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      provider.name.toLowerCase().includes(q) ||
      provider.role.toLowerCase().includes(q) ||
      (provider.city && provider.city.toLowerCase().includes(q)) ||
      (provider.skills && provider.skills.some(s => s.toLowerCase().includes(q)));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="creative-marketing-section" className="py-20 sm:py-28 bg-[#fafafa] relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-emerald-800 text-[11px] font-black uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Freelance Real Estate Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight">
              Verified Real Estate Freelancers
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Hire top freelance Video Editors, 4K Drone Videographers, Digital Marketers, and Graphic Designers directly with zero commission.
            </p>
          </div>

          {/* Action CTAs: Creator Dashboard & List Your Profile */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/provider-dashboard"
              className="py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 bg-white hover:bg-slate-100 transition border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Grid size={14} className="text-slate-600" />
              <span>Freelancer Hub</span>
            </Link>

            <button
              onClick={onOpenListService}
              className="py-2.5 px-4 rounded-xl font-black text-xs text-white bg-[#0f172a] hover:bg-slate-800 transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus size={14} />
              <span>Join as Freelancer (₹699)</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Minimalist Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category Tabs: All, Editor, Videographer, Digital Marketing, Graphic Designer */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SERVICE_CATEGORIES.map((category) => {
              const count = category === 'All' 
                ? (serviceProviders || []).length 
                : (serviceProviders || []).filter(p => p.category === category).length;

              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory ? onSelectCategory(category) : null}
                  className={`text-xs px-3.5 py-2 rounded-xl font-extrabold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimalist Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search freelancer or skill..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
            />
          </div>
        </div>

        {/* All Workers/Experts Cards Grid */}
        {filteredProviders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search size={22} />
            </div>
            <h4 className="text-base font-black text-slate-800">No freelancers found</h4>
            <p className="text-xs text-slate-500">Try changing the category or be the first to list in this category!</p>
            <button
              onClick={onOpenListService}
              className="mt-2 py-2.5 px-5 rounded-xl bg-slate-900 text-white text-xs font-black shadow cursor-pointer"
            >
              List Profile for ₹699 Lifetime
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
            {filteredProviders.map((provider) => (
              <RealEstateServiceCard 
                key={provider.id} 
                provider={provider} 
                isModal={false} 
                showActions={true} 
                onViewProfile={() => onOpenProviderModal && onOpenProviderModal(provider)}
              />
            ))}
          </div>
        )}

        {/* Minimalist Bottom Call To Action */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-wider">
              <Sparkles size={13} className="text-amber-500" />
              <span>Join Sriizan Verified Network</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Are you a Freelance Editor, Videographer, Marketer, or Graphic Designer?
            </h3>
            <p className="text-xs text-slate-500 max-w-xl font-medium">
              Create your official Verified Freelancer Profile for just ₹699 Lifetime. Get direct WhatsApp inquiries from builders and home buyers with 0% platform commissions.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenListService}
            className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-sm shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Join as Freelancer (₹699)</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CreativeMarketingSection;
