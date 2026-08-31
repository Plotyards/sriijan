import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Building2, TrendingUp, Sparkles, Video, Calendar, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_PROPERTIES } from '../../data/mockData';

const DualActionHub = ({ onOpenSellModal, onTrackSelect }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('track'); // 'track' | 'sell'
  const [selectedPropertyId, setSelectedPropertyId] = useState('PH-101');
  const [searchQuery, setSearchQuery] = useState('');

  // Valuation calculator state for Sell Tab
  const [sellUnitType, setSellUnitType] = useState('3 BHK Premium');
  const [sellBookedYear, setSellBookedYear] = useState('2024');

  const selectedProperty = INITIAL_PROPERTIES.find(p => p.id === selectedPropertyId) || INITIAL_PROPERTIES[0];

  const filteredProperties = INITIAL_PROPERTIES.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateEstimate = () => {
    let base = 12500000;
    if (sellUnitType.includes('2 BHK')) base = 8500000;
    if (sellUnitType.includes('4 BHK')) base = 22000000;
    if (sellUnitType.includes('Penthouse')) base = 35000000;

    const multiplier = sellBookedYear === '2024' ? 1.28 : (sellBookedYear === '2023' ? 1.45 : 1.15);
    const estimated = Math.round(base * multiplier);
    const gain = estimated - base;
    return {
      base: (base / 10000000).toFixed(2),
      estimated: (estimated / 10000000).toFixed(2),
      gain: (gain / 100000).toFixed(1),
      percent: Math.round(((estimated - base) / base) * 100)
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 z-20 relative">
      {/* Outer Card with Spatial Glass Effect */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(10,61,36,0.12)] border border-emerald-900/10 transition-all">
        {/* Main 2-Way Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl mb-5 text-xs sm:text-sm font-extrabold">
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`py-3 px-3 sm:px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'track'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/25 font-black scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Building2 size={18} className={activeTab === 'track' ? 'text-amber-400' : ''} />
            <span>Track Construction</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sell')}
            className={`py-3 px-3 sm:px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'sell'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-black scale-[1.01] border border-amber-400'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <TrendingUp size={18} className={activeTab === 'sell' ? 'text-slate-950 stroke-[2.5]' : ''} />
            <span>Sell My Property</span>
          </button>
        </div>

        {/* TAB 1: TRACK CONSTRUCTION INTERACTIVE SEARCH & PREVIEW */}
        {activeTab === 'track' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Quick Search & Select Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project name or sector (e.g. Gurugram, Sector 84)..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              {/* Project Quick Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {INITIAL_PROPERTIES.map((prop) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => setSelectedPropertyId(prop.id)}
                    className={`shrink-0 text-xs px-3.5 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                      selectedPropertyId === prop.id
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {prop.name.split(' ')[0]} {prop.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Progress Preview Card */}
            <div className="bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      RERA Verified
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {selectedProperty.location}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    {selectedProperty.name} • <span className="text-emerald-700">{selectedProperty.tower} ({selectedProperty.unitNo})</span>
                  </h4>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Overall Completion</span>
                  <div className="text-2xl font-black text-emerald-700">
                    {selectedProperty.progress.overallPercentage}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Current Active Stage: <strong className="text-slate-900">Brickwork & Plastering (85%)</strong></span>
                  <span className="text-emerald-800 font-extrabold flex items-center gap-1">
                    <Calendar size={13} /> Possession: {selectedProperty.expectedPossession}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedProperty.progress.overallPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Video size={15} /> 4K Drone Flight Video
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700">
                    <Sparkles size={14} className="text-amber-500" /> 4 Stage Photos
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Live Tracker</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SELL MY PROPERTY - VALUATION & LISTING */}
        {activeTab === 'sell' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Select Unit Type
                </label>
                <select
                  value={sellUnitType}
                  onChange={(e) => setSellUnitType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                >
                  <option value="2 BHK Luxury">2 BHK Luxury (1250 sq.ft)</option>
                  <option value="3 BHK Premium">3 BHK Premium (1850 sq.ft)</option>
                  <option value="4 BHK Ultra Luxury">4 BHK Ultra Luxury (2700 sq.ft)</option>
                  <option value="Penthouse">Sky Villa / Penthouse</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Year of Booking
                </label>
                <select
                  value={sellBookedYear}
                  onChange={(e) => setSellBookedYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                >
                  <option value="2025">2025 (Recent Allotment)</option>
                  <option value="2024">2024 (~2 Years Under Construction)</option>
                  <option value="2023">2023 (~3 Years Nearing Possession)</option>
                </select>
              </div>
            </div>

            {/* Valuation Result Pill */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles size={12} /> AI Live Resale Market Valuation
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  ₹{estimate.estimated} Crores
                </div>
                <p className="text-xs text-slate-400 font-semibold">
                  Original Booking: ₹{estimate.base} Cr • <strong className="text-emerald-400 font-extrabold">Estimated Gain: +₹{estimate.gain} Lakhs (+{estimate.percent}%)</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenSellModal}
                className="w-full sm:w-auto py-3.5 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer border border-amber-400 shrink-0"
              >
                <span>List My Property for Resale</span>
                <ChevronRight size={16} className="text-slate-950 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-1">
              <span className="flex items-center gap-1 text-emerald-800"><ShieldCheck size={14} className="text-emerald-600" /> Direct Homebuyer Network</span>
              <span>•</span>
              <span>Zero Spam Broker Calls</span>
              <span>•</span>
              <span>Verified Site Visits Only</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DualActionHub;
