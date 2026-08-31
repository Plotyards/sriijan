import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import { User, Shield, Lock, AlertCircle, ArrowRight, Sparkles, UserPlus, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, registerUser, loginAdmin, addNewPropertyBooking, usersDB } = useApp();

  const isSignUpDefault = location.pathname.includes('/signup') || location.search.includes('signup');
  const [activeTab, setActiveTab] = useState(isSignUpDefault ? 'signup' : 'login'); // 'signup' | 'login' | 'admin'

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
    projectName: '',
    tower: '',
    unitNumber: '',
    bookedPrice: '12500000'
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
    if (!loginEmail) {
      setLoginError('Please enter your registered buyer email address.');
      return;
    }
    const res = loginUser(loginEmail, loginPassword);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setLoginError(res.error || 'Invalid credentials. Please try again.');
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

    // Open ₹699 Razorpay Payment Gateway Modal BEFORE creating account
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentInfo) => {
    setIsPaymentModalOpen(false);
    setIsSubmitting(true);

    // Create user account ONLY AFTER Razorpay payment succeeds!
    registerUser(
      signUpData.name.trim(),
      signUpData.mobile.trim(),
      signUpData.email.trim(),
      signUpData.password
    );

    // Link property booking details
    addNewPropertyBooking({
      fullName: signUpData.name,
      phone: signUpData.mobile,
      email: signUpData.email,
      projectName: signUpData.projectName || 'Sriizan Residency',
      tower: signUpData.tower || 'Tower A',
      unitNo: signUpData.unitNumber || '101',
      bookedPrice: signUpData.bookedPrice || '12500000',
      paymentStatus: 'Paid',
      paymentAmount: 699,
      transactionId: paymentInfo.transactionId,
      paymentDate: paymentInfo.paymentDate
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 400);
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
    <div className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex justify-center items-center">
      <div className="w-full spatial-glass-dark rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-white/15 grid grid-cols-1 lg:grid-cols-5">
        
        {/* Left Side Highlights Panel */}
        <div className="lg:col-span-2 bg-slate-950/90 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-600/10 px-3 py-1.5 rounded-full border border-emerald-600/30">
              <Sparkles size={13} /> Sriizan Real Portal
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {activeTab === 'signup' ? 'Create Account & Access Pass' : (activeTab === 'admin' ? 'Builder Admin Portal' : 'Welcome Back Buyer')}
            </h2>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {activeTab === 'signup'
                ? 'Sign up to create your buyer account & pay ₹699 one-time fee to unlock lifetime live property tracking.'
                : 'Sign in to access your personal property timeline, ROI analytics, drone surveys & documents.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">Razorpay Encrypted ₹699 Pass</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">Real-Time MongoDB Cloud Storage</span>
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
              <UserPlus size={15} /> Sign Up (₹699)
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
              <User size={15} /> Buyer Login
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

          {/* SIGN UP FORM (ACCEPTS ₹699 ON SIGNUP) */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {signUpError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {signUpError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={signUpData.mobile}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="+91 98705 34978"
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
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="ramesh@example.com"
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
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
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
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={signUpData.projectName}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="Sriizan Residency"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    name="unitNumber"
                    value={signUpData.unitNumber}
                    onChange={handleSignUpChange}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                    placeholder="Unit 1402"
                  />
                </div>
              </div>

              {/* Fee Pill */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap size={15} className="text-emerald-700 fill-emerald-700" />
                  One-Time Live Property Tracking Fee:
                </span>
                <span className="font-black text-emerald-800 text-base">₹699</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer border border-emerald-400 disabled:opacity-50"
              >
                <Lock size={16} /> Pay ₹699 & Create Buyer Account <ArrowRight size={16} />
              </button>
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
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="nikhil.jangra@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={16} /> Sign In to My Buyer Dashboard <ArrowRight size={16} />
              </button>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  New buyer?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="font-black text-emerald-700 hover:underline cursor-pointer"
                  >
                    Sign Up & Get ₹699 Access Pass
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
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3.5 px-4 text-slate-900 text-xs font-bold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield size={16} className="text-emerald-400" /> Authenticate Admin Access <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Razorpay Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        propertyDetails={signUpData}
      />
    </div>
  );
};

export default AuthPage;
