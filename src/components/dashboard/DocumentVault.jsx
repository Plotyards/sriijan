import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Eye, ShieldCheck, Search, CheckCircle2, X, FileCheck, FilePlus } from 'lucide-react';

const DocumentVault = () => {
  const { activeProperty } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  if (!activeProperty) return null;

  const { documents, name, unitNo, tower } = activeProperty;

  const categories = ['All', 'Booking', 'Agreement', 'Payment Receipt', 'Demand Letter', 'Floor Plan', 'Brochure'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck size={13} /> Stamped & RERA Verified Vault
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Encrypted Property Document Vault</h2>
          <p className="text-sm text-slate-600 font-medium">
            All legal agreements, payment receipts, floor plans, and demand letters for {name} ({tower}, Unit {unitNo})
          </p>
        </div>

        <button
          onClick={() => {
            setRequestSent(true);
            setTimeout(() => setRequestSent(false), 3000);
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
        >
          <FilePlus size={15} /> Request Missing Document
        </button>
      </div>

      {requestSent && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} /> Request sent to builder admin! You will receive notification once uploaded.
        </div>
      )}

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-9 pr-4 py-1.5 rounded-xl text-xs focus:outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => {
          const isPending = doc.status.includes('Pending');
          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <FileText size={22} />
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    isPending ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{doc.category}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                  <span>Date: {doc.date}</span> • <span>Size: {doc.fileSize}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActivePreviewDoc(doc)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye size={14} /> Preview
                </button>
                <a
                  href={`#download-${doc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading "${doc.title}" (${doc.fileSize})...`);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
                  title="Download File"
                >
                  <Download size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileCheck className="text-emerald-400" size={20} />
                <div>
                  <h3 className="font-bold text-sm">{activePreviewDoc.title}</h3>
                  <p className="text-xs text-slate-400">{activePreviewDoc.category} • {activePreviewDoc.fileSize}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Document Mock Viewer Body */}
            <div className="p-8 bg-slate-50 min-h-[320px] flex flex-col justify-between border-b border-slate-200">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700">
                <div className="flex justify-between items-center border-b pb-3">
                  <div className="font-extrabold text-emerald-600 text-base tracking-widest">SRIIZAN OFFICIAL DOCUMENT</div>
                  <div className="text-right text-[10px] text-slate-500">Ref ID: {activePreviewDoc.id.toUpperCase()}</div>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{activePreviewDoc.title}</p>
                  <p>Property: {name} (Tower {tower}, Unit {unitNo})</p>
                  <p>Issue Date: {activePreviewDoc.date}</p>
                  <p>Status: <span className="font-bold text-emerald-600">{activePreviewDoc.status}</span></p>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded border border-emerald-100 text-slate-600 italic">
                  "This document has been digitally verified and stamped by builder administration under RERA Haryana registration regulations."
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" /> 256-Bit Encrypted Document
                </span>
                <button
                  onClick={() => alert(`Downloading "${activePreviewDoc.title}"...`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow"
                >
                  <Download size={14} /> Download PDF ({activePreviewDoc.fileSize})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;
