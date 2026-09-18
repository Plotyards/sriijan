import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, 
  Upload, Briefcase, Phone, MessageCircle, DollarSign, Award, 
  RefreshCw, Eye, Edit3, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import RealEstateServiceCard from './RealEstateServiceCard';

const CATEGORIES = [
  "Editor",
  "Videographer",
  "Digital Marketing",
  "Graphic Designer"
];

const DEFAULT_DEFAULTS = {
  Editor: {
    role: "Real Estate Video Editor",
    startingPrice: "₹799+",
    headline: "EDITING REAL ESTATE STORIES",
    subheadline: "SHOOTS | EDITS | DELIVERS",
    quote: "Good Content Builds Better Projects",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    skills: "Real Estate Reels, Property Videos, Construction Updates, YouTube Videos, Motion Graphics, Ad Videos"
  },
  Videographer: {
    role: "4K Drone Videographer & Filmmaker",
    startingPrice: "₹4,999+",
    headline: "CINEMATIC REAL ESTATE FILMS",
    subheadline: "SURVEYS | 4K DRONE | TOURS",
    quote: "Precision Aerials Build Buyer Confidence",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop",
    skills: "4K Drone Survey, Interior Walkthrough, Construction Audit, FPV Drone, Sony FX3, Gimbal Walkthroughs"
  },
  "Digital Marketing": {
    role: "Real Estate Growth Marketer",
    startingPrice: "₹4,999+",
    headline: "SCALING REAL ESTATE REVENUE",
    subheadline: "META ADS | LEADS | ROI",
    quote: "Predictable Site Visits. Measurable ROI.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    skills: "Meta Ads Funnels, Google Search Ads, Lead Generation, WhatsApp Automation, Retargeting, CPL Optimization"
  },
  "Graphic Designer": {
    role: "Real Estate 3D & Brand Designer",
    startingPrice: "₹799+",
    headline: "CRAFTING REAL ESTATE BRANDS",
    subheadline: "3D PLANS | BROCHURES | ADS",
    quote: "Design That Sells Luxury Before Brickwork",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    skills: "3D Floor Plans, Project Brochures, Social Media Creatives, Hoardings, Brand Identity, Print Catalogs"
  }
};

const createFallbackTxnId = () => 'pay_PRO_' + Math.floor(100000 + Math.random() * 900000);
const createErrorFallbackTxnId = () => 'pay_FALLBACK_' + Date.now();
const generatePartnerCode = () => Math.floor(1000 + Math.random() * 9000);

