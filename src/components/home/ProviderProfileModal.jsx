import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, CheckCircle2, Star, MapPin, MessageCircle, 
  Calendar, ShieldCheck, Zap, Clock, Award, 
  Check, ArrowUpRight, FolderKanban, Users, 
  IndianRupee, Lock, Play
} from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/whatsappHelper';

const ProviderProfileModal = ({ provider, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedWorkVideo, setSelectedWorkVideo] = useState(null);

  if (!isOpen || !provider) return null;

  const hireMessage = `Namaste ${provider.name}! 🙏\n\nI saw your detailed Freelancer Profile on Sriizan:\n👤 Specialist: ${provider.name} (${provider.partnerId || provider.id})\n💼 Role: ${provider.role}\n📍 Category: ${provider.category}\n💰 Starting Rate: ${provider.startingPrice}\n\nPlease let me know your current project availability. Thank you!`;
  const waHireUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, hireMessage);

  const directWaMessage = `Hi ${provider.name}! I am reviewing your verified profile on Sriizan (ID: ${provider.partnerId || provider.id}). Let's discuss a real estate project!`;
  const directWaUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, directWaMessage);

  const skills = provider.skills || provider.specializations?.map(s => s.name) || [];
  const servicesPricing = provider.servicesPricing || [
    { name: provider.role, price: provider.startingPrice || '₹799+' }
  ];
  const selectedWorks = provider.selectedWorks || provider.portfolioItems || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl my-6 max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200 scrollbar-none font-sans"
        >
          {/* Top Banner Image */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
            <img 
              src={provider.bannerImage || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"} 
              alt={provider.name} 
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            {/* Top Bar: Badge & Close */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-emerald-400 text-xs font-bold font-mono">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>VERIFIED FREELANCER • #{provider.partnerId || provider.id}</span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 transition flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Category Tag on Banner */}
            <div className="absolute bottom-3 right-4 sm:right-6 text-right">
              <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
                {provider.category}
              </span>
            </div>
          </div>

          {/* Profile Header Block */}
          <div className="px-5 sm:px-8 pt-0 pb-6 relative">
            {/* Avatar (Overlapping) & Starting Price */}
            <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-4 relative z-20">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1.5 bg-white shadow-xl border border-slate-100 overflow-hidden">
                  <img 
                    src={provider.avatar} 
                    alt={provider.name} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span 
                  className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow"
                  title="Available Now"
                />
              </div>

              {/* Starting Price Pill */}
              <div className="text-right pb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Starting Rate
                </span>
                <span className="text-2xl font-black text-slate-900">
                  {provider.startingPrice || '₹799'}
                </span>
                <span className="text-xs font-semibold text-slate-500 block">
                  {provider.priceUnit || 'per project'}
                </span>
              </div>
            </div>

            {/* Name, Verified Status & Role */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {provider.name}
                </h2>
                <CheckCircle2 size={20} className="fill-emerald-600 text-white" />
                
                <div className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <span>{provider.rating || 4.9}</span>
                  <span className="text-amber-600/70">({provider.reviewsCount || 48} reviews)</span>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-700">
                {provider.role}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pt-0.5">
                <MapPin size={13} className="text-slate-400 shrink-0" />
                <span>{provider.city || 'Pan-India Remote'}</span>
              </div>
            </div>

            {/* Metrics Spec Strip */}
            <div className="mt-5 grid grid-cols-4 divide-x divide-slate-200 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
              <div>
                <Award size={16} className="text-emerald-600 mx-auto mb-0.5" />
                <div className="text-sm font-black text-slate-900">{provider.yearsExp || provider.experience || "3+"}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Experience</div>
              </div>
              <div>
                <FolderKanban size={16} className="text-blue-600 mx-auto mb-0.5" />
                <div className="text-sm font-black text-slate-900">{provider.projectsCompleted || "120+"}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Delivered</div>
              </div>
              <div>
                <Users size={16} className="text-rose-600 mx-auto mb-0.5" />
                <div className="text-sm font-black text-slate-900">{provider.happyClients || "45+"}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Clients</div>
              </div>
              <div>
                <IndianRupee size={16} className="text-amber-600 mx-auto mb-0.5" />
                <div className="text-sm font-black text-slate-900">{provider.startingPrice || "₹799"}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">Starting</div>
              </div>
            </div>

            {/* Action Buttons: Hire, WhatsApp */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a
                href={waHireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
              >
                <Zap size={15} />
                <span>Hire Freelancer on WhatsApp</span>
              </a>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer shadow-sm"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Direct Message</span>
              </a>
            </div>

            {/* About / Bio */}
            <div className="mt-6 space-y-1.5 border-t border-slate-100 pt-5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                About The Freelancer
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {provider.bio || "Specialist in luxury property walkthrough videos, viral reels, 4K cinematic grading, and architectural tours that convert prospects into buyer inquiries."}
              </p>
            </div>

            {/* Skills Tags */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Skills & Specializations
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Services & Rate Card */}
            <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Services & Pricing Rate Card
                </h4>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Clock size={11} /> 24-48h Turnaround
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {servicesPricing.map((item, i) => (
                  <div 
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100/80 transition"
                  >
                    <span className="text-xs font-bold text-slate-800 truncate pr-2">{item.name}</span>
                    <span className="text-xs font-black text-emerald-700 shrink-0 font-mono">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Works / Portfolio Showcase */}
            {selectedWorks.length > 0 && (
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Selected Work & Deliverables
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedWorks.map((work, idx) => (
                    <div 
                      key={work.id || idx}
                      className="group/work relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img 
                          src={work.image} 
                          alt={work.title} 
                          className="w-full h-full object-cover group-hover/work:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {work.duration && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                            {work.duration}
                          </span>
                        )}
                        <div className="absolute bottom-2 inset-x-2 text-white">
                          <p className="text-xs font-black truncate">{work.title}</p>
                          <p className="text-[10px] text-slate-300 truncate">{work.subtitle || work.type || work.metrics}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Freelancer Private Portal Access Footer */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <Lock size={18} className="text-emerald-400 shrink-0" />
                <div>
                  <h5 className="text-xs font-black">Are you {provider.name}?</h5>
                  <p className="text-[11px] text-slate-400">Log in to view client inquiries, leads & edit your profile details.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/provider-dashboard');
                }}
                className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowUpRight size={13} />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProviderProfileModal;
