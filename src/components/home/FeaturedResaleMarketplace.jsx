import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Phone, Calendar, Sparkles, MessageCircle, X } from 'lucide-react';

const FeaturedResaleMarketplace = ({ onOpenSellModal }) => {
  const [inquiryModalProperty, setInquiryModalProperty] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const resaleUnits = [
    {
      id: "RES-1",
      project: "Sriizan Grand Residency",
      builder: "Sriizan Infrastructure",
      location: "Sector 84, Dwarka Expressway, Gurugram",
      unitNo: "Tower B - Unit 1402 (14th Floor)",
      type: "3 BHK Premium + Servant Room",
      carpetArea: "1850 Sq. Ft.",
      bookedPrice: "₹1.25 Cr",
      resalePrice: "₹1.60 Cr",
      appreciation: "+₹35 Lakhs (+28%)",
      status: "Under Construction (Possession Dec 2026)",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
      ownerType: "Direct First Allottee",
      verifiedDocs: "BBA + Stamp Duty + All Demand Paid"
    },
    {
      id: "RES-2",
      project: "M3M Golf Hills Suite",
      builder: "M3M India",
      location: "Sector 79, Gurugram",
      unitNo: "Tower C - Unit 0804 (8th Floor)",
      type: "2.5 BHK Golf Course Facing",
      carpetArea: "1420 Sq. Ft.",
      bookedPrice: "₹98 Lakhs",
      resalePrice: "₹1.21 Cr",
      appreciation: "+₹23 Lakhs (+23%)",
      status: "Structure Casted (Possession Jun 2027)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      ownerType: "Direct First Allottee",
      verifiedDocs: "Allotment Letter + Builder NOC"
    },
    {
      id: "RES-3",
      project: "Signature Global Titanium",
      builder: "Signature Global",
      location: "Sector 71, SPR Road, Gurugram",
      unitNo: "Tower 2 - Unit 2201 (High Floor)",
      type: "3.5 BHK Sky Residence",
      carpetArea: "2150 Sq. Ft.",
      bookedPrice: "₹1.85 Cr",
      resalePrice: "₹2.35 Cr",
      appreciation: "+₹50 Lakhs (+27%)",
      status: "Finishing Stage (Possession Sep 2026)",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      ownerType: "Direct First Allottee",
      verifiedDocs: "Title Search Report + Builder NOC"
    }
  ];

  const handleSendInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryModalProperty(null);
      setBuyerName('');
      setBuyerPhone('');
    }, 2000);
  };

  return (
    <section id="resale" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200 architectural-grid">
      {/* Warm Gold Ambient Light Orb */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-black uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <TrendingUp size={13} /> Verified Resale Marketplace
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Resale Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Direct homeowner resale inventory with fully audited construction histories, verified builder NOCs, and real capital appreciation transparently displayed.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSellModal}
            className="self-start md:self-auto py-3 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-900 hover:bg-emerald-800 transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>List Your Unit For Resale</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Resale Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resaleUnits.map((unit, idx) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-500"
            >
              {/* Photo & Overlays */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={unit.image}
                  alt={unit.project}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* Direct Owner Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/20">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>{unit.ownerType.toUpperCase()}</span>
                </div>

                {/* Capital Gain Pill */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md">
                  <TrendingUp size={13} />
                  <span>{unit.appreciation}</span>
                </div>

                {/* Unit Details Over Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                    <MapPin size={11} className="text-emerald-400" /> {unit.location}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">
                    {unit.project} • {unit.carpetArea}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {unit.type}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {unit.unitNo}
                  </p>
                </div>

                {/* Price Breakdown Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Resale Asking Price</span>
                      <div className="text-2xl font-black text-slate-900">{unit.resalePrice}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Original Booking</span>
                      <div className="text-xs font-bold text-slate-500 line-through">{unit.bookedPrice}</div>
                    </div>
                  </div>

                  <div className="text-[11px] font-bold text-emerald-800 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                    <span>Status:</span>
                    <span className="text-slate-800">{unit.status}</span>
                  </div>
                </div>

                {/* Verified Documents Pill */}
                <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="truncate">Docs: {unit.verifiedDocs}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setInquiryModalProperty(unit)}
                    className="py-3 px-3 rounded-xl font-black text-xs text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar size={13} />
                    <span>Site Visit</span>
                  </button>

                  <a
                    href={`https://wa.me/919870534978?text=Hi%20Sriizan%2C%20I%20am%20interested%20in%20resale%20unit%20${encodeURIComponent(unit.unitNo)}%20at%20${encodeURIComponent(unit.project)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl font-black text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp RM</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Book Site Visit Modal */}
      {inquiryModalProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <button
              onClick={() => setInquiryModalProperty(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                Schedule Verified Site Visit
              </span>
              <h3 className="text-base font-black text-slate-900">
                {inquiryModalProperty.project}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {inquiryModalProperty.unitNo} • Asking {inquiryModalProperty.resalePrice}
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="text-sm font-black text-slate-900">Site Visit Request Confirmed!</h4>
                <p className="text-xs text-slate-600">Our relationship manager will contact you within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Mobile Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+91 98705 34978"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Confirm Free Site Visit Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedResaleMarketplace;
