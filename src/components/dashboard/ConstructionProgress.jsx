import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Image as ImageIcon, CheckCircle2, X, Maximize2, ShieldCheck, Film } from 'lucide-react';

const ConstructionProgress = () => {
  const { activeProperty } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activePhotoTab, setActivePhotoTab] = useState('All');

  if (!activeProperty) return null;

  const { progress, media, expectedPossession, name, tower, unitNo, verificationStatus } = activeProperty;
  const categories = ['All', 'External', 'Internal', 'Amenities', 'Common Area'];

  const filteredPhotos = activePhotoTab === 'All'
    ? media.photos
    : media.photos.filter(p => p.category === activePhotoTab);

  return (
    <div className="space-y-8">
      {/* Top Banner: Verification & Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <ShieldCheck size={14} />
              {verificationStatus} by Builder
            </span>
            <span className="text-xs text-slate-500 font-medium">Last updated: {progress.lastUpdated}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
          <p className="text-sm text-slate-600 font-medium mt-0.5">
            {tower} • Unit {unitNo} • Possession Target: <span className="text-amber-600 font-bold">{expectedPossession}</span>
          </p>
        </div>

        {/* Overall Progress Gauge */}
        <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full md:w-auto">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${progress.overallPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-extrabold text-slate-900">{progress.overallPercentage}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Done</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Overall Progress</div>
            <div className="text-lg font-bold text-slate-900">
              {progress.overallPercentage >= 70 ? 'Final Finishing Phase' : 'Structural & Masonry Phase'}
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 size={13} /> Project running on scheduled timeline
            </div>
          </div>
        </div>
      </div>

      {/* Stage-wise Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Stage-Wise Construction Tracker</h3>
            <p className="text-xs text-slate-500">Real-time breakdown from foundation excavation to possession hand-over</p>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            6 Core Milestones
          </span>
        </div>

        <div className="space-y-5">
          {progress.stages.map((stage, idx) => {
            const isCompleted = stage.percentage === 100;
            const isInProgress = stage.percentage > 0 && stage.percentage < 100;

            return (
              <div key={stage.key} className="relative p-4 rounded-xl border transition-all duration-200 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCompleted ? 'bg-emerald-600 text-white' : isInProgress ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                        {stage.name}
                        {isInProgress && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">
                            ACTIVE STAGE
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500">Target Date: {stage.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {stage.status} ({stage.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-slate-300'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Center: Drone Video & Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drone Video Player Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-50 text-red-700 p-2 rounded-lg">
                <Film size={18} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Latest Drone Survey</h3>
                <p className="text-xs text-slate-500">{media.droneVideo.date} aerial flythrough</p>
              </div>
            </div>

            {/* Video Thumbnail Box */}
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative rounded-xl overflow-hidden group cursor-pointer border border-slate-200 shadow-sm aspect-video mt-3"
            >
              <img
                src={media.droneVideo.thumbnail}
                alt="Drone Survey"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={24} className="fill-slate-950 ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-xs px-2 py-1 rounded font-mono font-medium">
                {media.droneVideo.duration} HD
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              360-degree aerial inspection of Tower B facade, roof slab work, podium layout, and surrounding road connectivity.
            </p>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs border border-amber-400"
          >
            <Play size={14} className="fill-slate-950" /> Watch Full Drone Video
          </button>
        </div>

        {/* Monthly Photos Gallery */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <ImageIcon size={18} className="text-amber-600" />
                Monthly Photo Updates
              </h3>
              <p className="text-xs text-slate-500">High-resolution verified photos taken directly at the construction site</p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePhotoTab(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    activePhotoTab === cat ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-slate-950/75 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
                  {photo.month}
                </div>
                <div className="absolute top-2 right-2 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {photo.category}
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-amber-600 transition-colors">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>Click to expand</span>
                    <Maximize2 size={12} className="text-slate-400 group-hover:text-slate-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900"
            >
              <X size={18} />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{selectedPhoto.month} • {selectedPhoto.category}</span>
                <h3 className="text-base font-bold text-slate-900">{selectedPhoto.title}</h3>
              </div>
              <a
                href={selectedPhoto.url}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Open Full Resolution
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-white">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <Film className="text-amber-400" size={18} />
                {media.droneVideo.title}
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`${media.droneVideo.url}?autoplay=1`}
                title={media.droneVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructionProgress;
