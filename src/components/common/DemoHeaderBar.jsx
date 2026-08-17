import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Shield, UserCheck, LayoutDashboard, Home, RotateCcw, Sparkles } from 'lucide-react';

import SpatialSelect from './SpatialSelect';

const DemoHeaderBar = () => {
  const { userRole, setUserRole, properties, activePropertyId, setActivePropertyId, resetToDemoData, currentUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter properties owned by current logged-in buyer
  const buyerProperties = properties.filter((p) => {
    if (!currentUser || !currentUser.email) return true;
    return p.owner && p.owner.email && p.owner.email.toLowerCase() === currentUser.email.toLowerCase();
  });
  const displayProperties = buyerProperties.length > 0 ? buyerProperties : properties;

  return (
    <div className="bg-slate-100 text-slate-800 text-xs py-2 px-3 sm:px-6 border-b border-slate-200 z-50 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-extrabold tracking-wider bg-amber-500/15 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          <Sparkles size={12} className="text-amber-600 animate-pulse" />
          PROMOHOMEX LIVE DEMO MODE
        </span>

        {/* View mode buttons */}
        <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-300 shadow-xs">
          <Link
            to="/"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-bold ${
              location.pathname === '/' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home size={13} />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-bold ${
              location.pathname.startsWith('/dashboard') ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard size={13} />
            <span>Buyer Dashboard</span>
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-bold ${
              location.pathname.startsWith('/admin') ? 'bg-slate-900 text-amber-400 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield size={13} />
            <span>Admin Control Panel</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Active Property Switcher */}
        {location.pathname.includes('/dashboard') && (
          <div className="hidden md:flex items-center gap-1.5 w-48">
            <SpatialSelect
              value={activePropertyId}
              onChange={(newVal) => setActivePropertyId(newVal)}
              options={displayProperties.map((p) => ({
                value: p.id,
                label: p.name,
                subtext: `Unit: ${p.unitNo.replace(/[()]/g, '')}`
              }))}
            />
          </div>
        )}

        {/* Role Toggle */}
        <div className="flex items-center gap-1 text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-300 shadow-xs">
          <UserCheck size={13} className="text-emerald-600" />
          <span className="hidden sm:inline font-medium">Role:</span>
          <button
            onClick={() => {
              const nextRole = userRole === 'buyer' ? 'admin' : 'buyer';
              setUserRole(nextRole);
              if (nextRole === 'admin' && !location.pathname.startsWith('/admin')) {
                navigate('/admin');
              } else if (nextRole === 'buyer' && location.pathname.startsWith('/admin')) {
                navigate('/dashboard');
              }
            }}
            className="font-extrabold text-amber-700 hover:underline capitalize"
          >
            {userRole === 'buyer' ? 'Buyer (Nikhil)' : 'Builder Admin'}
          </button>
        </div>

        {/* Reset Demo button */}
        <button
          onClick={() => {
            if (confirm("Reset demo properties, progress percentages, prices, and notifications to default?")) {
              resetToDemoData();
            }
          }}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded hover:bg-slate-200"
          title="Reset to default mock data"
        >
          <RotateCcw size={12} />
          <span className="hidden lg:inline font-semibold">Reset Demo</span>
        </button>
      </div>
    </div>
  );
};

export default DemoHeaderBar;