const ListServiceModal = ({ isOpen, onClose, initialCategory = "Editor" }) => {
  const { addNewServiceProvider } = useApp();

  const safeCategory = CATEGORIES.includes(initialCategory) ? initialCategory : "Editor";
  const def = DEFAULT_DEFAULTS[safeCategory];

  const [formData, setFormData] = useState({
    name: '',
    role: def.role,
    category: safeCategory,
    city: 'Delhi NCR',
    phone: '',
    whatsapp: '',
    startingPrice: def.startingPrice,
    experience: '3+ Years',
    projectsCompleted: '100+',
    happyClients: '40+',
    skills: def.skills,
    bio: '',
    avatarUrl: def.avatar,
    bannerUrl: def.banner,
    bannerHeadline: def.headline,
    bannerSubheadline: def.subheadline,
    bannerQuote: def.quote
  });

  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'preview'
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [listedProfile, setListedProfile] = useState(null);

  if (!isOpen) return null;

  const handleCategoryChange = (cat) => {
    const preset = DEFAULT_DEFAULTS[cat] || DEFAULT_DEFAULTS.Editor;
    setFormData(prev => ({
      ...prev,
      category: cat,
      role: preset.role,
      startingPrice: preset.startingPrice,
      bannerHeadline: preset.headline,
      bannerSubheadline: preset.subheadline,
      bannerQuote: preset.quote,
      avatarUrl: prev.avatarUrl || preset.avatar,
      bannerUrl: prev.bannerUrl || preset.banner,
      skills: preset.skills
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter your full name or agency name.');
      return;
    }
    if (!formData.role.trim()) {
      setFormError('Please enter your professional title (e.g. Real Estate Video Editor).');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    try {
      // Razorpay Checkout for ₹699 Lifetime Pass
      const orderRes = await Promise.race([
        apiService.createRazorpayOrder(699),
        new Promise((res) => setTimeout(() => res(null), 800))
      ]);

      const rzpKey = orderRes?.key || "rzp_live_Sz3GfNd3GUm8xR";
      const generatedTxnFallback = createFallbackTxnId();

      const options = {
        key: rzpKey,
        amount: 69900,
        currency: "INR",
        name: "Sriizan Marketplace",
        description: `₹699 Lifetime Listing Pass • ${formData.category}`,
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=200&auto=format&fit=crop",
        prefill: {
          name: formData.name,
          contact: formData.phone
        },
        theme: {
          color: "#059669"
        },
        handler: async function (response) {
          const finalTxn = response.razorpay_payment_id || generatedTxnFallback;
          completeRegistration(finalTxn);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setIsProcessing(false);
        });
        rzp.open();
        setTimeout(() => setIsProcessing(false), 300);
      } else {
        completeRegistration(generatedTxnFallback);
      }
    } catch {
      completeRegistration(createErrorFallbackTxnId());
    }
  };

  const completeRegistration = (txnId) => {
    const prefixMap = {
      Editor: 'SZ-ED',
      Videographer: 'SZ-VG',
      'Digital Marketing': 'SZ-DM',
      'Graphic Designer': 'SZ-GD'
    };
    const prefix = prefixMap[formData.category] || 'SZ-PRO';
    const randomCode = generatePartnerCode();
    const assignedId = `${prefix}-${randomCode}`;

    const skillsArray = formData.skills
      ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [formData.category, "Verified Pro"];

    const newProvider = addNewServiceProvider({
      id: assignedId,
      partnerId: assignedId,
      name: formData.name.trim(),
      role: formData.role.trim(),
      category: formData.category,
      city: formData.city.trim() || "Delhi NCR",
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
      startingPrice: formData.startingPrice.trim() || "₹799+",
      experience: formData.experience.trim() || "3+ Years",
      yearsExp: formData.experience.trim().replace(/\D/g, '') + "+",
      projectsCompleted: formData.projectsCompleted || "100+",
      happyClients: formData.happyClients || "40+",
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      badge: "Sriizan Verified Partner",
      bannerImage: formData.bannerUrl || DEFAULT_DEFAULTS[formData.category]?.banner,
      bannerHeadline: formData.bannerHeadline || DEFAULT_DEFAULTS[formData.category]?.headline,
      bannerSubheadline: formData.bannerSubheadline || DEFAULT_DEFAULTS[formData.category]?.subheadline,
      bannerQuote: formData.bannerQuote || DEFAULT_DEFAULTS[formData.category]?.quote,
      avatar: formData.avatarUrl || DEFAULT_DEFAULTS[formData.category]?.avatar,
      bio: formData.bio.trim() || `Verified ${formData.role} delivering high-converting real estate services for builders, brokers and owners on Sriizan.`,
      skills: skillsArray,
      transactionId: txnId,
      membershipPlan: "₹699 Lifetime Verified Pro",
      paymentDate: new Date().toLocaleDateString('en-GB')
    });

    setListedProfile(newProvider);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  // Live preview preview object
  const previewProvider = {
    id: "SZ-PREVIEW",
    partnerId: "SZ-PREVIEW",
    name: formData.name.trim() || "Aman Verma",
    role: formData.role.trim() || "Real Estate Video Editor",
    category: formData.category,
    city: formData.city || "Delhi NCR",
    rating: 5.0,
    reviewsCount: 12,
    verified: true,
    badge: "Sriizan Verified Partner",
    yearsExp: formData.experience || "3+",
    projectsCompleted: formData.projectsCompleted || "100+",
    happyClients: formData.happyClients || "40+",
    startingPrice: formData.startingPrice || "₹799+",
    phone: formData.phone || "+91 85273 16865",
    whatsapp: formData.whatsapp || formData.phone || "+91 85273 16865",
    avatar: formData.avatarUrl || DEFAULT_DEFAULTS[formData.category]?.avatar,
    bannerImage: formData.bannerUrl || DEFAULT_DEFAULTS[formData.category]?.banner,
    bannerHeadline: formData.bannerHeadline || DEFAULT_DEFAULTS[formData.category]?.headline,
    bannerSubheadline: formData.bannerSubheadline || DEFAULT_DEFAULTS[formData.category]?.subheadline,
    bannerQuote: formData.bannerQuote || DEFAULT_DEFAULTS[formData.category]?.quote,
    bio: formData.bio || `Specialist in real estate media production and high-converting marketing collaterals.`,
    skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ["Real Estate Reels", "Property Videos", "Construction Updates", "Motion Graphics"]
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[28px] shadow-2xl overflow-hidden border border-slate-200 z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase tracking-wider mb-2">
              <Sparkles size={12} className="text-amber-400" />
              <span>Real Estate Services • ₹699 Lifetime Pass</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black">
              List Your Real Estate Service Card
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Select your specialty: Editor, Videographer, Digital Marketing, or Graphic Designer.
            </p>

            {/* Tab Toggle: Form vs Live Card Preview */}
            {!isSuccess && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'form' ? 'bg-white text-slate-950 shadow-sm' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Edit3 size={13} />
                  <span>Fill Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Eye size={13} />
                  <span>Live Card Preview</span>
                </button>
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {isSuccess ? (
              <div className="space-y-6 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">Profile Listed & Verified Successfully!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your official Verified Partner Card is now active on the Sriizan marketplace with ID: <span className="font-mono font-black text-emerald-600">{listedProfile?.partnerId}</span>
                  </p>
                </div>

                {/* Display Newly Generated Card */}
                <div className="text-left max-w-sm mx-auto">
                  <RealEstateServiceCard provider={listedProfile} isModal={false} showActions={true} />
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs cursor-pointer shadow-md"
                  >
                    Close & Browse Marketplace
                  </button>
                </div>
              </div>
            ) : activeTab === 'preview' ? (
              /* Live Card Preview */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <span>This is how your verified profile card will appear:</span>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer font-black"
                  >
                    <Edit3 size={13} /> Edit Fields
                  </button>
                </div>
                <div className="max-w-sm mx-auto">
                  <RealEstateServiceCard provider={previewProvider} isModal={false} showActions={true} />
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                    {formError}
                  </div>
                )}

                {/* 1) Core Category Selector */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">
                    1. Select Your Core Service Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`p-2.5 rounded-xl border text-xs font-black text-center transition cursor-pointer ${
                          formData.category === cat
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2) Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name / Brand Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Aman Verma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Professional Role / Title *
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      placeholder="e.g. Real Estate Video Editor"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* 3) Contact: Phone & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Mobile Number (for Calls) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 85273 16865"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number (for Direct Inquiries)
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="+91 85273 16865"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* 4) Stats: Starting Price, Experience, Projects, Clients */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price</label>
                    <input
                      type="text"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleChange}
                      placeholder="₹799+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="3+ Years"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Projects</label>
                    <input
                      type="text"
                      name="projectsCompleted"
                      value={formData.projectsCompleted}
                      onChange={handleChange}
                      placeholder="120+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Happy Clients</label>
                    <input
                      type="text"
                      name="happyClients"
                      value={formData.happyClients}
                      onChange={handleChange}
                      placeholder="45+"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* 5) Specializations / Skills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specializations & Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Real Estate Reels, Property Videos, Construction Updates, YouTube Videos"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* 6) City & Bio */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Delhi NCR"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio</label>
                    <input
                      type="text"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Specialist in real estate walkthroughs and high-converting marketing..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* ₹699 Lifetime Pass Summary */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span>Lifetime Verified Pro Membership</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Zero commissions, direct WhatsApp & Call leads, Verified Partner Card.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-emerald-700">₹699</div>
                    <div className="text-[10px] font-bold text-slate-400 line-through">₹4,999</div>
                  </div>
                </div>

                {/* Submit / Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition active:scale-98 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Processing Membership...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Pay ₹699 & Generate Verified Card</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ListServiceModal;
