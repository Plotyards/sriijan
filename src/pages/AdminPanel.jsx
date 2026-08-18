import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield, Building2, TrendingUp, Upload, FilePlus, Bell, CheckCircle2,
  UserCheck, RefreshCw, ShieldCheck, AlertCircle, Lock, LogOut,
  Search, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';

import SpatialSelect from '../components/common/SpatialSelect';

const AdminPanel = () => {
  const {
    properties,
    activePropertyId,
    setActivePropertyId,
    activeProperty,
    updateStageProgress,
    updatePropertyPrices,
    addPhotoToProperty,
    addDocumentToProperty,
    addNotification,
    approveBuyerProperty,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('directory'); // 'directory' | 'progress' | 'prices' | 'media' | 'documents' | 'broadcast' | 'approvals'

  // Admin Auth Credentials Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Directory Search & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'verified' | 'pending'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Stage progress editor form state
  const [selectedStageKey, setSelectedStageKey] = useState('brickwork');
  const [stagePercentInput, setStagePercentInput] = useState(85);

  // Price editor state
  const [builderPriceInput, setBuilderPriceInput] = useState(15200000);
  const [resalePriceInput, setResalePriceInput] = useState(16000000);

  // Media uploader state
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState('External');
  const [photoUrl, setPhotoUrl] = useState('');

  // Document uploader state
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Payment Receipt');
  const docSize = '1.8 MB';

  // Push notification state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifCategory, setNotifCategory] = useState('Milestone');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const res = await loginAdmin(adminEmail, adminPassword);
    if (!res?.success) {
      setAuthError(res?.error || 'Invalid Admin Credentials!');
    }
  };

  // If Admin is NOT Authenticated, display Admin Login Credentials Card
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg font-black">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Builder Admin Login</h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter your official admin credentials to access project management controls.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} /> {authError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                placeholder="admin@promohomex.com"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold py-3 px-4 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-md border border-amber-400 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={16} /> Authenticate Admin Access
            </button>
          </form>

        </div>
      </div>
    );
  }

  if (!activeProperty) return null;

  // Handlers
  const handleUpdateProgress = (e) => {
    e.preventDefault();
    updateStageProgress(activePropertyId, selectedStageKey, stagePercentInput);
    showToast(`Updated ${selectedStageKey} progress to ${stagePercentInput}% for ${activeProperty.name}`);
  };

  const handleUpdatePrices = (e) => {
    e.preventDefault();
    updatePropertyPrices(activePropertyId, builderPriceInput, resalePriceInput);
    showToast(`Updated prices for ${activeProperty.name}! Alert sent to buyer.`);
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photoUrl) return alert("Please provide a photo image URL");
    addPhotoToProperty(activePropertyId, {
      title: photoTitle || 'Site Construction Update',
      category: photoCategory,
      url: photoUrl
    });
    setPhotoTitle('');
    setPhotoUrl('');
    showToast("New construction photo uploaded to buyer gallery!");
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    if (!docTitle) return alert("Please enter document title");
    addDocumentToProperty(activePropertyId, {
      title: docTitle,
      category: docCategory,
      fileSize: docSize,
      status: "Verified & Stamped"
    });
    setDocTitle('');
    showToast(`Document "${docTitle}" uploaded to buyer vault!`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!notifTitle || !notifMessage) return alert("Please enter title & message");
    addNotification({
      propertyId: activePropertyId,
      title: notifTitle,
      message: notifMessage,
      category: notifCategory,
      icon: "Bell"
    });
    setNotifTitle('');
    setNotifMessage('');
    showToast("Push notification broadcasted to buyer!");
  };

  // Directory Filter & Pagination Logic
  const filteredProperties = properties.filter(prop => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      prop.name.toLowerCase().includes(q) ||
      prop.unitNo.toLowerCase().includes(q) ||
      prop.tower.toLowerCase().includes(q) ||
      prop.owner.name.toLowerCase().includes(q) ||
      prop.owner.email.toLowerCase().includes(q) ||
      prop.owner.phone.includes(q);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'verified' && prop.verificationStatus === 'Verified') ||
      (statusFilter === 'pending' && prop.verificationStatus !== 'Verified');

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProperties.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + pageSize);

  const selectPropertyToManage = (propId, targetTab = 'progress') => {
    setActivePropertyId(propId);
    setActiveAdminTab(targetTab);
    const prop = properties.find(p => p.id === propId);
    if (prop) {
      showToast(`Selected "${prop.name} (${prop.unitNo})" for management`);
    }
  };

  // Metrics
  const totalPropertiesCount = properties.length;
  const totalAssetValueCr = (properties.reduce((acc, p) => acc + p.financials.resaleMarketPrice, 0) / 10000000).toFixed(2);
  const pendingApprovalsCount = properties.filter(p => p.verificationStatus.includes('Pending')).length;

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-950/90 backdrop-blur-2xl text-white px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-amber-500/40 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 size={18} className="text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner: Enterprise Administration Header */}
      <div className="relative bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl overflow-hidden">
        {/* Subtle Ambient Illumination */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Branding & Header Info */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 uppercase">
                <Shield size={13} className="text-amber-400" /> Admin Portal &bull; Spatial Control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Promohomex Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Spatial command center for real-time construction stage tracking, market valuations, site media uploads &amp; homebuyer verification.
            </p>
          </div>

          {/* Right: Active Property Context Card */}
          <div className="w-full lg:w-auto bg-slate-800/80 border border-slate-700/80 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg max-w-full">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active Target Project</span>
              </div>
              <p className="text-sm font-bold text-white truncate">
                {activeProperty.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="bg-slate-700/60 px-2 py-0.5 rounded text-[11px] font-medium text-amber-300 border border-slate-600/50">
                  Unit {activeProperty.unitNo.replace(/[()]/g, '')}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-300 font-medium text-[11px]">{activeProperty.tower}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Owner: <span className="text-slate-200 font-medium">{activeProperty.owner.name}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-700/60 shrink-0">
              <button
                onClick={() => setActiveAdminTab('directory')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
                title="View All Properties Directory"
              >
                <Search size={14} /> Switch Project
              </button>

              <button
                onClick={logoutAdmin}
                className="p-2.5 bg-slate-700/50 hover:bg-red-500/20 hover:border-red-500/40 text-slate-300 hover:text-red-400 border border-slate-600/50 rounded-xl transition-all cursor-pointer"
                title="Log out Admin"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Spatial Glass Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 text-amber-600 flex items-center justify-center font-black border border-amber-500/30 shrink-0 shadow-inner">
            <Building2 size={24} />
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Properties Managed</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalPropertiesCount} Units</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">Active tracking enabled</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 text-emerald-600 flex items-center justify-center font-black border border-emerald-500/30 shrink-0 shadow-inner">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Asset Value</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">₹{totalAssetValueCr} Cr</div>
            <div className="text-[11px] text-amber-600 font-bold mt-0.5">Tracked on Promohomex</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 text-blue-600 flex items-center justify-center font-black border border-blue-500/30 shrink-0 shadow-inner">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Pending Verifications</div>
            <div className="text-2xl font-black text-amber-600 mt-0.5">{pendingApprovalsCount} Bookings</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Requires builder sign-off</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 text-purple-600 flex items-center justify-center font-black border border-purple-500/30 shrink-0 shadow-inner">
            <UserCheck size={24} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Active Target Buyer</div>
            <div className="text-lg font-black text-slate-900 mt-0.5 truncate">{activeProperty.owner.name}</div>
            <div className="text-[11px] text-slate-500 font-medium truncate">{activeProperty.owner.phone}</div>
          </div>
        </div>
      </div>

      {/* Google Material Navigation Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'directory', label: 'All Properties Directory', icon: Search },
          { id: 'progress', label: 'Construction Stages', icon: Building2 },
          { id: 'prices', label: 'Price & Valuation', icon: TrendingUp },
          { id: 'media', label: 'Photo & Drone Media', icon: Upload },
          { id: 'documents', label: 'Document Vault', icon: FilePlus },
          { id: 'broadcast', label: 'Push Notifications', icon: Bell },
          { id: 'approvals', label: 'Buyer Approvals', icon: UserCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-950 text-white font-black shadow-md border border-slate-900'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-bold'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Admin Tab Contents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80">

        {/* TAB 0: All Properties Directory with Search & Pagination */}
        {activeAdminTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">All Properties Directory</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Search by owner name, unit number, or project. Click "Select & Manage" to update any property.
                </p>
              </div>
              <span className="bg-slate-100 text-slate-800 text-xs font-black px-3.5 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
                Total: {filteredProperties.length} Properties
              </span>
            </div>

            {/* Search Bar & Status Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Google Search Style Bar */}
              <div className="relative flex-grow">
                <Search size={18} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by Owner Name, Unit No (e.g. 1402), Project, or Mobile..."
                  className="w-full bg-slate-50/90 border border-slate-200 text-slate-900 text-xs font-bold pl-11 pr-10 py-3.5 rounded-2xl outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shrink-0">
                {[
                  { id: 'all', label: 'All Units' },
                  { id: 'verified', label: 'Verified' },
                  { id: 'pending', label: 'Pending' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setStatusFilter(st.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      statusFilter === st.id
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 font-bold'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paginated Property Table */}
            {paginatedProperties.length === 0 ? (
              <div className="text-center py-14 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                <Building2 size={44} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-700">No properties found matching "{searchQuery}"</p>
                <p className="text-xs text-slate-400 mt-1">Try searching with a different unit number, owner name or clear filter.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-slate-100/80 text-slate-700 uppercase tracking-wider text-[10px] font-black border-b border-slate-200/90">
                        <th className="py-3.5 px-5">Unit & Project</th>
                        <th className="py-3.5 px-5">Owner Name</th>
                        <th className="py-3.5 px-5">Contact Info</th>
                        <th className="py-3.5 px-5">Booked Price</th>
                        <th className="py-3.5 px-5">Resale Market Price</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedProperties.map((prop) => {
                        const isCurrentlyActive = prop.id === activePropertyId;
                        const ownerInitials = prop.owner.name.split(' ').map(n => n[0]).join('').slice(0, 2);

                        return (
                          <tr
                            key={prop.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isCurrentlyActive ? 'bg-amber-50/50 font-semibold' : ''
                            }`}
                          >
                            {/* Unit & Project */}
                            <td className="py-4 px-5">
                              <div className="font-black text-slate-900 text-sm">{prop.name}</div>
                              <div className="text-slate-500 mt-0.5 font-medium">
                                Unit: <span className="font-black text-amber-700">{prop.unitNo}</span> ({prop.tower})
                              </div>
                            </td>

                            {/* Owner Name */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-900 font-black flex items-center justify-center border border-amber-500/30 text-xs shrink-0">
                                  {ownerInitials}
                                </div>
                                <div>
                                  <div className="font-black text-slate-900">{prop.owner.name}</div>
                                  <div className="text-[10px] text-slate-400 font-bold">ID: {prop.id}</div>
                                </div>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-4 px-5">
                              <div className="font-bold text-slate-800">{prop.owner.email}</div>
                              <div className="text-[11px] text-slate-500 font-medium">{prop.owner.phone}</div>
                            </td>

                            {/* Booked Price */}
                            <td className="py-4 px-5 font-black text-slate-900 text-xs">
                              ₹{(prop.financials.bookedPrice / 10000000).toFixed(2)} Cr
                            </td>

                            {/* Resale Market Price */}
                            <td className="py-4 px-5">
                              <span className="font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 inline-block text-xs">
                                ₹{(prop.financials.resaleMarketPrice / 10000000).toFixed(2)} Cr
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-5">
                              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                                prop.verificationStatus === 'Verified'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border-amber-200'
                              }`}>
                                {prop.verificationStatus}
                              </span>
                            </td>

                            {/* Action Button */}
                            <td className="py-4 px-5 text-right">
                              {isCurrentlyActive ? (
                                <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs border border-amber-400">
                                  Active Target ✓
                                </span>
                              ) : (
                                <button
                                  onClick={() => selectPropertyToManage(prop.id, 'progress')}
                                  className="bg-slate-950 hover:bg-slate-800 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 ml-auto cursor-pointer"
                                >
                                  Select & Manage <ArrowRight size={13} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination Footer Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to{' '}
                  <span className="font-bold text-slate-900">{Math.min(startIndex + pageSize, filteredProperties.length)}</span> of{' '}
                  <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setCurrentPage(pg)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pg
                            ? 'bg-amber-500 text-slate-950 font-black border border-amber-400'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: Construction Progress & Stages */}
        {activeAdminTab === 'progress' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Update Construction Stage Percentage</h3>
              <p className="text-xs text-slate-500">
                Editing progress for selected target: <span className="font-bold text-slate-900">{activeProperty.name} ({activeProperty.unitNo})</span>
              </p>
            </div>

            <form onSubmit={handleUpdateProgress} className="space-y-4 max-w-xl">
              <SpatialSelect
                label="Select Construction Stage:"
                value={selectedStageKey}
                onChange={(newVal) => {
                  setSelectedStageKey(newVal);
                  const stg = activeProperty.progress.stages.find(s => s.key === newVal);
                  if (stg) setStagePercentInput(stg.percentage);
                }}
                options={activeProperty.progress.stages.map(s => ({
                  value: s.key,
                  label: s.name,
                  subtext: `Status: ${s.status} (${s.date})`,
                  percentage: s.percentage
                }))}
              />

              <div>
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>New Stage Percentage (%):</span>
                  <span className="text-amber-600 font-extrabold text-sm">{stagePercentInput}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stagePercentInput}
                  onChange={(e) => setStagePercentInput(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw size={15} /> Save & Publish Progress Update
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Price & Valuation Manager */}
        {activeAdminTab === 'prices' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Update Builder & Market Resale Prices</h3>
              <p className="text-xs text-slate-500">Updating prices triggers an automated appreciation notification to the homebuyer.</p>
            </div>

            <form onSubmit={handleUpdatePrices} className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-bold text-slate-700">Current Builder Price (₹ Rupees):</label>
                <input
                  type="number"
                  value={builderPriceInput}
                  onChange={(e) => setBuilderPriceInput(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <span className="text-[11px] text-slate-400">Equivalent: ₹{(builderPriceInput / 10000000).toFixed(2)} Cr</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Current Resale Market Price (₹ Rupees):</label>
                <input
                  type="number"
                  value={resalePriceInput}
                  onChange={(e) => setResalePriceInput(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
                <span className="text-[11px] text-slate-400">Equivalent: ₹{(resalePriceInput / 10000000).toFixed(2)} Cr</span>
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp size={15} /> Publish Price Revision & Alert Buyer
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Photo & Drone Media */}
        {activeAdminTab === 'media' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Upload Site Construction Media</h3>
              <p className="text-xs text-slate-500">Add high-resolution site progress photos directly to buyer gallery.</p>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-bold text-slate-700">Photo Title / Caption:</label>
                <input
                  type="text"
                  placeholder="e.g. Tower B 14th Floor Plastering Progress"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <SpatialSelect
                label="Category:"
                value={photoCategory}
                onChange={(newVal) => setPhotoCategory(newVal)}
                options={['External', 'Internal', 'Amenities', 'Common Area']}
              />

              <div>
                <label className="text-xs font-bold text-slate-700">Image URL:</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Upload size={15} /> Upload Photo to Gallery
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Document Vault Uploader */}
        {activeAdminTab === 'documents' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Upload Buyer Document</h3>
              <p className="text-xs text-slate-500">Publish BBA, Payment Receipts, Demand Letters, and Floor Plans into buyer vault.</p>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-bold text-slate-700">Document Name / Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Payment Receipt - Finishing Stage (10%)"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <SpatialSelect
                label="Document Category:"
                value={docCategory}
                onChange={(newVal) => setDocCategory(newVal)}
                options={['Payment Receipt', 'Demand Letter', 'Booking', 'Agreement', 'Floor Plan', 'Brochure']}
              />

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <FilePlus size={15} /> Issue & Encrypt into Buyer Vault
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: Push Notifications Broadcast */}
        {activeAdminTab === 'broadcast' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Broadcast Push Notification Alert</h3>
              <p className="text-xs text-slate-500">Send custom announcement directly to buyer notification center.</p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-bold text-slate-700">Alert Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Special Possession Site Visit Invitation"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <SpatialSelect
                label="Category Tag:"
                value={notifCategory}
                onChange={(newVal) => setNotifCategory(newVal)}
                options={['Milestone', 'Price Update', 'Media', 'Document']}
              />

              <div>
                <label className="text-xs font-bold text-slate-700">Message Content:</label>
                <textarea
                  rows="3"
                  placeholder="Write clear update details for the buyer..."
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Bell size={15} /> Send Push Notification
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: Buyer Property Approvals */}
        {activeAdminTab === 'approvals' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Manage Registered Buyer Bookings</h3>
              <p className="text-xs text-slate-500">Approve or verify newly registered homebuyer property bookings.</p>
            </div>

            <div className="space-y-4">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{prop.name} ({prop.unitNo})</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        prop.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {prop.verificationStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Buyer: <span className="font-bold">{prop.owner.name}</span> ({prop.owner.email}) • {prop.tower}
                    </p>
                  </div>

                  {prop.verificationStatus !== 'Verified' && (
                    <button
                      onClick={() => {
                        approveBuyerProperty(prop.id);
                        showToast(`Verified booking for ${prop.owner.name}!`);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <ShieldCheck size={16} /> Approve & Verify Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
