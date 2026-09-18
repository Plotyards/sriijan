import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import { 
  User, Shield, Lock, AlertCircle, ArrowRight, 
  Sparkles, UserPlus, CheckCircle2, ShieldCheck, 
  Zap, Video, Camera, Megaphone, Palette, Building2, Home
} from 'lucide-react';
import SpatialSelect from '../components/common/SpatialSelect';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, registerUser, loginAdmin, addNewPropertyBooking, usersDB, serviceProviders } = useApp();

  const isSignUpDefault = location.pathname.includes('/signup') || location.search.includes('signup');
  const routeTab = isSignUpDefault ? 'signup' : (location.pathname.includes('/admin') ? 'admin' : 'login');
  const [prevRouteKey, setPrevRouteKey] = useState(location.pathname + location.search);
  const [activeTab, setActiveTab] = useState(routeTab);

  if (prevRouteKey !== location.pathname + location.search) {
    setPrevRouteKey(location.pathname + location.search);
    setActiveTab(routeTab);
  }

  // Account Type Selection on Signup: 'freelancer' | 'buyer' | 'seller' | 'builder'
  const [accountType, setAccountType] = useState(() => {
    if (location.search.includes('freelancer') || location.search.includes('creator') || location.search.includes('provider')) {
      return 'freelancer';
    }
    return 'freelancer';
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Freelancer specific fields
    category: 'Editor',
    roleTitle: '',
    city: 'Delhi NCR & Gurugram',
    startingPrice: '₹799',
    experience: '3+ Years',
    bio: '',
    skills: '',
    // Buyer specific fields
    projectName: '',
    tower: '',
    unitNumber: '',
    bookedPrice: '12500000',
    // Seller specific fields
    propertyTitle: '',
    expectedPrice: '',
    // Builder specific fields
    companyName: ''
  });

  const [signUpError, setSignUpError] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Form State
  const [adminEmail, setAdminEmail] = useState('admin@sriizan.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminError, setAdminError] = useState('');

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
    if (signUpError) setSignUpError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Please enter your registered email address or Partner ID.');
      return;
    }

    const res = loginUser(loginEmail, loginPassword);
    if (res.success) {
      if (res.role === 'freelancer' || res.user?.role === 'freelancer') {
        navigate('/provider-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setLoginError(res.error || 'Invalid credentials. Please check and try again.');
    }
  };

  const completeRegistration = async (isPaid = false, paymentInfo = null) => {
    setIsSubmitting(true);
    setSignUpError('');

    try {
      if (accountType === 'freelancer') {
        const res = await registerUser(
          signUpData.name.trim(),
          signUpData.mobile.trim(),
          signUpData.email.trim(),
          signUpData.password,
          'freelancer',
          {
            category: signUpData.category,
            role: signUpData.roleTitle || `${signUpData.category} Specialist`,
            city: signUpData.city,
            startingPrice: signUpData.startingPrice,
            experience: signUpData.experience,
            bio: signUpData.bio,
            skills: signUpData.skills ? signUpData.skills.split(',').map(s => s.trim()) : [signUpData.category, 'Real Estate Media']
          }
        );

        if (res && res.success === false) {
          setSignUpError(res.error || 'Registration failed.');
          setIsSubmitting(false);
          return;
        }

        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/provider-dashboard');
        }, 400);
      } else {
        const res = await registerUser(
          signUpData.name.trim(),
          signUpData.mobile.trim(),
          signUpData.email.trim(),
          signUpData.password,
          accountType
        );

        if (res && res.success === false) {
          setSignUpError(res.error || 'Registration failed.');
          setIsSubmitting(false);
          return;
        }

        if (accountType === 'buyer') {
          addNewPropertyBooking({
            fullName: signUpData.name,
            phone: signUpData.mobile,
            email: signUpData.email,
            projectName: signUpData.projectName || 'Sriizan Residency',
            tower: signUpData.tower || 'Tower A',
            unitNo: signUpData.unitNumber || '101',
            bookedPrice: signUpData.bookedPrice || '12500000',
            paymentStatus: isPaid ? 'Paid' : 'Free Registered',
            paymentAmount: isPaid ? 699 : 0,
            transactionId: paymentInfo?.transactionId || 'FREE-SIGNUP',
            paymentDate: paymentInfo?.paymentDate || new Date().toLocaleDateString('en-GB')
          });
        }

        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/dashboard');
        }, 400);
      }
    } catch (err) {
      setSignUpError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpData.name.trim()) {
      setSignUpError('Please enter your full name.');
      return;
    }
    if (!signUpData.email.trim() || !signUpData.email.includes('@')) {
      setSignUpError('Please enter a valid email address.');
      return;
    }
    if (!signUpData.password || signUpData.password.length < 6) {
      setSignUpError('Password must be at least 6 characters long.');
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setSignUpError('Passwords do not match. Please re-enter.');
      return;
    }

    // Check if email already registered (One Email ID = One Account)
    const existing = usersDB.find(u => u.email.toLowerCase() === signUpData.email.trim().toLowerCase());
    if (existing) {
      setSignUpError('An account with this email address already exists. Please Log In instead.');
      return;
    }

    // If freelancer, open ₹699 Verified Pass modal by default (or they can click free sign up)
    if (accountType === 'freelancer') {
      setIsPaymentModalOpen(true);
      return;
    }

    // For all regular users (buyer, seller, builder), signup is 100% free!
    completeRegistration(false, null);
  };

  const handlePaymentSuccess = async (paymentInfo) => {
    setIsPaymentModalOpen(false);
    await completeRegistration(true, paymentInfo);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminError('');
    const res = await loginAdmin(adminEmail, adminPassword);
    if (res && res.success) {
      navigate('/admin');
    } else {
      setAdminError(res?.error || 'Invalid Admin Credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <span>← Back to Home</span>
        </Link>
        <span className="text-[11px] text-slate-400 font-semibold">Sriizan &bull; Secure Authentication</span>
      </div>
      <div className="w-full spatial-glass-dark rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-white/15 grid grid-cols-1 lg:grid-cols-5">
        
        {/* Left Side Highlights Panel */}
        <div className="lg:col-span-2 bg-slate-950/90 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-600/10 px-3 py-1.5 rounded-full border border-emerald-600/30">
              <Sparkles size={13} /> Sriizan Platform Access
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {activeTab === 'signup' 
                ? (accountType === 'freelancer' ? 'Join Verified Freelance Network' : 'Create Account & Access Pass') 
                : (activeTab === 'admin' ? 'Builder Admin Portal' : 'Log In to Sriizan')}
            </h2>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {activeTab === 'signup'
                ? (accountType === 'freelancer' 
                    ? 'List your verified creator card on Sriizan marketplace. Get direct WhatsApp client inquiries with 0% commission.' 
                    : 'Sign up for instant construction tracking, milestone vault and property management.')
                : 'Sign in with your registered email or Partner ID to access your dashboard, leads, and analytics.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">₹699 Lifetime Verified Access</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">0% Commission on Direct WhatsApp Deals</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 text-[11px] text-slate-400 font-bold flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" /> 256-Bit SSL Encrypted Access
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="lg:col-span-3 p-8 sm:p-10 bg-white text-slate-900">
          
          {/* Top Form Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-emerald-600 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus size={15} /> Sign Up
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-slate-950 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User size={15} /> Log In
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-slate-950 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield size={15} className="text-emerald-500" /> Admin
            </button>
          </div>

          {/* SIGN UP FORM WITH DYNAMIC ACCOUNT TYPE DROPDOWN */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {signUpError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {signUpError}
                </div>
              )}

              {/* PRIMARY DROPDOWN: KIS CHIZ K LIYE SIGNUP KARNA HAI */}
              <div className="p-3.5 bg-slate-50/80 border-2 border-emerald-500/30 rounded-2xl space-y-2">
                <SpatialSelect
                  label="Select Account Type / Kis cheez ke liye sign up karna hai: *"
                  value={accountType}
                  onChange={(val) => setAccountType(val)}
                  colorScheme="emerald"
                  options={[
                    {
                      value: 'freelancer',
                      label: 'Freelancer / Creative Pro',
                      subtext: 'Editor, Drone Pilot, Marketer, Graphic Designer',
                      icon: '🎨',
                      badge: '₹699 Verified'
                    },
                    {
                      value: 'buyer',
                      label: 'Homebuyer / Property Investor',
                      subtext: 'Live Construction & Milestone Tracker',
                      icon: '🏠',
                      badge: 'Free Lifetime'
                    },
                    {
                      value: 'seller',
                      label: 'Property Owner / Seller',
                      subtext: 'Sell Resale Units Direct with 0% Brokerage',
                      icon: '🏢',
                      badge: '0% Brokerage'
                    },
                    {
                      value: 'builder',
                      label: 'Builder / Real Estate Developer',
                      subtext: 'Broadcast Project Milestones & Tower Updates',
                      icon: '🏗️',
                      badge: 'Enterprise'
                    }
                  ]}
                />
                <p className="text-[11px] text-slate-600 font-semibold px-1">
                  {accountType === 'freelancer' && "✓ You will receive your own Partner ID & Private Dashboard to manage inquiries and edit details."}
                  {accountType === 'buyer' && "✓ You will unlock 24/7 live construction progress tracking and document vault."}
                  {accountType === 'seller' && "✓ List your resale property directly to verified home buyers with zero brokerage."}
                  {accountType === 'builder' && "✓ Broadcast live site progress updates directly to buyers."}
                </p>
              </div>

              {/* SHARED FIELDS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="e.g. Aman Verma"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Mobile Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={signUpData.mobile}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="+91 85273 16865"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="aman@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* DYNAMIC FIELDS: IF FREELANCER */}
              {accountType === 'freelancer' && (
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>Freelancer Profile Details:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <SpatialSelect
                        label="Category / Skill *"
                        value={signUpData.category}
                        onChange={(val) => setSignUpData((prev) => ({ ...prev, category: val }))}
                        colorScheme="emerald"
                        options={[
                          { value: 'Editor', label: 'Editor', subtext: 'Reels, Shorts & Walkthroughs', icon: '🎬' },
                          { value: 'Videographer', label: 'Videographer', subtext: '4K Drone & Interior Shoots', icon: '🚁' },
                          { value: 'Digital Marketing', label: 'Digital Marketing', subtext: 'Meta & Google Lead Funnels', icon: '📈' },
                          { value: 'Graphic Designer', label: 'Graphic Designer', subtext: '3D Plans & Brochures', icon: '🎨' }
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Professional Title / Headline *
                      </label>
                      <input
                        type="text"
                        name="roleTitle"
                        required
                        value={signUpData.roleTitle}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="e.g. Real Estate Video Editor"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        City / Service Area
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={signUpData.city}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="e.g. Delhi NCR & Gurugram"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Starting Rate (₹)
                      </label>
                      <input
                        type="text"
                        name="startingPrice"
                        value={signUpData.startingPrice}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="e.g. ₹799"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Brief Bio / Specializations
                      </label>
                      <input
                        type="text"
                        name="bio"
                        value={signUpData.bio}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="e.g. Luxury property reels, 4K color grading, 24-48h turnaround..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC FIELDS: IF BUYER */}
              {accountType === 'buyer' && (
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
                    <Home size={14} />
                    <span>Property Details to Track:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={signUpData.projectName}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="Sriizan Grand Residency"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Unit / Flat Number
                      </label>
                      <input
                        type="text"
                        name="unitNumber"
                        value={signUpData.unitNumber}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="Unit 1402"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC FIELDS: IF SELLER */}
              {accountType === 'seller' && (
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Property Title / BHK
                      </label>
                      <input
                        type="text"
                        name="propertyTitle"
                        value={signUpData.propertyTitle}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400"
                        placeholder="3 BHK Luxury Apartment"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                        Expected Price (₹)
                      </label>
                      <input
                        type="text"
                        name="expectedPrice"
                        value={signUpData.expectedPrice}
                        onChange={handleSignUpChange}
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 px-3 text-slate-900 text-xs font-bold placeholder-slate-400"
                        placeholder="₹1.45 Cr"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Pricing & CTA */}
              {accountType === 'freelancer' ? (
                <div className="space-y-2.5 pt-1">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Zap size={15} className="text-emerald-700 fill-emerald-700" />
                      Lifetime Verified Creator Membership:
                    </span>
                    <span className="font-black text-emerald-800 text-base">₹699</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles size={16} className="text-amber-300" /> 
                    <span>Pay ₹699 & Launch Verified Profile</span> 
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-emerald-600" />
                      Platform Account Registration:
                    </span>
                    <span className="font-black text-emerald-800 text-xs bg-emerald-200/80 px-2 py-0.5 rounded-full uppercase">100% Free</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <UserPlus size={16} /> 
                    <span>Create Free Account</span> 
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      navigate('/login');
                    }}
                    className="font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Email Address or Partner ID (e.g. SZ-ED-1001) *
                </label>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="e.g. aman@example.com or SZ-ED-1001"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={16} /> 
                <span>Sign In to Dashboard</span> 
                <ArrowRight size={16} />
              </button>

              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signup');
                      navigate('/signup');
                    }}
                    className="font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Sign Up Free
                  </button>
                </p>
              </div>

            </form>
          )}

          {/* ADMIN FORM */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              {adminError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {adminError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Builder Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Admin Master Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield size={16} className="text-emerald-400" /> Enter Admin Panel <ArrowRight size={16} />
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Razorpay ₹699 Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        paymentDetails={{
          amount: 699,
          description: accountType === 'freelancer' ? 'Sriizan Lifetime Freelancer Listing' : 'Sriizan Property Tracking Access Pass',
          prefillName: signUpData.name,
          prefillEmail: signUpData.email,
          prefillContact: signUpData.mobile
        }}
      />
    </div>
  );
};

export default AuthPage;
