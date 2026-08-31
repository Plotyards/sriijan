import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { X, User, Shield, Lock, AlertCircle, ArrowRight, Key, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';

import PaymentModal from './PaymentModal';

const AuthModal = ({ isOpen, onClose, initialTab = 'buyer_login' }) => {
  const navigate = useNavigate();
  const { loginUser, registerUser, loginAdmin, addNewPropertyBooking } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab === 'admin' ? 'admin_login' : initialTab);

  // Buyer Login State
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [buyerError, setBuyerError] = useState('');

  // Buyer Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Payment Modal State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  if (!isOpen) return null;

  const handleBuyerLogin = (e) => {
    e.preventDefault();
    setBuyerError('');
    if (!buyerEmail) {
      setBuyerError('Please enter your registered buyer email address.');
      return;
    }
    const res = loginUser(buyerEmail, buyerPassword);
    if (res.success) {
      onClose();
      navigate('/dashboard');
    } else {
      setBuyerError(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleBuyerSignup = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setRegError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    // Register user account
    registerUser(regName.trim(), regPhone.trim(), regEmail.trim(), regPassword);

    // Open ₹699 Payment Modal
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (paymentInfo) => {
    setIsPaymentOpen(false);

    addNewPropertyBooking({
      fullName: regName,
      phone: regPhone,
      email: regEmail,
      projectName: 'Sriizan Grand Residency',
      tower: 'Tower A',
      unitNo: 'Unit 101',
      bookedPrice: '12500000',
      paymentStatus: 'Paid',
      paymentAmount: 699,
      transactionId: paymentInfo.transactionId,
      paymentDate: paymentInfo.paymentDate
    });

    onClose();
    navigate('/dashboard');
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminError('');
    const res = await loginAdmin(adminEmail, adminPassword);
    if (res && res.success) {
      onClose();
      navigate('/admin');
    } else {
      setAdminError(res?.error || 'Invalid Admin Credentials!');
    }
  };

  return (
    <AnimatePresence>
      <div 
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col my-auto"
        >
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 sm:p-6 pb-4 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none"></div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-white/10 shadow-md"
              title="Close modal"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="bg-emerald-600/20 text-emerald-400 text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-600/30 flex items-center gap-1 uppercase tracking-wider">
                <Sparkles size={11} /> Sriizan Real Portal Auth
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white relative z-10 pr-8">
              {activeTab === 'buyer_signup' ? 'Create Real Buyer Account' : (activeTab === 'admin_login' ? 'Builder Admin Portal' : 'Buyer Sign In')}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 relative z-10">
              Access real-time construction tracking, document vaults & property valuations.
            </p>

            {/* Role / Auth Tabs */}
            <div className="grid grid-cols-3 gap-1 mt-3 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-[10px] sm:text-[11px] font-extrabold relative z-10">
              <button
                type="button"
                onClick={() => setActiveTab('buyer_login')}
                className={`py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'buyer_login'
                    ? 'bg-emerald-600 text-white font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User size={12} /> Login
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('buyer_signup')}
                className={`py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'buyer_signup'
                    ? 'bg-emerald-600 text-white font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus size={12} /> Sign Up
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('admin_login')}
                className={`py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'admin_login'
                    ? 'bg-white text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield size={12} className={activeTab === 'admin_login' ? 'text-emerald-600' : ''} /> Admin
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-160px)]">

            {/* BUYER LOGIN TAB */}
            {activeTab === 'buyer_login' && (
              <div className="space-y-4">
                {buyerError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} /> {buyerError}
                  </div>
                )}

                <form onSubmit={handleBuyerLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Buyer Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="buyer@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={buyerPassword}
                      onChange={(e) => setBuyerPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs rounded-xl transition-all shadow-md border border-emerald-400 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={15} /> Log In to Buyer Dashboard <ArrowRight size={15} />
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('buyer_signup')}
                      className="font-black text-emerald-700 hover:underline cursor-pointer"
                    >
                      Register Now
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* BUYER REGISTRATION (SIGN UP) TAB */}
            {activeTab === 'buyer_signup' && (
              <div className="space-y-4">
                {regError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} /> {regError}
                  </div>
                )}

                {regSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} /> {regSuccess}
                  </div>
                )}

                <form onSubmit={handleBuyerSignup} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="e.g. Ramesh Kumar"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="ramesh@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Confirm
                      </label>
                      <input
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Fee Highlight Pill */}
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-emerald-700 animate-pulse" />
                      One-Time Buyer Registration Pass Fee:
                    </span>
                    <span className="font-black text-emerald-800 text-sm">₹699</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs rounded-xl transition-all shadow-md border border-emerald-400 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={15} /> Pay ₹699 & Complete Sign Up <ArrowRight size={15} />
                  </button>
                </form>

                <div className="text-center pt-1">
                  <p className="text-xs text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('buyer_login')}
                      className="font-black text-emerald-700 hover:underline cursor-pointer"
                    >
                      Log In Here
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* ADMIN LOGIN TAB */}
            {activeTab === 'admin_login' && (
              <div className="space-y-4">
                {adminError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} /> {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Admin Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="admin@sriizan.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs rounded-xl transition-all shadow-md border border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={15} /> Authenticate Admin Access <ArrowRight size={15} />
                  </button>
                </form>

                <div className="pt-3 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      loginAdmin("admin@sriizan.com", "admin123");
                      onClose();
                      navigate('/admin');
                    }}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <Key size={13} /> Quick Admin Login (admin@sriizan.com / admin123)
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Razorpay ₹699 Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
        propertyDetails={{
          name: regName,
          email: regEmail,
          mobile: regPhone,
          projectName: 'Sriizan Grand Residency',
          unitNumber: 'Unit 101'
        }}
      />
    </AnimatePresence>
  );
};

export default AuthModal;
