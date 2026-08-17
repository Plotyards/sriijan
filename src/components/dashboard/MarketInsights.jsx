import { useApp } from '../../context/AppContext';
import { Navigation, Sparkles, Compass, CheckCircle2, Building2, Flame } from 'lucide-react';

const MarketInsights = () => {
  const { activeProperty } = useApp();

  if (!activeProperty) return null;

  // Safe fallback market insights data
  const defaultInsights = {
    avgSquareFootPrice: '₹14,500 / sq.ft',
    sectorTrend: '▲ +12.4% Annual Growth',
    nearbyInfra: [
      {
        title: 'Metro Extension Station',
        distance: '800 meters',
        impact: '+15% Expected ROI',
        status: 'Under Construction',
        description: 'Direct metro connectivity connecting to central business hubs.'
      },
      {
        title: 'Dwarka Expressway Connectivity',
        distance: '1.2 km',
        impact: 'High Demand',
        status: 'Operational',
        description: 'Signal-free expressway reducing airport travel time to 15 mins.'
      },
      {
        title: 'Cyber City 2 Commercial Hub',
        distance: '2.5 km',
        impact: 'Rental Yield +18%',
        status: 'Announced',
        description: 'Upcoming 5 million sq.ft IT & Tech Park with top Fortune 500 companies.'
      }
    ],
    newLaunches: [
      { name: 'Promohomex Signature Tower', builder: 'Promohomex Realty', price: '₹15,200 / sq.ft' },
      { name: 'Sobha City Sector 108', builder: 'Sobha Group', price: '₹16,200 / sq.ft' },
      { name: 'M3M Crown Sector 111', builder: 'M3M India', price: '₹15,800 / sq.ft' }
    ]
  };

  const marketInsights = activeProperty.marketInsights || defaultInsights;
  const location = activeProperty.location || activeProperty.projectName || 'Prime Location';

  const nearbyInfra = marketInsights.nearbyInfra || defaultInsights.nearbyInfra;
  const newLaunches = marketInsights.newLaunches || defaultInsights.newLaunches;
  const avgSquareFootPrice = marketInsights.avgSquareFootPrice || defaultInsights.avgSquareFootPrice;
  const sectorTrend = marketInsights.sectorTrend || defaultInsights.sectorTrend;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-50 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-200 flex items-center gap-1">
              <Compass size={13} /> Locational Intelligence
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Infrastructure & Area Market Insights</h2>
          <p className="text-sm text-slate-600 font-medium">
            Real-time updates on metro routes, expressways, micro-market price appreciation, and nearby project launches around {location}
          </p>
        </div>

        <div className="bg-amber-50 text-slate-900 p-4 rounded-xl text-right border border-amber-200 shadow-xs shrink-0">
          <div className="text-[11px] text-amber-800 font-extrabold uppercase">Micro-Market Avg Rate</div>
          <div className="text-xl font-black text-amber-900">{avgSquareFootPrice}</div>
          <div className="text-[11px] text-emerald-700 font-bold">{sectorTrend}</div>
        </div>
      </div>

      {/* Nearby Infrastructure Developments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
          <Navigation size={20} className="text-amber-600" />
          Key Nearby Infrastructure Projects
        </h3>
        <p className="text-xs text-slate-500 mb-6">Upcoming public infrastructure directly impacting capital value appreciation</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {nearbyInfra.map((infra, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {infra.distance}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {infra.impact}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">{infra.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{infra.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>Status:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-amber-500" /> {infra.status || 'Active'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby New Project Launches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
            <Building2 size={20} className="text-amber-600" />
            New Projects Launched in Vicinity
          </h3>
          <p className="text-xs text-slate-500 mb-5">Compare launch prices of newly launched developments nearby</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Builder</th>
                  <th className="p-3">Launch Price</th>
                  <th className="p-3 text-right">Price Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {newLaunches.map((launch, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <Flame size={14} className="text-amber-500" />
                      {launch.name}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{launch.builder}</td>
                    <td className="p-3 font-extrabold text-slate-900">{launch.price}</td>
                    <td className="p-3 text-right font-bold text-emerald-600">+18% over 2024 launch</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Advisory Card */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-slate-950 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Sparkles size={16} /> Promohomex Monthly Advisory
            </div>
            <h4 className="text-xl font-extrabold leading-tight">Strong Hold Recommendation</h4>
            <p className="text-xs text-slate-900/90 font-medium mt-3 leading-relaxed">
              Based on the imminent opening of Metro Sector 84 and Global City commercial land allotment, market prices in your sector are projected to appreciate by another <span className="font-bold underline">15-18%</span> before possession.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-950/20 flex items-center justify-between text-xs font-bold">
            <span>Advisor Rating:</span>
            <span className="bg-slate-950 text-amber-400 px-3 py-1 rounded-full">★ 4.9 Premium Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
