import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Grid, MessageSquare, TrendingUp, Tag, Plus, CheckCircle2, 
  Share2, Edit3, Phone, MessageCircle, Star, ShieldCheck, 
  Play, X, Sparkles, Check, Video, Camera, Palette, Lock, 
  LogOut, ArrowRight, User, AlertCircle, Save, IndianRupee, 
  MapPin, Clock, Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createWhatsAppUrl } from '../utils/whatsappHelper';
import SpatialSelect from '../components/common/SpatialSelect';

// Mock incoming client leads
const INITIAL_LEADS = [
  {
    id: "LEAD-1",
    clientName: "Nikhil Sharma",
    clientType: "Homeowner (Direct Resale)",
    property: "Sriizan Grand Residency, Tower B #1402",
    serviceNeeded: "Cinematic 4K Walkthrough & 3 Viral Reels",
    budget: "₹4,500",
    phone: "+91 85273 16865",
    timeAgo: "25m ago",
    status: "New",
    unread: true,
    message: "Hi! I want to shoot and edit a high-converting walkthrough video for my 3 BHK flat on Dwarka Expressway before putting it up for resale. Are you available this weekend?"
  },
  {
    id: "LEAD-2",
    clientName: "Vikram Malhotra",
    clientType: "Real Estate Broker",
    property: "M3M Golf Hills Suites, Sector 79",
    serviceNeeded: "Monthly Retainer (10 Instagram Reels)",
    budget: "₹18,000 / mo",
    phone: "+91 98112 34567",
    timeAgo: "3h ago",
    status: "In Discussion",
    unread: false,
    message: "We need an experienced editor for our luxury residential portfolio. Can you share raw footage turnaround time and package deals?"
  },
  {
    id: "LEAD-3",
    clientName: "Ananya Deshmukh",
    clientType: "Interior Designer",
    property: "Signature Global Titanium, SPR Road",
    serviceNeeded: "Drone Exterior + Interior Speed Tour",
    budget: "₹8,000",
    phone: "+91 98201 56789",
    timeAgo: "1d ago",
    status: "Booked",
    unread: false,
    message: "The shoot is confirmed for Tuesday morning at 10 AM. Advance payment of ₹4,000 transferred."
  }
];

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { 
    serviceProviders, 
    activeProviderId, 
    setActiveProviderId, 
    updateServiceProvider, 
    addProviderPortfolioItem,
    currentUser,
    loginFreelancer,
    logoutUser
  } = useApp();

  // Check if current user is logged in as a freelancer
  const isFreelancerLoggedIn = currentUser?.isLoggedIn && (currentUser?.role === 'freelancer' || currentUser?.providerId);

  // Freelancer Login Form State for unauthenticated users
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Identify currently logged-in freelancer
  const currentProvider = serviceProviders.find(p => p.id === currentUser?.providerId) || 
                          serviceProviders.find(p => p.id === activeProviderId) || 
                          serviceProviders[0];

  // Active Tab: 'leads' | 'edit' | 'grid' | 'rates' | 'insights'
  const [activeTab, setActiveTab] = useState('leads');
  const [isAvailable, setIsAvailable] = useState(true);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [leadFilter, setLeadFilter] = useState('All'); // 'All' | 'New' | 'In Discussion' | 'Booked'

  // Modals state
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [selectedPostModal, setSelectedPostModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Edit profile form state helper
  const getInitialEditForm = (p) => ({
    name: p?.name || '',
    role: p?.role || '',
    category: p?.category || 'Editor',
    city: p?.city || '',
    startingPrice: p?.startingPrice || '',
    priceUnit: p?.priceUnit || 'per project',
    bio: p?.bio || '',
    phone: p?.phone || '',
    whatsapp: p?.whatsapp || p?.phone || '',
    skills: Array.isArray(p?.skills) ? p?.skills.join(', ') : (p?.skills || '')
  });

  const [prevProviderId, setPrevProviderId] = useState(currentProvider?.id);
  const [editForm, setEditForm] = useState(() => getInitialEditForm(currentProvider));

  if (prevProviderId !== currentProvider?.id) {
    setPrevProviderId(currentProvider?.id);
    setEditForm(getInitialEditForm(currentProvider));
  }

  // Add new post / reel form state
  const [postForm, setPostForm] = useState({
    title: '',
    type: 'Luxury Reel (45s)',
    metrics: '15K+ Views',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFreelancerLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your registered Email or Partner ID.');
      return;
    }
    const res = loginFreelancer(loginIdentifier, loginPassword);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`);
    } else {
      setLoginError(res.error || 'Freelancer credentials not found.');
    }
  };


  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentProvider) return;

    const skillsArray = editForm.skills
      ? editForm.skills.split(',').map(s => s.trim()).filter(Boolean)
      : currentProvider.skills;

    updateServiceProvider(currentProvider.id, {
      ...editForm,
      skills: skillsArray
    });

    showToast("Profile details updated successfully! Live on Sriizan marketplace.");
  };

  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    if (!postForm.title.trim()) return;
    addProviderPortfolioItem(currentProvider.id, {
      title: postForm.title,
      type: postForm.type,
      metrics: postForm.metrics || 'New Upload',
      image: postForm.image
    });
    setPostForm({
      title: '',
      type: 'Luxury Reel (45s)',
      metrics: '15K+ Views',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
    });
    setIsAddPostOpen(false);
    showToast("New project posted to your grid!");
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus, unread: false } : l));
    showToast(`Lead marked as ${newStatus}`);
  };

  const handleReplyWhatsApp = (lead) => {
    const text = `Hi ${lead.clientName}! Thank you for reaching out via Sriizan regarding ${lead.serviceNeeded} for ${lead.property}. I would love to discuss your project!`;
    const url = createWhatsAppUrl(lead.phone, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // --- 1) PRIVATE AUTHENTICATION GATE (IF NOT LOGGED IN AS FREELANCER) ---
  if (!isFreelancerLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Gate Header */}
          <div className="bg-slate-950 p-6 text-white text-center space-y-2 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <h2 className="text-xl font-black">Private Freelancer Portal</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Only logged-in freelancers can access their private client inquiries, booking requests, and edit their profile details.
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6 space-y-5">
            <form onSubmit={handleFreelancerLogin} className="space-y-3.5">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Partner ID or Registered Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SZ-ED-1001 or aman@sriizan.com"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Lock size={14} />
                <span>Log In to My Freelancer Dashboard</span>
              </button>
            </form>

            {/* Link to Signup */}
            <div className="pt-2 text-center">
              <Link
                to="/signup?role=freelancer"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Not listed on Sriizan? Join as Freelancer (₹699)</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2) AUTHENTICATED FREELANCER DASHBOARD ---
  const portfolio = currentProvider.portfolioItems || [];
  const services = currentProvider.servicesPricing || currentProvider.servicesOffered || [];
  const filteredLeads = leadFilter === 'All' ? leads : leads.filter(l => l.status === leadFilter);
  const unreadLeadsCount = leads.filter(l => l.unread).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 sm:pt-24 pb-24 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-800"
          >
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* TOP BAR: Freelancer Identity & Logout */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0">
              <img src={currentProvider.avatar} alt={currentProvider.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-900">{currentProvider.name}</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold font-mono">
                  #{currentProvider.partnerId || currentProvider.id}
                </span>
                <span className="text-xs font-bold text-slate-400">• {currentProvider.category}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Private Freelancer Control Center • {currentProvider.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isAvailable 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{isAvailable ? 'Available for Work' : 'Busy / Booked'}</span>
            </button>

            <button
              onClick={logoutUser}
              className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-xs font-bold text-slate-600 transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare size={14} />
            <span>Client Inquiries & Leads</span>
            {unreadLeadsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-black font-mono">
                {unreadLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'edit'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Edit3 size={14} />
            <span>Edit Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'rates'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Tag size={14} />
            <span>Rate Card & Services</span>
          </button>

          <button
            onClick={() => setActiveTab('grid')}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'grid'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Grid size={14} />
            <span>Portfolio & Works ({portfolio.length})</span>
          </button>
        </div>

        {/* TAB 1: CLIENT INQUIRIES & LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {['All', 'New', 'In Discussion', 'Booked'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setLeadFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      leadFilter === status
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredLeads.length} client inquiries
              </span>
            </div>

            {/* Leads List */}
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-slate-900">{lead.clientName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          lead.status === 'New' ? 'bg-emerald-100 text-emerald-800' :
                          lead.status === 'In Discussion' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">• {lead.timeAgo}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mt-0.5">{lead.property}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-700">{lead.budget}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Budget</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    "{lead.message}"
                  </p>

                  <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Service Requested: <strong className="text-slate-800">{lead.serviceNeeded}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="w-36">
                        <SpatialSelect
                          value={lead.status}
                          onChange={(val) => handleUpdateLeadStatus(lead.id, val)}
                          size="sm"
                          colorScheme="emerald"
                          options={[
                            { value: 'New', label: 'New', icon: '🔵' },
                            { value: 'In Discussion', label: 'In Discussion', icon: '🟡' },
                            { value: 'Booked', label: 'Booked', icon: '🟢' }
                          ]}
                        />
                      </div>

                      <button
                        onClick={() => handleReplyWhatsApp(lead)}
                        className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        <MessageCircle size={13} />
                        <span>Reply on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EDIT PROFILE DETAILS */}
        {activeTab === 'edit' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Edit Freelancer Profile</h2>
                <p className="text-xs text-slate-500">
                  Update your public marketplace card details. Changes update instantly on the homepage.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Partner ID: #{currentProvider.partnerId || currentProvider.id}
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Headline / Role Title</label>
                  <input
                    type="text"
                    required
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <SpatialSelect
                    label="Category"
                    value={editForm.category}
                    onChange={(val) => setEditForm(prev => ({ ...prev, category: val }))}
                    size="sm"
                    colorScheme="emerald"
                    options={[
                      { value: 'Editor', label: 'Editor', icon: '🎬' },
                      { value: 'Videographer', label: 'Videographer', icon: '🚁' },
                      { value: 'Digital Marketing', label: 'Digital Marketing', icon: '📈' },
                      { value: 'Graphic Designer', label: 'Graphic Designer', icon: '🎨' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Starting Rate (₹)</label>
                  <input
                    type="text"
                    value={editForm.startingPrice}
                    onChange={(e) => setEditForm({ ...editForm, startingPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price Unit</label>
                  <input
                    type="text"
                    value={editForm.priceUnit}
                    onChange={(e) => setEditForm({ ...editForm, priceUnit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Skills & Tools (Comma-separated)</label>
                  <input
                    type="text"
                    value={editForm.skills}
                    onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                    placeholder="Real Estate Reels, 4K Drone, Color Grading, YouTube"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Profile Description</label>
                  <textarea
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Save size={14} />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: RATE CARD & SERVICES */}
        {activeTab === 'rates' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">Services & Rate Card</h2>
                <p className="text-xs text-slate-500">Packages that clients can book directly with you.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((svc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{svc.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">Standard Turnaround 24-48h</span>
                  </div>
                  <span className="text-sm font-black text-emerald-700 font-mono">{svc.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PORTFOLIO GRID */}
        {activeTab === 'grid' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">Completed Projects & Portfolio</h2>
                <p className="text-xs text-slate-500">Visual deliverables showcased on your public card.</p>
              </div>
              <button
                onClick={() => setIsAddPostOpen(true)}
                className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Work</span>
              </button>
            </div>

            {portfolio.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-medium">
                No portfolio items added yet. Click "Add Work" to add your first project.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {portfolio.map((item, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-slate-200 relative group aspect-[4/3]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                      <p className="text-xs font-black truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-300 truncate">{item.type} • {item.metrics}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ADD WORK MODAL */}
      <AnimatePresence>
        {isAddPostOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full border border-slate-200 shadow-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Add Portfolio Item</h3>
                <button onClick={() => setIsAddPostOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddPostSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DLF Phase 5 Penthouse Tour"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Type / Format</label>
                  <input
                    type="text"
                    value={postForm.type}
                    onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={postForm.image}
                    onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition cursor-pointer"
                >
                  Post to Portfolio
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderDashboard;