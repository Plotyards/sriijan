import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Share2, Heart, Check, X, Send,
  MapPin, MessageCircle, Calendar, Bookmark,
  Star, Clock, Zap, ChevronDown, ChevronUp, ArrowUpRight
} from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/whatsappHelper';

// Hand-drawn SVG Doodles
const DoodleSquiggle = ({ className = "w-full h-2 text-yellow-400" }) => (
  <svg className={className} viewBox="0 0 100 8" preserveAspectRatio="none">
    <path
      d="M1 4 Q 15 1, 30 4 T 60 4 T 90 4 T 100 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const DoodleStar = ({ className = "w-4 h-4 text-amber-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 6.9 7.3.3-5.7 4.6 2 7.2-6-4.3-6 4.3 2-7.2-5.7-4.6 7.3-.3z" />
  </svg>
);

const DoodleArrow = ({ className = "w-5 h-5 text-slate-700" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const RealEstateServiceCard = ({
  provider,
  isModal = false,
  onClose = null,
  showActions = true,
  onViewProfile = null
}) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    serviceType: provider?.role || 'Real Estate Services',
    budget: provider?.startingPrice || '₹799+',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  if (!provider) return null;

  const skills = provider.skills || provider.specializations?.map((s) => s.name) || [];
  const servicesList = provider.servicesPricing || [
    { name: provider.role, price: provider.startingPrice || '₹799+' }
  ];

  // WhatsApp helpers
  const hireMessage = `Namaste ${provider.name}! ✎\n\nI want to Hire you via Sriizan Freelance Network:\n\n👤 Freelancer: ${provider.name} (${provider.partnerId || provider.id})\n💼 Role: ${provider.role}\n📍 Category: ${provider.category}\n💰 Starting Rate: ${provider.startingPrice}\n\nPlease share your current availability. Thank you!`;
  const waHireUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, hireMessage);

  const directWaMessage = `Hi ${provider.name}! I saw your hand-drawn profile card on Sriizan (ID: ${provider.partnerId || provider.id}). Let's discuss a real estate project!`;
  const directWaUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, directWaMessage);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${provider.name} - Freelance ${provider.role} on Sriizan`,
        text: `Check out ${provider.name}'s hand-drawn profile on Sriizan.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2500);
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const quoteMsg = `Namaste ${provider.name}! ✎\n\nI have requested a Proposal on Sriizan:\n👤 Client: ${quoteFormData.name}\n📞 Phone: ${quoteFormData.phone}\n🛠️ Service: ${quoteFormData.serviceType}\n💵 Est. Budget: ${quoteFormData.budget}\n📝 Scope: ${quoteFormData.notes || 'Immediate discussion'}`;
    const customQuoteWa = createWhatsAppUrl(provider.whatsapp || provider.phone, quoteMsg);
    setQuoteSubmitted(true);
    setTimeout(() => {
      window.open(customQuoteWa, '_blank');
      setShowQuoteModal(false);
      setQuoteSubmitted(false);
    }, 1200);
  };

  const handleCardClick = (e) => {
    if (isModal) return;
    // Don't navigate if user clicked inside a button, link, or input
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
      return;
    }
    navigate(`/freelancer/${provider.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        fontFamily: "'Patrick Hand', 'Kalam', cursive, sans-serif",
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
        boxShadow: "5px 5px 0px 0px #18181b"
      }}
      className={`group relative bg-[#fffdf9] text-slate-900 border-[2.5px] border-slate-900 w-full max-w-[390px] select-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#18181b] flex flex-col justify-between p-5 sm:p-6 ${
        isModal ? 'mx-auto max-w-[430px]' : 'cursor-pointer'
      }`}
    >
      {/* --- WASHI MASKING TAPE EFFECT ON TOP --- */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/90 border border-amber-300/80 -rotate-1 rounded-xs shadow-xs z-30 flex items-center justify-center pointer-events-none"
        style={{
          borderLeft: "2px dashed #d97706",
          borderRight: "2px dashed #d97706"
        }}
      >
        <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase opacity-80">
          ★ FREELANCER ★
        </span>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-3.5 py-1 rounded-lg text-sm font-bold shadow-[2px_2px_0px_0px_#f59e0b] border border-white flex items-center gap-1.5"
          >
            <Check size={14} className="text-emerald-400" />
            <span>Link copied! ✎</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {/* --- TOP ROW: SKETCH STAMP & CONTROLS --- */}
        <div className="flex items-center justify-between pt-1">
          {/* Hand-drawn Stamped Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-0.5 border-2 border-emerald-700 text-emerald-800 text-xs font-bold rounded-[255px_15px_225px_15px/15px_225px_15px_255px] bg-emerald-50 -rotate-2 shadow-[1.5px_1.5px_0px_0px_#047857]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Available for Hire ✓</span>
          </div>

          {/* ID Watermark & Action Icons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-400/60 rotate-1">
              #{provider.partnerId || provider.id}
            </span>
            <button
              onClick={handleShare}
              aria-label="Share"
              className="w-7 h-7 rounded-full border border-slate-800 bg-white hover:bg-slate-100 transition flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <Share2 size={12} />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Like"
              className={`w-7 h-7 rounded-full border border-slate-800 bg-white hover:bg-slate-100 transition flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                isLiked ? 'text-rose-500 bg-rose-50' : 'text-slate-700'
              }`}
            >
              <Heart size={12} className={isLiked ? 'fill-rose-500' : ''} />
            </button>
            {isModal && onClose && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-7 h-7 rounded-full border border-slate-800 bg-rose-100 text-rose-800 hover:bg-rose-200 transition flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_0px_#000] ml-1"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* --- FREELANCER PROFILE: HAND-DRAWN PORTRAIT & HEADLINE --- */}
        <div className="flex items-start gap-3.5 pt-1">
          {/* Portrait with Sketch Pen Outline (Clickable) */}
          <div 
            onClick={() => onViewProfile && onViewProfile(provider)}
            className={`relative shrink-0 ${onViewProfile ? 'cursor-pointer group/avatar' : ''}`}
            title={onViewProfile ? `Click to view ${provider.name}'s full profile & portfolio` : undefined}
          >
            <div
              className="w-16 h-16 bg-white p-1 overflow-hidden border-[2.5px] border-slate-900 shadow-[3px_3px_0px_0px_#000] -rotate-2 group-hover/avatar:scale-105 transition-transform"
              style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
            >
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            {/* Doodle Pin / Status Dot */}
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-[1px_1px_0px_0px_#000]"
              title="Online"
            >
              <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            </span>
          </div>

          {/* Name & Highlighted Title */}
          <div className="flex-1 min-w-0">
            <div 
              onClick={() => onViewProfile && onViewProfile(provider)}
              className={`flex items-center gap-1.5 ${onViewProfile ? 'cursor-pointer group/name' : ''}`}
              title={onViewProfile ? `Click to view ${provider.name}'s full profile` : undefined}
            >
              <h3 className="text-xl font-bold text-slate-900 truncate tracking-tight group-hover/name:text-emerald-700 transition">
                {provider.name}
              </h3>
              <span className="text-emerald-700 text-sm font-bold" title="Verified">
                ✓
              </span>
            </div>

            {/* Hand-drawn Highlighter Effect behind Role */}
            <div 
              onClick={() => onViewProfile && onViewProfile(provider)}
              className={`relative inline-block mt-0.5 max-w-full ${onViewProfile ? 'cursor-pointer' : ''}`}
            >
              <span className="absolute inset-x-0 bottom-0.5 h-3 bg-amber-200/80 -rotate-1 rounded-xs -z-0" />
              <p className="relative z-10 text-sm font-bold text-slate-800 truncate px-0.5">
                {provider.role}
              </p>
            </div>

            <div className="flex items-center justify-between gap-1 mt-1 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1 truncate">
                <MapPin size={12} className="shrink-0 text-slate-700" />
                <span className="truncate">{provider.city || 'Pan-India Remote'}</span>
              </div>
              
              {!isModal && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/freelancer/${provider.id}`);
                  }}
                  className="shrink-0 inline-flex items-center gap-0.5 text-[11px] font-bold text-slate-900 hover:text-emerald-700 bg-amber-100/90 hover:bg-amber-200/90 border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition"
                >
                  <span>Full Profile</span>
                  <ArrowUpRight size={11} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- HAND-DRAWN SKETCH METRICS STRIP --- */}
        <div
          className="grid grid-cols-3 gap-2 p-2.5 bg-[#fefce8]/60 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] text-center"
          style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
        >
          {/* Rate */}
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-0.5">
              <span>{provider.startingPrice || '₹799'}</span>
            </div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
              Start Rate 🏷️
            </div>
          </div>

          {/* Rating */}
          <div className="border-x-2 border-slate-900 px-1">
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900">
              <DoodleStar className="w-3.5 h-3.5 text-amber-500" />
              <span>{provider.rating || '4.9'}</span>
              <span className="text-[10px] text-slate-500">({provider.reviewsCount || 42})</span>
            </div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
              Job Score ★
            </div>
          </div>

          {/* Experience / Jobs */}
          <div>
            <div className="text-sm font-bold text-slate-900">
              {provider.projectsCompleted || '120+'}
            </div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
              Jobs Done 🚀
            </div>
          </div>
        </div>

        {/* --- SHORT SKETCH BIO --- */}
        <div className="relative">
          <p className="text-sm text-slate-700 leading-snug line-clamp-2 italic pl-2 border-l-2 border-amber-400">
            "{provider.bio ||
              'Experienced freelance creator making viral real estate reels, 4K walkthroughs and developer marketing collaterals.'}"
          </p>
        </div>

        {/* --- SKETCH PEN SKILL TAGS --- */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>✎ SKILLS & TOOLS:</span>
            <span className="text-[11px] text-slate-400 font-mono">HAND-PICKED</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-xs font-bold text-slate-800 bg-white border-[1.5px] border-slate-900 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-[1px_1px_0px_0px_#000] hover:bg-yellow-50 transition -rotate-1 hover:rotate-0"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="px-2 py-0.5 text-xs font-bold text-slate-500 bg-slate-100 border border-dashed border-slate-400 rounded-md">
                +{skills.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* --- DELIVERABLES & RATES NOTEBOOK STRIP --- */}
        {servicesList.length > 0 && (
          <div className="pt-2 border-t-2 border-dashed border-slate-300 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1">
                <span>📋 DELIVERABLES:</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/70 px-1.5 py-0.2 rounded border border-emerald-400">
                <Clock size={10} /> 24-48h Delivery
              </span>
            </div>

            <div className="space-y-1">
              {(showMoreServices ? servicesList : servicesList.slice(0, 2)).map((svc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-white border border-slate-300 shadow-[1px_1px_0px_0px_#cbd5e1]"
                >
                  <span className="font-bold text-slate-800 truncate pr-2">
                    • {svc.name}
                  </span>
                  <span className="font-black text-slate-900 shrink-0 font-mono text-xs">
                    {svc.price}
                  </span>
                </div>
              ))}

              {servicesList.length > 2 && (
                <button
                  type="button"
                  onClick={() => setShowMoreServices(!showMoreServices)}
                  className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-900 pt-0.5 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{showMoreServices ? '▲ Show less' : `▼ +${servicesList.length - 2} more services`}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- SKETCH ACTION BUTTONS --- */}
      {showActions && (
        <div className="pt-4 mt-4 border-t-[2px] border-slate-900 space-y-2">
          {/* Primary Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waHireUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                boxShadow: "3px 3px 0px 0px #000"
              }}
              className="py-2.5 px-3 bg-slate-950 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 border-2 border-black transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
            >
              <Zap size={14} className="text-yellow-400" />
              <span>Hire Freelancer</span>
            </a>

            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: "15px 225px 15px 255px/255px 15px 225px 15px",
                boxShadow: "3px 3px 0px 0px #000"
              }}
              className="py-2.5 px-3 bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-1.5 border-2 border-black transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Secondary Action: Proposal & Save */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQuoteModal(true)}
              style={{
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                boxShadow: "2px 2px 0px 0px #000"
              }}
              className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-900 border-2 border-black font-bold text-xs flex items-center justify-center gap-1.5 transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Calendar size={12} />
              <span>Request Custom Proposal ✎</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              style={{
                borderRadius: "15px 225px 15px 255px/255px 15px 225px 15px",
                boxShadow: "2px 2px 0px 0px #000"
              }}
              className={`py-1.5 px-3 border-2 border-black font-bold text-xs flex items-center justify-center gap-1 transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                isSaved
                  ? 'bg-amber-300 text-slate-950 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark size={12} className={isSaved ? 'fill-slate-900' : ''} />
              <span>{isSaved ? 'Saved ★' : 'Save'}</span>
            </button>
          </div>
        </div>
      )}

      {/* --- REQUEST PROPOSAL MODAL (SKETCH PAD STYLE) --- */}
      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                fontFamily: "'Patrick Hand', 'Kalam', cursive, sans-serif",
                borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                boxShadow: "6px 6px 0px 0px #000"
              }}
              className="bg-[#fffdfa] rounded-2xl overflow-hidden max-w-md w-full border-[2.5px] border-black"
            >
              {/* Modal Header */}
              <div className="bg-amber-100 p-4 border-b-2 border-black flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    ✎ DIRECT INQUIRY PAD
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">
                    Request Proposal from {provider.name}
                  </h4>
                  <p className="text-xs text-slate-600">ID: #{provider.partnerId || provider.id} • 0% Commission</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-black text-black hover:bg-rose-100 flex items-center justify-center transition cursor-pointer shadow-[1px_1px_0px_0px_#000]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleQuoteSubmit} className="p-5 space-y-3">
                {quoteSubmitted ? (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-black text-emerald-700 flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
                      <Check size={24} />
                    </div>
                    <h5 className="text-base font-bold text-slate-900">Opening WhatsApp...</h5>
                    <p className="text-xs text-slate-600">Connecting you directly with {provider.name} ✎</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Gupta"
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-[1.5px_1.5px_0px_0px_#000]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={quoteFormData.phone}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-[1.5px_1.5px_0px_0px_#000]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Service Needed
                        </label>
                        <input
                          type="text"
                          value={quoteFormData.serviceType}
                          onChange={(e) =>
                            setQuoteFormData({ ...quoteFormData, serviceType: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white text-sm font-semibold shadow-[1.5px_1.5px_0px_0px_#000]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Estimated Budget
                        </label>
                        <input
                          type="text"
                          value={quoteFormData.budget}
                          onChange={(e) =>
                            setQuoteFormData({ ...quoteFormData, budget: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white text-sm font-semibold shadow-[1.5px_1.5px_0px_0px_#000]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Project Notes / Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Briefly describe what you need (e.g. 3 property reels in 48 hours)..."
                        value={quoteFormData.notes}
                        onChange={(e) =>
                          setQuoteFormData({ ...quoteFormData, notes: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                        boxShadow: "3px 3px 0px 0px #000"
                      }}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border-2 border-black transition active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <Send size={14} />
                      <span>Send Proposal Note via WhatsApp</span>
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealEstateServiceCard;
