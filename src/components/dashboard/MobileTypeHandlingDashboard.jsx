import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2, Layers, CheckCircle2, Phone, Calendar, ArrowRight,
  Sparkles, Download, Compass, ShieldCheck, HelpCircle, UserCheck,
  Zap, Clock, FileText, ChevronRight, X, Scale, MessageSquare, Check, ArrowUpRight
} from 'lucide-react';

const UNIT_TYPES = [
  {
    id: '2bhk',
    name: '2 BHK Premium Executive',
    category: '2 BHK',
    superArea: '1,250 sq.ft',
    carpetArea: '880 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    facing: 'North-East (Vastu Compliant)',
    basePrice: '₹88,50,000',
    resalePrice: '₹95,20,000',
    rentalYield: '4.8% p.a.',
    availableUnits: 4,
    totalUnits: 48,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    floorPlanUrl: '#',
    highlights: ['Corner Unit', 'Pool View', 'Modular Kitchen Included', '1 Covered Parking']
  },
  {
    id: '3bhk',
    name: '3 BHK Royal Residency',
    category: '3 BHK',
    superArea: '1,680 sq.ft',
    carpetArea: '1,190 sq.ft',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    facing: 'East Facing (Sunlit)',
    basePrice: '₹1,24,000,000',
    resalePrice: '₹1,38,000,000',
    rentalYield: '5.2% p.a.',
    availableUnits: 2,
    totalUnits: 36,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    floorPlanUrl: '#',
    highlights: ['Italian Marble Flooring', 'Private Terrace Balcony', '2 Car Parkings', 'Smart Home Automation']
  },
  {
    id: 'villa',
    name: '4 BHK Duplex Luxury Villa',
    category: 'Villa',
    superArea: '2,850 sq.ft',
    carpetArea: '2,200 sq.ft',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    facing: 'North Facing (Garden Front)',
    basePrice: '₹2,45,000,000',
    resalePrice: '₹2,78,000,000',
    rentalYield: '6.1% p.a.',
    availableUnits: 1,
    totalUnits: 12,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop',
    floorPlanUrl: '#',
    highlights: ['Private Plunge Pool', 'Personal Elevator', 'Servant Quarter', 'EV Charging Dock']
  },
  {
    id: 'penthouse',
    name: '5 BHK Sky Penthouse',
    category: 'Penthouse',
    superArea: '4,100 sq.ft',
    carpetArea: '3,350 sq.ft',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 5,
    facing: '360° Panoramic Sky View',
    basePrice: '₹3,90,000,000',
    resalePrice: '₹4,40,000,000',
    rentalYield: '6.5% p.a.',
    availableUnits: 1,
    totalUnits: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    floorPlanUrl: '#',
    highlights: ['Private Sky Deck', 'Jacuzzi Suite', '4 Dedicated Parking Bays', '24/7 Butler Service']
  }
];

const LEAD_MILESTONES = [
  { step: 1, title: 'Inquiry & Unit Selection', status: 'completed', date: '12 Jan 2026', desc: 'Selected 3 BHK Royal Residency Unit' },
  { step: 2, title: 'Site Visit & Virtual Tour', status: 'completed', date: '18 Jan 2026', desc: 'Guided walkthrough with Sales Director' },
  { step: 3, title: 'Token & Booking Confirmation', status: 'completed', date: '25 Jan 2026', desc: 'Token payment of ₹5,00,000 processed' },
  { step: 4, title: 'Builder Buyer Agreement (BBA)', status: 'in_progress', date: 'Expected: 28 Feb 2026', desc: 'Legal verification & agreement signing' },
  { step: 5, title: 'Bank Loan Sanction & Slab Payment', status: 'upcoming', date: 'Expected: 15 Apr 2026', desc: 'Slab 8 completion milestone' },
  { step: 6, title: 'Final Inspection & Key Handover', status: 'upcoming', date: 'Expected: Dec 2026', desc: 'Occupancy Certificate (OC) & Possession' }
];

