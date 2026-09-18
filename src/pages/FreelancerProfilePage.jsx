import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Star, MapPin, MessageCircle, 
  ShieldCheck, Zap, Clock, Award, FolderKanban, Users, 
  IndianRupee, Share2, Heart, Check, X, Send, Calendar, 
  Play, Lock, ArrowUpRight, Sparkles, Grid3X3, Film, 
  Bookmark, MoreHorizontal, UserPlus, Phone, ExternalLink,
  MessageSquare, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createWhatsAppUrl } from '../utils/whatsappHelper';

// Featured Instagram Reels & Posts for rich grid display
const DEFAULT_POSTS = [
  {
    id: "p1",
    title: "Golf Course Ext. Penthouse",
    type: "Luxury Walkthrough (45s)",
    metrics: "185K Views",
    likes: "4.2K",
    comments: "142",
    duration: "0:45",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-42461-large.mp4",
    caption: "4K cinematic speed tour for DLF Phase 5 penthouse. 24h turnaround with motion graphics lower-thirds."
  },
  {
    id: "p2",
    title: "Dwarka Expressway Villa Tour",
    type: "Cinematic Drone & Interior",
    metrics: "94K Views",
    likes: "2.8K",
    comments: "89",
    duration: "0:30",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-at-night-42475-large.mp4",
    caption: "Sunset elevation shots and seamless speed-ramps designed to convert Instagram prospects into site visits."
  },
  {
    id: "p3",
    title: "Tower Construction Milestone",
    type: "RCC Slab Audit",
    metrics: "45K Views",
    likes: "1.1K",
    comments: "34",
    duration: "1:15",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-42466-large.mp4",
    caption: "Sub-meter precision drone inspection video delivered for developer monthly milestone compliance."
  },
  {
    id: "p4",
    title: "M3M Crown Luxury Suite",
    type: "Sample Flat Walkthrough",
    metrics: "210K Views",
    likes: "5.6K",
    comments: "215",
    duration: "0:40",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-at-night-42475-large.mp4",
    caption: "Ultra-wide lens gimbal stabilized showcase. Audio mastered with trending viral background score."
  },
  {
    id: "p5",
    title: "Godrej Green Woods 4 BHK",
    type: "Builder Launch Teaser",
    metrics: "128K Views",
    likes: "3.4K",
    comments: "108",
    duration: "0:25",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-42461-large.mp4",
    caption: "High-energy pacing with 3D floor plan callouts. Generated 62 direct broker inquiries within 48 hours."
  },
  {
    id: "p6",
    title: "Signature Global Titanium",
    type: "Architectural Speed Tour",
    metrics: "76K Views",
    likes: "1.9K",
    comments: "52",
    duration: "0:35",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-42466-large.mp4",
    caption: "Drone exterior combined with smooth architectural interior flow. Color graded in DaVinci Resolve."
  }
];

const STORY_HIGHLIGHTS = [
  { id: 'h1', title: 'Featured', icon: '🌟', count: '12' },
  { id: 'h2', title: 'Reels', icon: '🎬', count: '48' },
  { id: 'h3', title: 'Drone 4K', icon: '🚁', count: '24' },
  { id: 'h4', title: 'Rate Card', icon: '🏷️', count: '4' },
  { id: 'h5', title: 'Reviews', icon: '⭐', count: '36' },
  { id: 'h6', title: 'Clients', icon: '🤝', count: '45' }
];

const FreelancerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { serviceProviders } = useApp();

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'reels' | 'rates' | 'reviews'
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Match provider by ID or partnerId
  const provider = (serviceProviders || []).find(
    p => p.id === id || p.partnerId === id || (p.id && p.id.toLowerCase() === (id || '').toLowerCase())
  ) || (serviceProviders && serviceProviders[0]);

  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    serviceType: provider?.role || 'Real Estate Services',
    budget: provider?.startingPrice || '₹799+',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  if (!provider) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">User Not Found</h2>
          <p className="text-xs text-slate-500">The link you followed may be broken or the profile has been removed.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
            <ArrowLeft size={14} /> Back to Sriizan
          </Link>
        </div>
      </div>
    );
  }

  const handleName = provider.name.toLowerCase().replace(/\s+/g, '_');
  const skills = provider.skills || provider.specializations?.map(s => s.name) || [];
  const servicesPricing = provider.servicesPricing || [
    { name: provider.role, price: provider.startingPrice || '₹799+' }
  ];
  const posts = provider.selectedWorks && provider.selectedWorks.length > 0 ? provider.selectedWorks : DEFAULT_POSTS;

  // WhatsApp Helpers
  const hireMessage = `Hi ${provider.name}! 👋\n\nI found your profile on Sriizan (@${handleName}):\n💼 Role: ${provider.role}\n📍 Category: ${provider.category}\n💰 Starting Rate: ${provider.startingPrice}\n\nI have a real estate project and would love to hire you. Let's discuss details!`;
  const waHireUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, hireMessage);

  const directWaMessage = `Hi ${provider.name}, saw your Instagram portfolio on Sriizan (ID: ${provider.partnerId || provider.id}). Let's connect!`;
  const directWaUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, directWaMessage);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${provider.name} (@${handleName}) on Sriizan`,
        text: `Check out ${provider.name}'s verified real estate portfolio on Sriizan.`,
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
    const quoteMsg = `Namaste ${provider.name}! 🙏\n\nProject Proposal Inquiry from Sriizan:\n👤 Client: ${quoteFormData.name}\n📞 Phone: ${quoteFormData.phone}\n🛠️ Service: ${quoteFormData.serviceType}\n💵 Est. Budget: ${quoteFormData.budget}\n📝 Requirements: ${quoteFormData.notes || 'Immediate discussion'}`;
    const customQuoteWa = createWhatsAppUrl(provider.whatsapp || provider.phone, quoteMsg);
    setQuoteSubmitted(true);
    setTimeout(() => {
      window.open(customQuoteWa, '_blank');
      setShowQuoteModal(false);
      setQuoteSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-20 sm:pt-24 pb-24 font-sans selection:bg-rose-500/20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-800"
          >
            <Check size={14} className="text-emerald-400" />
            <span>Profile link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* --- INSTAGRAM TOP BAR (Handle + Back + Controls) --- */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-100">
          <Link
            to="/#creative-marketing-section"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Marketplace</span>
          </Link>

          {/* Centered Username / Handle */}
          <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base text-slate-900">
            <span>@{handleName}</span>
            <CheckCircle2 size={16} className="fill-[#0095f6] text-white shrink-0" title="Verified Creator" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Share Profile"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full hover:bg-slate-100 transition cursor-pointer ${
                isLiked ? 'text-rose-500' : 'text-slate-700 hover:text-rose-400'
              }`}
            >
              <Heart size={18} className={isLiked ? 'fill-rose-500' : ''} />
            </button>
          </div>
        </div>

        {/* --- INSTAGRAM PROFILE HEADER --- */}
        <div className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Avatar with Iconic Instagram Gradient Story Ring */}
          <div className="sm:col-span-4 flex justify-center sm:justify-start">
            <div className="relative group cursor-pointer">
              {/* Instagram Story Gradient Ring */}
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white p-[2.5px]">
                  <img 
                    src={provider.avatar} 
                    alt={provider.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              {/* Live Online Dot */}
              <span 
                className="absolute bottom-1 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full shadow-md"
                title="Online & Ready for Projects"
              />
            </div>
          </div>

          {/* Profile Details & Bio */}
          <div className="sm:col-span-8 space-y-4">
            
            {/* Top Row: Handle, Verified Check & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {provider.name}
                </h1>
                <CheckCircle2 size={18} className="fill-[#0095f6] text-white shrink-0" />
              </div>

              {/* Instagram Action Buttons: Hire & Message */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href={waHireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-4 rounded-lg bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <Zap size={13} />
                  <span>Hire Now</span>
                </a>

                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={13} className="text-emerald-600" />
                  <span>Message</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowQuoteModal(true)}
                  className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Request Proposal"
                >
                  <Calendar size={13} />
                  <span>Proposal</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
                    isSaved ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                  title="Bookmark profile"
                >
                  <Bookmark size={14} className={isSaved ? 'fill-amber-600' : ''} />
                </button>
              </div>
            </div>

            {/* Instagram Stats Row: posts • rating • experience • starting price */}
            <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm pt-1">
              <div>
                <span className="font-black text-slate-900">{posts.length}+</span>{' '}
                <span className="text-slate-500 font-medium">projects</span>
              </div>
              <div>
                <span className="font-black text-slate-900">{provider.rating || '4.9'} ★</span>{' '}
                <span className="text-slate-500 font-medium">({provider.reviewsCount || 48})</span>
              </div>
              <div>
                <span className="font-black text-slate-900">{provider.yearsExp || provider.experience || '3+'}</span>{' '}
                <span className="text-slate-500 font-medium">exp</span>
              </div>
              <div>
                <span className="font-black text-emerald-700">{provider.startingPrice || '₹799'}</span>{' '}
                <span className="text-slate-500 font-medium">start</span>
              </div>
            </div>

            {/* Instagram Bio Section */}
            <div className="space-y-1 pt-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900">{provider.role}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase font-mono">
                  {provider.category}
                </span>
              </div>

              <p className="font-medium text-slate-600">
                {provider.bio || "Specialist in luxury property walkthrough videos, viral reels, 4K cinematic grading, and architectural speed-tours."}
              </p>

              <div className="pt-1 space-y-0.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span>🏆</span>
                  <span>Sriizan Verified Partner • ID: <strong className="font-mono text-slate-900">{provider.partnerId || provider.id}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>Guaranteed 24-48h Project Delivery • Zero Platform Commission</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>📍</span>
                  <span>{provider.city || 'Delhi NCR & Pan-India Remote'}</span>
                </div>
              </div>

              {/* Skills Tags Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                  >
                    #{skill.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="pt-1">
                <a
                  href={waHireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-xs text-[#00376b] hover:underline"
                >
                  <ExternalLink size={12} />
                  <span>wa.me/direct-hire/{handleName}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* --- INSTAGRAM STORY HIGHLIGHTS BUBBLES --- */}
        <div className="py-4 border-b border-slate-100 flex items-center gap-5 sm:gap-8 overflow-x-auto pb-3 scrollbar-none">
          {STORY_HIGHLIGHTS.map((highlight) => (
            <div 
              key={highlight.id}
              onClick={() => {
                if (highlight.id === 'h4') setActiveTab('rates');
                else if (highlight.id === 'h5') setActiveTab('reviews');
                else if (highlight.id === 'h2') setActiveTab('reels');
                else setActiveTab('posts');
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] border-2 border-slate-200 group-hover:border-slate-900 transition flex items-center justify-center bg-slate-50 shadow-2xs">
                <span className="text-xl sm:text-2xl">{highlight.icon}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 transition">
                {highlight.title}
              </span>
            </div>
          ))}
        </div>

        {/* --- INSTAGRAM TAB NAVIGATION BAR --- */}
        <div className="flex items-center justify-center gap-8 sm:gap-14 border-b border-slate-200 text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3.5 flex items-center gap-1.5 transition border-t-2 -mt-px cursor-pointer ${
              activeTab === 'posts'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Grid3X3 size={14} />
            <span>POSTS ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`py-3.5 flex items-center gap-1.5 transition border-t-2 -mt-px cursor-pointer ${
              activeTab === 'reels'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Film size={14} />
            <span>REELS</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`py-3.5 flex items-center gap-1.5 transition border-t-2 -mt-px cursor-pointer ${
              activeTab === 'rates'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <IndianRupee size={14} />
            <span>RATE CARD</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 flex items-center gap-1.5 transition border-t-2 -mt-px cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Star size={14} />
            <span>REVIEWS ({provider.reviewsCount || 48})</span>
          </button>
        </div>

        {/* --- TAB CONTENT AREA --- */}

        {/* 1) POSTS & REELS (INSTAGRAM 3-COLUMN SQUARE GRID) */}
        {(activeTab === 'posts' || activeTab === 'reels') && (
          <div className="py-6">
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {posts.map((post, idx) => (
                <div
                  key={post.id || idx}
                  onClick={() => setSelectedPost(post)}
                  className="group relative aspect-square bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Video duration badge */}
                  {post.duration && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-0.5">
                      <Play size={9} className="fill-white" />
                      <span>{post.duration}</span>
                    </span>
                  )}

                  {/* Instagram Hover Overlay with Likes & Comments */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-2 text-center space-y-1">
                    <p className="text-xs font-black truncate max-w-full px-1">{post.title}</p>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="flex items-center gap-1">
                        <Heart size={14} className="fill-white" /> {post.likes || '2.4K'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} className="fill-white" /> {post.comments || '68'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2) RATE CARD & SERVICES TAB */}
        {activeTab === 'rates' && (
          <div className="py-6 max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Services & Pricing Menu
              </h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Clock size={12} /> 24-48h Delivery Guaranteed
              </span>
            </div>

            <div className="space-y-2.5">
              {servicesPricing.map((item, idx) => {
                const bookMsg = `Hi ${provider.name}! I want to book: ${item.name} (${item.price}) seen on your Sriizan profile. When can we start?`;
                const bookUrl = createWhatsAppUrl(provider.whatsapp || provider.phone, bookMsg);

                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100/70 transition"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">2 revisions included • Commercial usage license</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-emerald-700 font-mono">{item.price}</span>
                      <a
                        href={bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3.5 rounded-lg bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <span>Book</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3) REVIEWS & TESTIMONIALS TAB */}
        {activeTab === 'reviews' && (
          <div className="py-6 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Verified Client Reviews
              </h3>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                <Star size={14} className="fill-amber-500" />
                <span>{provider.rating || 4.9} rating from {provider.reviewsCount || 48} builders & owners</span>
              </div>
            </div>

            {/* Instagram Style Comment Reviews */}
            <div className="space-y-3">
              {[
                {
                  user: "gaurav_sethi_realtor",
                  comment: "Shot and edited our 4 BHK sample flat walkthrough in less than 24h. The reel crossed 180K views and brought 14 direct buyer site visits!",
                  time: "2d ago",
                  likes: 24
                },
                {
                  user: "dlf_channel_partner",
                  comment: "Amazing drone footage stabilization and color grading. Highly recommended for luxury builder collaterals.",
                  time: "1w ago",
                  likes: 42
                },
                {
                  user: "ananya_interiors",
                  comment: "Super professional and zero turnaround lag. Will definitely book again for our upcoming penthouse handover.",
                  time: "2w ago",
                  likes: 19
                }
              ].map((rev, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 font-mono">@{rev.user}</span>
                    <span className="text-[11px] text-slate-400">{rev.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rev.comment}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] text-slate-400">
                    <Heart size={11} className="fill-rose-400 text-rose-500" />
                    <span>{rev.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>

      {/* --- INSTAGRAM POST MODAL POPUP --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-slate-800"
            >
              {/* Media Left Column */}
              <div className="md:w-3/5 bg-black flex items-center justify-center relative aspect-square md:aspect-auto max-h-[50vh] md:max-h-[90vh]">
                {selectedPost.videoUrl ? (
                  <video 
                    src={selectedPost.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-contain" 
                  />
                )}
              </div>

              {/* Comments & Info Right Column */}
              <div className="md:w-2/5 p-4 sm:p-5 flex flex-col justify-between space-y-4 bg-white">
                <div>
                  {/* Author Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                        <img src={provider.avatar} alt={provider.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-900 block font-mono">@{handleName}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{provider.city}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Caption */}
                  <div className="pt-3 space-y-2 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">{selectedPost.title}</p>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedPost.caption || selectedPost.type}
                    </p>
                    <p className="text-[11px] text-slate-400 pt-1 font-medium">
                      Deliverable format: {selectedPost.type} • {selectedPost.metrics}
                    </p>
                  </div>
                </div>

                {/* Bottom Action in Modal */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsLiked(!isLiked)} className="cursor-pointer">
                        <Heart size={18} className={isLiked ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'} />
                      </button>
                      <button onClick={handleShare} className="cursor-pointer">
                        <Share2 size={18} />
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500">{selectedPost.likes || '4.2K'} likes</span>
                  </div>

                  <a
                    href={createWhatsAppUrl(provider.whatsapp || provider.phone, `Hi ${provider.name}, I loved your project "${selectedPost.title}" on Sriizan. Can you create something similar for my property?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle size={14} />
                    <span>Inquire About This Work</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REQUEST PROPOSAL MODAL --- */}
      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl border border-slate-200"
            >
              <div className="bg-slate-950 p-4 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold">Request Proposal</h4>
                  <p className="text-[11px] text-slate-400">Direct inquiry with @{handleName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="p-5 space-y-3">
                {quoteSubmitted ? (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check size={22} />
                    </div>
                    <h5 className="text-sm font-bold text-slate-900">Redirecting to WhatsApp...</h5>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Gupta"
                        value={quoteFormData.name}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0095f6] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={quoteFormData.phone}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0095f6] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Service</label>
                        <input
                          type="text"
                          value={quoteFormData.serviceType}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, serviceType: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Budget</label>
                        <input
                          type="text"
                          value={quoteFormData.budget}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, budget: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Project requirements..."
                        value={quoteFormData.notes}
                        onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#0095f6] hover:bg-[#1877f2] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow"
                    >
                      <Send size={13} />
                      <span>Send via WhatsApp</span>
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

export default FreelancerProfilePage;
