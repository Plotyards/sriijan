import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConstructionProgress from '../components/dashboard/ConstructionProgress';
import InvestmentDashboard from '../components/dashboard/InvestmentDashboard';
import DocumentVault from '../components/dashboard/DocumentVault';
import MarketInsights from '../components/dashboard/MarketInsights';
import NotificationsModal from '../components/dashboard/NotificationsModal';

import SpatialSelect from '../components/common/SpatialSelect';

import { Building2, TrendingUp, FileText, Compass, Bell, ShieldCheck, User, Lock, LogOut, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { activeProperty, properties, activePropertyId, setActivePropertyId, notifications, currentUser, loginUser, logoutUser } = useApp();
  const [activeTab, setActiveTab] = useState('progress');
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Buyer Login Form State
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleBuyerLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!buyerEmail) {
      setAuthError('Please enter your registered buyer email address');
      return;
    }
    const res = await loginUser(buyerEmail, buyerPassword);
    if (res && !res.success) {
      setAuthError(res.error || 'Failed to log in. Please check your credentials.');
    }
  };

  // If no user is logged in, show Buyer Login Guard Card
  if (!currentUser || !currentUser.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black">
              <Building2 size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Buyer Dashboard Login</h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter your registered buyer email & password to view your property tracking dashboard.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} /> {authError}
            </div>
          )}

          <form onSubmit={handleBuyerLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={buyerPassword}
                onChange={(e) => setBuyerPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 border border-amber-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              Log In To My Dashboard <ArrowRight size={16} />
            </button>
          </form>
          
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an account yet?{' '}
              <button 
                onClick={() => navigate('/')} 
                className="font-bold text-amber-600 hover:underline cursor-pointer"
              >
                Sign Up & Register Property
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter properties so logged-in buyer sees ONLY their own booked properties
  const buyerProperties = properties.filter((p) => {
    return p.owner && p.owner.email && p.owner.email.toLowerCase() === currentUser.email.toLowerCase();
  });

  // Empty state when logged-in buyer has no properties registered yet
  if (buyerProperties.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 max-w-3xl mx-auto flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 text-slate-900 text-center space-y-6 w-full">
          <div className="w-20 h-20 bg-amber-500/10 text-amber-600 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20 shadow-md animate-pulse">
            <Building2 size={42} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="inline-flex items-center gap-1.5 text-amber-800 font-black text-[11px] uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              <UserCheck size={13} /> Logged In: {currentUser.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">No Booked Property Found</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              There are no active property bookings linked to <span className="font-bold text-slate-900">{currentUser.email}</span>. Click below to register your booked unit and unlock live construction tracking.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const element = document.getElementById('register');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Building2 size={18} /> + Register Your Booked Property <ArrowRight size={16} />
            </button>

            <button
              onClick={logoutUser}
              className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-slate-200"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayProperties = buyerProperties;
  const currentActiveProperty = displayProperties.find(p => p.id === activePropertyId) || displayProperties[0] || activeProperty;

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'progress', label: 'Construction Progress', icon: Building2 },
    { id: 'investment', label: 'Investment Dashboard', icon: TrendingUp },
    { id: 'documents', label: 'Property Documents', icon: FileText },
    { id: 'market', label: 'Market Insights', icon: Compass }
  ];

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7">
      {/* Top Header Card: Spatial Liquid Glass */}
      <div className="liquid-glass-card rounded-3xl p-5 sm:p-7 border border-white/80 flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 text-amber-600 flex items-center justify-center font-extrabold text-xl border border-amber-500/30 shrink-0 shadow-inner">
            <Building2 size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{currentActiveProperty.name}</h1>
              <span className="bg-emerald-50/90 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck size={12} /> {currentActiveProperty.verificationStatus}
              </span>
              <span className="bg-amber-50/90 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <UserCheck size={12} /> Buyer: {currentUser.name || currentActiveProperty.owner.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Tower: <span className="font-black text-slate-900">{currentActiveProperty.tower}</span> • Unit: <span className="font-black text-amber-700">{currentActiveProperty.unitNo.replace(/[()]/g, '')}</span> ({currentActiveProperty.type})
            </p>
          </div>
        </div>

        {/* Property Selector, Notification Bell & Buyer Logout */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          {/* Spatial Property Selector (Filtered for Logged-In Buyer) */}
          <div className="w-full sm:w-64">
            <SpatialSelect
              value={currentActiveProperty.id}
              onChange={(newVal) => setActivePropertyId(newVal)}
              options={displayProperties.map((p) => ({
                value: p.id,
                label: p.name,
                subtext: `Unit: ${p.unitNo.replace(/[()]/g, '')} (${p.tower})`,
                badge: p.id
              }))}
            />
          </div>

          {/* Notification Button */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-3 spatial-glass hover:bg-amber-50 text-slate-800 rounded-xl transition-all shadow-xs cursor-pointer border border-white/80"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Buyer Logout Button */}
          <button
            onClick={logoutUser}
            className="p-3 spatial-glass hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-xl transition-all text-xs font-bold flex items-center gap-1 cursor-pointer border border-white/80"
            title="Log out from Buyer Account"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Spatial Navigation Tabs Bar */}
      <div className="spatial-glass p-2 rounded-2xl border border-white/80 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none relative z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-950 text-white font-black shadow-md border border-slate-900 scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 font-bold'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab View Rendering */}
      <div className="transition-all duration-300">
        {activeTab === 'progress' && <ConstructionProgress />}
        {activeTab === 'investment' && <InvestmentDashboard />}
        {activeTab === 'documents' && <DocumentVault />}
        {activeTab === 'market' && <MarketInsights />}
      </div>

      {/* Notifications Modal/Drawer */}
      <NotificationsModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};

export default BuyerDashboard;