const MobileTypeHandlingDashboard = () => {
  const { activeProperty, currentUser } = useApp();
  const [selectedType, setSelectedType] = useState(UNIT_TYPES[1]); // Default 3BHK
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleBookVisit = (e) => {
    e.preventDefault();
    setVisitSubmitted(true);
    setTimeout(() => {
      setVisitSubmitted(false);
      setIsBookVisitOpen(false);
    }, 2500);
  };

  const handleDownloadBrochure = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Mobile Sticky Header Pill / Info Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              <Layers size={13} /> Unit Type & Lead Operations
            </span>
            <span className="text-[11px] font-bold text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              Mobile Touch Optimized 📱
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Property Configurations & Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Explore unit types, compare floor plans, track lead progress, and schedule site visits directly from mobile.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="text-[10px] uppercase font-bold text-slate-400">Available Types</div>
              <div className="text-base font-black text-emerald-400">4 Luxury Types</div>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="text-[10px] uppercase font-bold text-slate-400">Selected Type</div>
              <div className="text-base font-black text-white">{selectedType.category}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="text-[10px] uppercase font-bold text-slate-400">Base Price</div>
              <div className="text-base font-black text-emerald-400">{selectedType.basePrice}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="text-[10px] uppercase font-bold text-slate-400">Est. Rental Yield</div>
              <div className="text-base font-black text-emerald-300">{selectedType.rentalYield}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Unit Type Selector Pills (Mobile First) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={14} className="text-emerald-600" /> Select Unit Category:
          </label>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 cursor-pointer"
          >
            <Scale size={13} /> Compare All Types
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full overflow-hidden">
          {UNIT_TYPES.map((type) => {
            const isSelected = selectedType.id === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`p-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-between gap-1 border w-full overflow-hidden ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-[1.01]'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`}></span>
                  <span className="truncate">{type.category}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {type.availableUnits} left
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Unit Type Details Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Unit Image & Badges */}
          <div className="lg:w-1/2 relative rounded-2xl overflow-hidden group shadow-md max-h-[300px]">
            <img
              src={selectedType.image}
              alt={selectedType.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="bg-slate-950/90 backdrop-blur-md text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Sparkles size={12} /> {selectedType.category}
              </span>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                Vastu Compliant
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-lg font-black">{selectedType.name}</h3>
              <p className="text-xs text-slate-200 font-medium">{selectedType.facing}</p>
            </div>
          </div>

          {/* Unit Key Specs Grid */}
          <div className="lg:w-1/2 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Base Launch Price</span>
                <div className="text-2xl font-black text-slate-900">{selectedType.basePrice}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Current Market Value</span>
                <div className="text-lg font-extrabold text-emerald-600 flex items-center justify-end gap-1">
                  {selectedType.resalePrice} <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            {/* Spec Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Super Area</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">{selectedType.superArea}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Carpet Area</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">{selectedType.carpetArea}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Bedrooms & Baths</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">{selectedType.bedrooms} Beds • {selectedType.bathrooms} Baths</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Balconies</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">{selectedType.balconies} Large Balconies</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Available Inventory</div>
                <div className="text-xs sm:text-sm font-black text-emerald-700">{selectedType.availableUnits} of {selectedType.totalUnits} Units</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Facing</div>
                <div className="text-xs sm:text-sm font-black text-slate-900 truncate">{selectedType.facing.split(' ')[0]}</div>
              </div>
            </div>

            {/* Premium Highlights */}
            <div>
              <div className="text-xs font-black text-slate-900 mb-2">Key Unit Features:</div>
              <div className="flex flex-wrap gap-2">
                {selectedType.highlights.map((h, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-600" /> {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Touch Buttons Bar */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setIsBookVisitOpen(true)}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black rounded-2xl text-xs shadow-lg shadow-emerald-600/20 border border-emerald-500 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Calendar size={16} /> Schedule Mobile Site Visit
          </button>

          <button
            onClick={handleDownloadBrochure}
            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl text-xs shadow-md border border-slate-800 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Download size={16} className="text-emerald-400" /> {downloadSuccess ? '✓ Brochure Downloaded!' : 'Download Floor Plan PDF'}
          </button>

          <a
            href="https://wa.me/919876543210?text=Hi%20Sriizan%20Team%2C%20I%20am%20interested%20in%20the%20unit%20type%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <MessageSquare size={16} /> WhatsApp RM Direct Connect
          </a>
        </div>
      </div>

      {/* Lead & Operational Handling Tracker */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <UserCheck size={20} className="text-emerald-600" /> Buyer Lead & Operations Timeline
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Live status of your unit allotment, legal verification, & booking milestone progress.
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-200">
            Active Buyer Booking
          </span>
        </div>

        {/* Milestone Vertical Timeline (Touch Friendly) */}
        <div className="space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {LEAD_MILESTONES.map((m) => {
            const isDone = m.status === 'completed';
            const isInProgress = m.status === 'in_progress';
            return (
              <div key={m.step} className="flex items-start gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 border ${
                  isDone
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isInProgress
                    ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-sm'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  {isDone ? <Check size={16} /> : m.step}
                </div>

                <div className={`flex-1 p-3.5 rounded-2xl border ${
                  isInProgress
                    ? 'bg-amber-50/70 border-amber-200/90 shadow-sm'
                    : isDone
                    ? 'bg-slate-50 border-slate-200/80'
                    : 'bg-slate-50/50 border-slate-100'
                }`}>
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">{m.title}</h4>
                    <span className="text-[10px] font-bold text-slate-500">{m.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unit Type Comparison Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="text-emerald-600" size={24} />
                <h3 className="text-lg font-black text-slate-900">Unit Type Comparison Sheet</h3>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-3 font-black rounded-tl-xl">Specification</th>
                    {UNIT_TYPES.map((u) => (
                      <th key={u.id} className="p-3 font-black whitespace-nowrap">{u.category}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Super Area</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3">{u.superArea}</td>)}
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-900">Carpet Area</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3">{u.carpetArea}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Beds & Baths</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3">{u.bedrooms}B / {u.bathrooms}Ba</td>)}
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-900">Base Price</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3 font-bold text-slate-900">{u.basePrice}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Expected Resale</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3 font-bold text-emerald-600">{u.resalePrice}</td>)}
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="p-3 font-bold text-slate-900">Inventory Status</td>
                    {UNIT_TYPES.map(u => <td key={u.id} className="p-3 font-bold text-emerald-700">{u.availableUnits} left</td>)}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsCompareOpen(false)}
                className="py-2.5 px-5 bg-slate-950 text-white text-xs font-black rounded-xl cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Site Visit Modal */}
      {isBookVisitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-emerald-600" size={22} />
                <h3 className="text-base font-black text-slate-900">Book Mobile Site Visit</h3>
              </div>
              <button
                onClick={() => setIsBookVisitOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {visitSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-lg font-black text-slate-900">Site Visit Booked!</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Our Relationship Manager will reach out to confirm your tour details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600"
                  >
                    <option>10:00 AM - 11:30 AM</option>
                    <option>11:30 AM - 01:00 PM</option>
                    <option>02:30 PM - 04:00 PM</option>
                    <option>04:00 PM - 05:30 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                    Selected Unit Type
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedType.name} (${selectedType.basePrice})`}
                    className="w-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold py-3 px-4 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg cursor-pointer transition-all"
                >
                  Confirm Site Visit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTypeHandlingDashboard;
