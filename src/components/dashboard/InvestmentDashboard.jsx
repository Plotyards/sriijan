import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, DollarSign, Wallet, ArrowUpRight, BarChart3, Calculator, Building } from 'lucide-react';

const InvestmentDashboard = () => {
  const { activeProperty } = useApp();
  const [customRentalRate, setCustomRentalRate] = useState(38000);

  if (!activeProperty) return null;

  const { financials, name, tower, unitNo, type } = activeProperty;

  // Custom formatting functions
  const formatRupees = (amount) => {
    if (!amount) return '₹0';
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const bookedFormatted = formatRupees(financials.bookedPrice);
  const builderFormatted = formatRupees(financials.builderCurrentPrice);
  const resaleFormatted = formatRupees(financials.resaleMarketPrice);
  const profitFormatted = formatRupees(financials.estimatedAppreciation);

  return (
    <div className="space-y-8">
      {/* Header Summary Banner */}
      <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-500/15 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-amber-500/30 flex items-center gap-1">
              <TrendingUp size={12} /> Live Market Valuation
            </span>
            <span className="text-slate-500 text-xs font-semibold">Updated August 2026</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{name} Investment Portfolio</h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            {tower} • Unit {unitNo} • {type}
          </p>
        </div>

        {/* Estimated Profit Tag */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Estimated Profit / Appreciation</span>
            <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {profitFormatted}
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                +{financials.appreciationPercentage}% ROI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Financial Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Booked Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
            <span>Booked Price</span>
            <span className="bg-slate-100 p-1.5 rounded-lg text-slate-600">
              <Wallet size={16} />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{bookedFormatted}</div>
          <p className="text-xs text-slate-500 mt-2">Booked on {activeProperty.bookingDate}</p>
        </div>

        {/* Builder Current Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
            <span>Current Builder Price</span>
            <span className="bg-amber-50 p-1.5 rounded-lg text-amber-600">
              <Building size={16} />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{builderFormatted}</div>
          <div className="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +{(((financials.builderCurrentPrice - financials.bookedPrice) / financials.bookedPrice) * 100).toFixed(1)}% Builder Hike
          </div>
        </div>

        {/* Current Resale Market Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
            <span>Resale Market Price</span>
            <span className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600">
              <TrendingUp size={16} />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{resaleFormatted}</div>
          <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight size={12} /> High Resale Demand
          </div>
        </div>

        {/* Estimated Rental Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
            <span>Est. Rental Yield</span>
            <span className="bg-blue-50 p-1.5 rounded-lg text-blue-600">
              <DollarSign size={16} />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">₹{customRentalRate.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span></div>
          <div className="text-xs text-blue-600 font-bold mt-2">
            ~{financials.rentalYieldPercentage}% Annual Gross Yield
          </div>
        </div>
      </div>

      {/* Price Appreciation Chart & History Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Price Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <BarChart3 size={18} className="text-amber-600" />
                Capital Appreciation Trend
              </h3>
              <p className="text-xs text-slate-500">Comparison of Builder Direct Price vs Resale Market Value over time (in ₹ Crores)</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> Builder Price
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Resale Market
              </span>
            </div>
          </div>

          {/* Visual SVG Chart */}
          <div className="relative w-full h-64 bg-slate-50/50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 180">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#e2e8f0" strokeDasharray="4" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#e2e8f0" strokeDasharray="4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#e2e8f0" strokeDasharray="4" />
              <line x1="0" y1="170" x2="500" y2="170" stroke="#e2e8f0" strokeDasharray="4" />

              {/* Y-Axis Labels */}
              <text x="5" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold">₹1.7 Cr</text>
              <text x="5" y="68" fill="#94a3b8" fontSize="10" fontWeight="bold">₹1.5 Cr</text>
              <text x="5" y="118" fill="#94a3b8" fontSize="10" fontWeight="bold">₹1.3 Cr</text>
              <text x="5" y="168" fill="#94a3b8" fontSize="10" fontWeight="bold">₹1.1 Cr</text>

              {/* Builder Price Line (Amber) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,150 130,135 220,115 310,95 400,80 470,68"
              />

              {/* Resale Price Line (Emerald) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,150 130,128 220,105 310,85 400,68 470,52"
              />

              {/* Markers for Resale */}
              <circle cx="50" cy="150" r="5" fill="#10b981" />
              <circle cx="130" cy="128" r="5" fill="#10b981" />
              <circle cx="220" cy="105" r="5" fill="#10b981" />
              <circle cx="310" cy="85" r="5" fill="#10b981" />
              <circle cx="400" cy="68" r="5" fill="#10b981" />
              <circle cx="470" cy="52" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-2 border-t border-slate-200 px-2">
              {financials.priceHistory.map((item, idx) => (
                <span key={idx}>{item.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Rental Yield Calculator & Financial Breakdown */}
        <div className="space-y-6">
          {/* Payment Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <Wallet size={16} className="text-amber-600" />
              Payment Milestone Status
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Total Paid (75%)</span>
                <span className="font-bold text-emerald-600">{formatRupees(financials.paidAmount)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[75%]"></div>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-slate-600 font-medium">Pending Demand Balance</span>
                <span className="font-bold text-amber-600">{formatRupees(financials.pendingDemand)}</span>
              </div>
            </div>
          </div>

          {/* Rental Yield Calculator */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Calculator size={16} className="text-blue-600" />
              Possession Rental Yield Calculator
            </h3>
            <p className="text-xs text-slate-500 mb-4">Adjust estimated monthly rent to forecast rental income</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 font-bold flex justify-between">
                  <span>Monthly Rent:</span>
                  <span className="text-blue-600 font-extrabold">₹{customRentalRate.toLocaleString('en-IN')} / mo</span>
                </label>
                <input
                  type="range"
                  min="25000"
                  max="80000"
                  step="2500"
                  value={customRentalRate}
                  onChange={(e) => setCustomRentalRate(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl text-xs space-y-1 text-blue-900 border border-blue-100">
                <div className="flex justify-between font-medium">
                  <span>Annual Rental Income:</span>
                  <span className="font-bold">₹{(customRentalRate * 12).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Gross Rental Yield:</span>
                  <span className="font-bold">{(((customRentalRate * 12) / financials.bookedPrice) * 100).toFixed(2)}% p.a.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
