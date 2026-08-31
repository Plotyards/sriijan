import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, BrainCircuit, Scale, Star, Clock, CheckCircle2, TrendingUp, ExternalLink } from 'lucide-react';
import SpatialSelect from '../common/SpatialSelect';

const AIToolsIntegrations = () => {
  const { activeProperty } = useApp();

  // AI Valuation tool interactive state
  const [floorHeight, setFloorHeight] = useState('14th Floor (Mid High)');
  const [facingView, setFacingView] = useState('Club & Pool Facing (+₹250/sq.ft)');
  const [infraTimeline, setInfraTimeline] = useState('2026 Possession Horizon');

  // Plotyards listing modal state
  const [plotyardsSubmitted, setPlotyardsSubmitted] = useState(false);

  // Juris Forum consultation state
  const [legalBooked, setLegalBooked] = useState(false);

  if (!activeProperty) return null;

  const { financials, builder, name, tower, unitNo } = activeProperty;

  // Recalculated AI Valuation based on user selections
  const basePrice = financials.resaleMarketPrice;
  let floorBonus = floorHeight.includes('High') ? 300000 : 150000;
  let viewBonus = facingView.includes('Pool') ? 500000 : 200000;
  const projectedValuation = basePrice + floorBonus + viewBonus + 1200000;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-50 text-purple-700 text-xs px-3 py-0.5 rounded-full font-extrabold border border-purple-200 flex items-center gap-1">
              <BrainCircuit size={13} /> Powered by Sriizan Neural AI Engine
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">AI Analytics & Future Value Integrations</h2>
          <p className="text-sm text-slate-600 font-medium mt-0.5">
            AI-driven valuation modeling, construction delay probability index, Plotyards resale integration & Juris Forum legal verification
          </p>
        </div>
      </div>

      {/* Grid: AI Property Value Predictor & AI Delay Risk Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool 1: AI Property Value Prediction */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">AI Property Value Predictor</h3>
                  <p className="text-xs text-slate-500">Machine-learning forecast for possession resale value</p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                Predictive AI 2.0
              </span>
            </div>

            {/* Interactive Spatial Inputs */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5">
              <SpatialSelect
                label="Select Floor Level:"
                value={floorHeight}
                onChange={(newVal) => setFloorHeight(newVal)}
                options={[
                  '14th Floor (Mid High)',
                  '18th Floor (Top Penthouse View)',
                  '5th Floor (Low Floor)'
                ]}
              />

              <SpatialSelect
                label="Facing / View Premium:"
                value={facingView}
                onChange={(newVal) => setFacingView(newVal)}
                options={[
                  'Club & Pool Facing (+₹250/sq.ft)',
                  'Green Belt Park Facing (+₹150/sq.ft)',
                  'Standard Courtyard View'
                ]}
              />

              <SpatialSelect
                label="Infrastructure Possession Horizon:"
                value={infraTimeline}
                onChange={(newVal) => setInfraTimeline(newVal)}
                options={[
                  '2026 Possession Horizon (Post Metro Completion)',
                  '2027 Post Possession Phase'
                ]}
              />
            </div>

            {/* Forecast Output */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 shadow-xs">
              <div className="text-[11px] text-amber-900 font-extrabold uppercase tracking-wider">AI Projected Possession Value</div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                ₹{(projectedValuation / 10000000).toFixed(2)} Crores
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={13} /> Projected Net ROI: +{(((projectedValuation - financials.bookedPrice) / financials.bookedPrice) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: AI Construction Delay Risk Assessor */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">AI Delay Risk Prediction</h3>
                  <p className="text-xs text-slate-500">Weather, material supply & past builder delivery speed analysis</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Low Risk Profile
              </span>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600 font-medium">Delivery On-Time Index:</span>
                <span className="text-sm font-extrabold text-emerald-600">92% High Probability</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-full rounded-full w-[92%]"></div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Estimated Schedule Buffer:</span>
                <span className="font-bold text-slate-900">~15 Days Grace Period</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Builder Past Track Record:</span>
                <span className="font-bold text-slate-900">14/15 Projects On-Time</span>
              </div>
            </div>
          </div>

          {/* Builder Performance Score Card */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Star size={14} className="fill-amber-500 text-amber-500" /> {builder} Rating
              </span>
              <span className="text-sm font-extrabold text-amber-900">4.86 / 5.0</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-amber-800 font-semibold text-center mt-2">
              <div className="bg-white/80 p-1.5 rounded">Quality: 4.9</div>
              <div className="bg-white/80 p-1.5 rounded">Timeliness: 4.7</div>
              <div className="bg-white/80 p-1.5 rounded">Legal: 5.0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Direct Sell on Plotyards & Legal Support (The Juris Forum) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plotyards Resale Integration */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded">
                INTEGRATED PARTNER
              </span>
              <h3 className="font-bold text-slate-900 text-lg">Direct "Sell on Plotyards" Resale</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Instantly list your unit for resale on Plotyards.com to reach over 50,000 active buyers & verified brokers without paying heavy brokerage fees.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Verified Unit:</span>
                <span className="font-bold text-slate-900">{name} ({tower}, Unit {unitNo})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recommended Listing Price:</span>
                <span className="font-extrabold text-emerald-600">₹{(financials.resaleMarketPrice / 10000000).toFixed(2)} Cr</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {plotyardsSubmitted ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} /> Resale evaluation request submitted to Plotyards advisor!
              </div>
            ) : (
              <button
                onClick={() => setPlotyardsSubmitted(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                List Property on Plotyards <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Legal Verification Support through The Juris Forum */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">
                LEGAL PARTNER
              </span>
              <h3 className="font-bold text-slate-900 text-lg">Legal Verification (The Juris Forum)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Get official title verification, BBA legal audit, and possession clearance reports backed by real estate legal experts at The Juris Forum.
            </p>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
              <Scale size={24} className="text-blue-600 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-blue-950">RERA & Title Clear Badge</div>
                <p className="text-blue-800 text-[11px]">All property documents verified under RERA Haryana legal framework.</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {legalBooked ? (
              <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} /> Legal consultation request confirmed with The Juris Forum attorney!
              </div>
            ) : (
              <button
                onClick={() => setLegalBooked(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Scale size={15} /> Book Juris Forum Legal Audit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsIntegrations;
