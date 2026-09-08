import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, TrendingUp, MapPin, CheckCircle2, ArrowRight, ShieldCheck, 
  Phone, Calendar, Sparkles, MessageCircle, X, Search, Filter, SlidersHorizontal, 
  Check, ArrowUpDown, ChevronRight, Eye, FileText, BadgePercent, Layers, Compass, KeyRound, User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_RESALE_PROPERTIES } from '../data/resalePropertiesData';
import { createWhatsAppUrl, generateGeneralInquiryMessage, generateSiteVisitMessage } from '../utils/whatsappHelper';

const ResalePropertiesPage = ({ onOpenSellModal }) => {
  const { properties } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('ALL');
  const [selectedBudget, setSelectedBudget] = useState('ALL');
  const [selectedPossession, setSelectedPossession] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  // Interactive Modals State
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState(null);
  const [siteVisitProperty, setSiteVisitProperty] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTimeSlot, setVisitTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [visitSuccess, setVisitSuccess] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Combine static initial inventory with any dynamic user-listed properties from AppContext
  const allResaleUnits = useMemo(() => {
    const userCreatedResale = (properties || [])
      .filter(p => p.isResale || p.paymentStatus === 'Resale Listed' || p.resalePrice || p.financials?.resaleMarketPrice)
      .map((p, index) => {
        const booked = p.financials?.bookedPrice || 11000000;
        const resale = p.financials?.resaleMarketPrice || p.resalePrice || booked * 1.25;
        const diff = resale - booked;
        const pct = Math.round((diff / (booked || 1)) * 100);

        return {
          id: p.id || `USER-RES-${index}`,
          project: p.name || 'Sriizan Premium Residency',
          builder: p.builder || 'Sriizan Builders',
          location: p.location || 'Sector 84, Gurugram',
          subLocality: 'Dwarka Expressway',
          unitNo: `${p.tower || 'Tower A'} - Unit ${p.unitNo || '101'}`,
          floor: `${p.unitNo ? p.unitNo.slice(0, 2) : '10'}th Floor`,
          type: p.type || '3 BHK Luxury',
          bhk: (p.type && p.type.includes('2')) ? '2 BHK' : (p.type && p.type.includes('4')) ? '4 BHK' : '3 BHK',
          carpetArea: p.carpetArea || '1,650 Sq. Ft.',
          superArea: '2,150 Sq. Ft.',
          bookedPrice: `₹${(booked / 10000000).toFixed(2)} Cr`,
          bookedPriceNum: booked,
          resalePrice: `₹${(resale / 10000000).toFixed(2)} Cr`,
          resalePriceNum: resale,
          appreciation: `+₹${(diff / 100000).toFixed(0)} Lakhs (+${pct}%)`,
          appreciationPercent: pct,
          appreciationAmount: diff,
          status: p.expectedPossession ? `Possession ${p.expectedPossession}` : 'Under Construction',
          possessionDate: p.expectedPossession || 'Dec 2027',
          possessionYear: 2027,
          image: p.media?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
          gallery: [
            p.media?.photos?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'
          ],
          ownerName: p.owner?.name || p.fullName || 'Property Owner',
          ownerPhone: p.owner?.phone || p.phone || p.ownerPhone || '+91 98705 34978',
          ownerType: 'Direct First Allottee',
          verifiedDocs: [
            'Allotment Letter Submitted',
            'Builder Agreement Verified',
            'No Encumbrance Certificate'
          ],
          facing: 'North-East Facing Park View',
          parking: '1 Covered Stilt Car Park',
          reraNumber: 'GGM/HARERA/VERIFIED',
          features: [
            'Recently Listed Direct Unit',
            'All Demands Cleared',
            'Transparent Pricing'
          ],
          description: `Direct homeowner resale unit verified via Sriizan platform with registered owner details.`
        };
      });

    // Merge: Avoid duplicates if an ID matches
    const existingIds = new Set(INITIAL_RESALE_PROPERTIES.map(u => u.id));
    const extraUnique = userCreatedResale.filter(u => !existingIds.has(u.id));

    return [...extraUnique, ...INITIAL_RESALE_PROPERTIES];
  }, [properties]);

  // Filtering & Sorting Logic
  const filteredProperties = useMemo(() => {
    return allResaleUnits.filter(unit => {
      // 1. Search Query (matches project, builder, location, unitNo, owner)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          unit.project.toLowerCase().includes(q) ||
          unit.builder.toLowerCase().includes(q) ||
          unit.location.toLowerCase().includes(q) ||
          unit.subLocality.toLowerCase().includes(q) ||
          unit.type.toLowerCase().includes(q) ||
          (unit.ownerName && unit.ownerName.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. BHK Filter
      if (selectedBhk !== 'ALL') {
        if (selectedBhk === '2BHK' && !['2 BHK', '2.5 BHK'].includes(unit.bhk)) return false;
        if (selectedBhk === '3BHK' && unit.bhk !== '3 BHK') return false;
        if (selectedBhk === '3.5BHK' && unit.bhk !== '3.5 BHK') return false;
        if (selectedBhk === '4BHK' && unit.bhk !== '4 BHK') return false;
      }

      // 3. Budget Filter
      if (selectedBudget !== 'ALL') {
        if (selectedBudget === 'UNDER_1.5CR' && unit.resalePriceNum > 15000000) return false;
        if (selectedBudget === '1.5CR_2.5CR' && (unit.resalePriceNum < 15000000 || unit.resalePriceNum > 25000000)) return false;
        if (selectedBudget === 'ABOVE_2.5CR' && unit.resalePriceNum < 25000000) return false;
      }

      // 4. Possession Status Filter
      if (selectedPossession !== 'ALL') {
        if (selectedPossession === 'READY' && !unit.status.toLowerCase().includes('ready')) return false;
        if (selectedPossession === '2026' && unit.possessionYear !== 2026) return false;
        if (selectedPossession === '2027' && unit.possessionYear < 2027) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.resalePriceNum - b.resalePriceNum;
      if (sortBy === 'price_desc') return b.resalePriceNum - a.resalePriceNum;
      if (sortBy === 'appreciation') return b.appreciationPercent - a.appreciationPercent;
      return 0; // Default order
    });
  }, [allResaleUnits, searchQuery, selectedBhk, selectedBudget, selectedPossession, sortBy]);

  const handleSiteVisitSubmit = (e) => {
    e.preventDefault();
    if (!siteVisitProperty) return;

    // Generate customized Site Visit WhatsApp message targeted directly to the specific owner's number
    const customMessage = generateSiteVisitMessage(siteVisitProperty, {
      visitorName,
      visitorPhone,
      visitDate,
      visitTimeSlot
    });

    const targetPhone = siteVisitProperty.ownerPhone || '919870534978';
    const waUrl = createWhatsAppUrl(targetPhone, customMessage);

    // Open direct WhatsApp chat with the property owner
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setVisitSuccess(true);
  };

  const handleCloseSiteVisitModal = () => {
    setSiteVisitProperty(null);
    setVisitSuccess(false);
    setVisitorName('');
    setVisitorPhone('');
    setVisitDate('');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedBhk('ALL');
    setSelectedBudget('ALL');
    setSelectedPossession('ALL');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedBhk !== 'ALL' || selectedBudget !== 'ALL' || selectedPossession !== 'ALL' || sortBy !== 'featured';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 sm:pt-28 pb-20 overflow-x-hidden">
      {/* Warm Gold & Emerald Ambient Orbs */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-emerald-800 font-extrabold">Resale Marketplace</span>
        </div>

        {/* Page Hero Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Direct First-Allottee Verified Inventory</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-white">
                Verified Resale Properties <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
                  & Direct Allottee Apartments
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
                Connect directly with property owners and original allottees. Inquire and schedule verified site visits with customized WhatsApp messages sent directly to whoever posted the listing.
              </p>

              {/* Action Buttons in Hero */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenSellModal}
                  className="py-3 px-6 rounded-2xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer border border-amber-400"
                >
                  <TrendingUp size={16} />
                  <span>List Your Unit For Resale</span>
                </button>

                <a
                  href="https://wa.me/919870534978?text=Hi%20Sriizan%2C%20I%20am%20looking%20for%20verified%20resale%20units%20in%20Gurugram.%20Please%20share%20the%20complete%20audited%20portfolio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-emerald-800 hover:bg-emerald-700 transition-all shadow-md border border-emerald-600 flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={16} className="text-emerald-300" />
                  <span>Resale Concierge (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Cards (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  {allResaleUnits.length}
                </div>
                <div className="text-[11px] font-bold text-slate-300 mt-1">
                  Active Units Listed
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  +27.4%
                </div>
                <div className="text-[11px] font-bold text-slate-300 mt-1">
                  Avg Capital Gain
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  100%
                </div>
                <div className="text-[11px] font-bold text-slate-300 mt-1">
                  Audited NOC & BBA
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  Direct
                </div>
                <div className="text-[11px] font-bold text-slate-300 mt-1">
                  Owner WhatsApp
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Project (e.g. Sriizan, M3M, Godrej), Builder, Sector or Owner..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown size={14} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="appreciation">Highest Appreciation %</option>
              </select>
            </div>
          </div>

          {/* Filter Pills Grid */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">
                BHK Type:
              </span>
              {[
                { label: 'All BHK', val: 'ALL' },
                { label: '2 & 2.5 BHK', val: '2BHK' },
                { label: '3 BHK', val: '3BHK' },
                { label: '3.5 BHK', val: '3.5BHK' },
                { label: '4 BHK', val: '4BHK' },
              ].map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setSelectedBhk(tab.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedBhk === tab.val
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">
                Budget:
              </span>
              {[
                { label: 'All Budgets', val: 'ALL' },
                { label: '< ₹1.5 Cr', val: 'UNDER_1.5CR' },
                { label: '₹1.5 - ₹2.5 Cr', val: '1.5CR_2.5CR' },
                { label: '> ₹2.5 Cr', val: 'ABOVE_2.5CR' },
              ].map(budget => (
                <button
                  key={budget.val}
                  onClick={() => setSelectedBudget(budget.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedBudget === budget.val
                      ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {budget.label}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-black text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer ml-auto"
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-black text-slate-600 uppercase tracking-wider">
            Showing <span className="text-emerald-800 font-extrabold">{filteredProperties.length}</span> Verified Resale Units
          </div>
          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            Direct Deals &bull; Owner WhatsApp Routing
          </div>
        </div>

        {/* Resale Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
            <Building2 size={44} className="text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-slate-900">No Resale Properties Found</h3>
            <p className="text-xs text-slate-500 font-medium">
              We couldn't find any properties matching your current filter criteria. Try clearing filters or searching for another sector.
            </p>
            <button
              onClick={clearAllFilters}
              className="py-2.5 px-5 bg-emerald-700 text-white text-xs font-black rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((unit, idx) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-500"
              >
                {/* Photo & Overlays */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={unit.image}
                    alt={unit.project}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30 pointer-events-none"></div>

                  {/* Direct Owner Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/20">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>{unit.ownerType.toUpperCase()}</span>
                  </div>

                  {/* Capital Gain Pill */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md">
                    <TrendingUp size={13} />
                    <span>{unit.appreciation}</span>
                  </div>

                  {/* Unit & Location Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                    <div className="text-xs font-black tracking-wide text-white flex items-center gap-1">
                      <Compass size={13} className="text-amber-400" /> {unit.unitNo}
                    </div>
                    <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-400" /> {unit.location}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                      {unit.project} &bull; {unit.carpetArea}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5 leading-snug">
                      {unit.type}
                    </h3>
                    <div className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>By {unit.builder}</span>
                      <span>&bull;</span>
                      <span className="text-slate-700 font-bold">{unit.floor}</span>
                    </div>

                    {/* Owner Tag */}
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <User size={12} className="text-emerald-600" />
                      <span>Posted by: <strong className="text-slate-900">{unit.ownerName || 'Direct Allottee'}</strong></span>
                    </div>
                  </div>

                  {/* Price Breakdown Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Resale Asking Price
                        </span>
                        <div className="text-2xl font-black text-slate-900">
                          {unit.resalePrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Original Booking
                        </span>
                        <div className="text-xs font-bold text-slate-400 line-through">
                          {unit.bookedPrice}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-emerald-800 pt-1.5 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-slate-500">Possession Status:</span>
                      <span className="text-emerald-800 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {unit.possessionDate}
                      </span>
                    </div>
                  </div>

                  {/* Verified Documents Chip */}
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span className="truncate">
                      Audited: {Array.isArray(unit.verifiedDocs) ? unit.verifiedDocs.slice(0, 2).join(' + ') : unit.verifiedDocs}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSiteVisitProperty(unit)}
                        className="py-2.5 px-3 rounded-xl font-black text-xs text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar size={13} />
                        <span>Site Visit</span>
                      </button>

                      {/* Direct WhatsApp Message to the specific owner who posted */}
                      <a
                        href={createWhatsAppUrl(unit.ownerPhone, generateGeneralInquiryMessage(unit))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl font-black text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp Owner</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPropertyForModal(unit);
                        setActiveGalleryIdx(0);
                      }}
                      className="w-full py-2.5 rounded-xl font-black text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>View Full Audit & Specs</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Sell My Property Banner at the bottom of Resale page */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-300">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest bg-slate-950 text-amber-300 px-3 py-1 rounded-full inline-block">
              Are You A Homeowner / First Allottee?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Cash In Your Capital Gain. List Your Unit Free.
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              Direct access to verified corporate buyers. Inquiries and site visits will be routed directly to your WhatsApp mobile number.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSellModal}
            className="py-3.5 px-8 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>List Property For Resale</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL 1: Book Site Visit Modal */}
      <AnimatePresence>
        {siteVisitProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 my-auto"
            >
              <button
                onClick={handleCloseSiteVisitModal}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Direct Owner Site Visit Booking
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {siteVisitProperty.project}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {siteVisitProperty.unitNo} &bull; Listed by <strong className="text-slate-800">{siteVisitProperty.ownerName}</strong> ({siteVisitProperty.ownerPhone})
                </p>
              </div>

              {visitSuccess ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                  <h4 className="text-base font-black text-slate-900">Custom WhatsApp Message Sent!</h4>
                  <p className="text-xs text-slate-600">
                    Your customized site visit request was generated and opened on WhatsApp for <strong>{siteVisitProperty.ownerName}</strong> ({siteVisitProperty.ownerPhone}).
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={createWhatsAppUrl(
                        siteVisitProperty.ownerPhone,
                        generateSiteVisitMessage(siteVisitProperty, {
                          visitorName,
                          visitorPhone,
                          visitDate,
                          visitTimeSlot
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      <span>Open WhatsApp Chat Again</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCloseSiteVisitModal}
                      className="py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSiteVisitSubmit} className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="+91 98705 34978"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">
                        Time Slot
                      </label>
                      <select
                        value={visitTimeSlot}
                        onChange={(e) => setVisitTimeSlot(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer"
                      >
                        <option>10:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 02:00 PM</option>
                        <option>02:00 PM - 04:00 PM</option>
                        <option>04:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <MessageCircle size={15} />
                    <span>Send Site Visit Request on WhatsApp to Owner</span>
                  </button>

                  <div className="text-[10px] text-center text-slate-400 font-bold">
                    Direct Owner Notification &bull; Customized WhatsApp Message
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Full Audit, Legal Documents & Detailed Specs Modal */}
      <AnimatePresence>
        {selectedPropertyForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    <ShieldCheck size={12} /> Verified Legal Audit Report
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {selectedPropertyForModal.project}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedPropertyForModal.unitNo} &bull; Posted by <strong className="text-white">{selectedPropertyForModal.ownerName}</strong> ({selectedPropertyForModal.ownerPhone})
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPropertyForModal(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Image Gallery */}
                <div className="space-y-2">
                  <div className="h-56 rounded-2xl overflow-hidden bg-slate-900 relative">
                    <img
                      src={selectedPropertyForModal.gallery?.[activeGalleryIdx] || selectedPropertyForModal.image}
                      alt={selectedPropertyForModal.project}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      Photo {activeGalleryIdx + 1} of {selectedPropertyForModal.gallery?.length || 1}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {selectedPropertyForModal.gallery && selectedPropertyForModal.gallery.length > 1 && (
                    <div className="flex gap-2">
                      {selectedPropertyForModal.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveGalleryIdx(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            activeGalleryIdx === idx ? 'border-emerald-600 scale-105' : 'border-slate-200 opacity-60'
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Financial Transparency Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    Financial Audit & Capital Growth
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Original Booking</div>
                      <div className="text-sm font-black text-slate-700 line-through mt-0.5">
                        {selectedPropertyForModal.bookedPrice}
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Resale Asking</div>
                      <div className="text-sm font-black text-emerald-700 mt-0.5">
                        {selectedPropertyForModal.resalePrice}
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Total Gain</div>
                      <div className="text-sm font-black text-amber-600 mt-0.5">
                        {selectedPropertyForModal.appreciation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Specifications Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Unit Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold text-slate-700">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Carpet Area</span>
                      <span>{selectedPropertyForModal.carpetArea}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Super Area</span>
                      <span>{selectedPropertyForModal.superArea}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Floor & Level</span>
                      <span>{selectedPropertyForModal.floor}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Facing View</span>
                      <span className="text-emerald-800">{selectedPropertyForModal.facing}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Parking Slots</span>
                      <span>{selectedPropertyForModal.parking}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-extrabold">RERA Registration</span>
                      <span className="truncate">{selectedPropertyForModal.reraNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Legal Document Checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    Verified Legal Paperwork (Audit Passed)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(selectedPropertyForModal.verifiedDocs || []).map((doc, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs font-bold text-slate-800"
                      >
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unit Features & Amenities */}
                {selectedPropertyForModal.features && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Unit Inclusions & Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPropertyForModal.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200"
                        >
                          &bull; {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allottee Description */}
                <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 text-xs text-slate-700 leading-relaxed font-medium">
                  <strong className="text-slate-900 block font-black mb-1">
                    Allottee's Direct Note ({selectedPropertyForModal.ownerName}):
                  </strong>
                  {selectedPropertyForModal.description}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const unit = selectedPropertyForModal;
                    setSelectedPropertyForModal(null);
                    setSiteVisitProperty(unit);
                  }}
                  className="py-3 px-4 rounded-xl font-black text-xs text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calendar size={15} />
                  <span>Book Free Visit</span>
                </button>

                <a
                  href={createWhatsAppUrl(selectedPropertyForModal.ownerPhone, generateGeneralInquiryMessage(selectedPropertyForModal))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-black text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Owner ({selectedPropertyForModal.ownerName || 'Allottee'})</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResalePropertiesPage;
