import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Phone, Calendar, Sparkles, MessageCircle, X } from 'lucide-react';
import { INITIAL_RESALE_PROPERTIES } from '../../data/resalePropertiesData';
import { createWhatsAppUrl, generateGeneralInquiryMessage, generateSiteVisitMessage } from '../../utils/whatsappHelper';

const FeaturedResaleMarketplace = ({ onOpenSellModal }) => {
  const [inquiryModalProperty, setInquiryModalProperty] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTimeSlot, setVisitTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [inquirySent, setInquirySent] = useState(false);

  // Use top 3 featured units from verified dataset
  const resaleUnits = INITIAL_RESALE_PROPERTIES.slice(0, 3);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryModalProperty) return;

    // Generate customized Site Visit WhatsApp message directly for the specific owner
    const customMessage = generateSiteVisitMessage(inquiryModalProperty, {
      visitorName: buyerName,
      visitorPhone: buyerPhone,
      visitDate,
      visitTimeSlot
    });

    const targetPhone = inquiryModalProperty.ownerPhone || '919870534978';
    const waUrl = createWhatsAppUrl(targetPhone, customMessage);

    // Open direct WhatsApp chat with the property owner
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setInquirySent(true);
  };

  const handleCloseModal = () => {
    setInquiryModalProperty(null);
    setInquirySent(false);
    setBuyerName('');
    setBuyerPhone('');
    setVisitDate('');
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
              Direct homeowner resale inventory with fully audited construction histories, verified builder NOCs, and direct contact with original allottees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              to="/resale"
              className="py-3 px-5 rounded-2xl font-black text-xs sm:text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 flex items-center gap-2 cursor-pointer border border-amber-400"
            >
              <span>Explore All Resale Units</span>
              <ArrowRight size={15} />
            </Link>

            <button
              type="button"
              onClick={onOpenSellModal}
              className="py-3 px-5 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-900 hover:bg-emerald-800 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>List Your Unit Free</span>
            </button>
          </div>
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
                    {unit.unitNo} &bull; Posted by <span className="text-slate-800 font-bold">{unit.ownerName || 'Allottee'}</span>
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
                  <span className="truncate">Docs: {Array.isArray(unit.verifiedDocs) ? unit.verifiedDocs.join(' + ') : unit.verifiedDocs}</span>
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
                    href={createWhatsAppUrl(unit.ownerPhone, generateGeneralInquiryMessage(unit))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl font-black text-xs text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Owner</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Units Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/resale"
            className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-2xl bg-slate-900 hover:bg-emerald-900 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-800 cursor-pointer group"
          >
            <span>View All Resale Units (Dedicated Page)</span>
            <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Book Site Visit Modal */}
      {inquiryModalProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Direct Owner Site Visit Booking
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {inquiryModalProperty.project}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {inquiryModalProperty.unitNo} • Listed by <strong className="text-slate-800">{inquiryModalProperty.ownerName}</strong> ({inquiryModalProperty.ownerPhone})
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h4 className="text-sm font-black text-slate-900">Custom WhatsApp Message Generated!</h4>
                <p className="text-xs text-slate-600">
                  Your customized site visit request was opened on WhatsApp to <strong>{inquiryModalProperty.ownerName}</strong> ({inquiryModalProperty.ownerPhone}).
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={createWhatsAppUrl(
                      inquiryModalProperty.ownerPhone,
                      generateSiteVisitMessage(inquiryModalProperty, {
                        visitorName: buyerName,
                        visitorPhone: buyerPhone,
                        visitDate,
                        visitTimeSlot
                      })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} />
                    <span>Open WhatsApp Chat Again</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Close
                  </button>
                </div>
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Time Slot</label>
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
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-1"
                >
                  <MessageCircle size={15} />
                  <span>Send Site Visit Request on WhatsApp to Owner</span>
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
