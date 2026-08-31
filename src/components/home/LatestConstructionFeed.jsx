import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, CheckCircle2, Calendar, Lock, ArrowRight, ShieldCheck, UserCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const LatestConstructionFeed = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Check if current user is an authenticated property owner
  const isOwner = currentUser && currentUser.isLoggedIn;

  const updates = [
    {
      id: 1,
      project: "Sriizan Grand Residency",
      location: "Sector 84, Gurugram",
      title: "Tower B External Brickwork & Glass Glazing Complete",
      stage: "Brickwork & Plastering (85%)",
      date: "August 2026",
      type: "Site Photo",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
      notes: "Civil engineer audit verified. Double-glazed balcony sliding frames installed on 14th floor."
    },
    {
      id: 2,
      project: "M3M Golf Hills Suite",
      location: "Sector 79, Gurugram",
      title: "Tower C 14th Floor Slab Casting Complete",
      stage: "RCC Superstructure (70%)",
      date: "July 2026",
      type: "Site Photo",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000&auto=format&fit=crop",
      notes: "Structural concrete cube test passed with 35 MPa strength rating. Ready for shuttering next level."
    },
    {
      id: 3,
      project: "Sriizan Grand Residency",
      location: "Sector 84, Gurugram",
      title: "Podium Clubhouse & Swimming Pool Deck Base Casting",
      stage: "Amenities & Common Area",
      date: "July 2026",
      type: "Drone Survey",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop",
      notes: "High-altitude 4K drone flythrough recorded. Foundation waterproofing membrane inspected and approved."
    },
    {
      id: 4,
      project: "Signature Global Titanium",
      location: "Sector 71, SPR Road",
      title: "Elevator Shaft Installation & Service Lobby Plaster",
      stage: "Plumbing & Electrical Piping",
      date: "June 2026",
      type: "Site Photo",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop",
      notes: "Dual Otis high-speed lift shafts aligned with precision laser leveling. Conduit pipes laid."
    }
  ];

  return (
    <section id="updates" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-900 text-xs font-bold uppercase tracking-wider bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
            <Lock size={12} className="text-emerald-700" /> Private Homeowner Stream
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            Live Construction Updates & Drone Media
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            To guarantee homebuyer privacy, stage-wise photos, civil engineering logs, and 4K drone surveillance are protected and visible only to verified unit allottees.
          </p>
        </div>

        {/* PRIVACY SHIELD: Shown if user is NOT logged in */}
        {!isOwner ? (
          <div className="relative">
            {/* Blurred Background Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 filter blur-[6px] select-none pointer-events-none opacity-40">
              {updates.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
                  <div className="h-44 bg-slate-900 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase">{item.project}</div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlaid Luxury Lock Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full bg-slate-950/95 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-inner">
                  <Lock size={26} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    Owner Confidential Media
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                    Restricted to Verified Property Owners
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
                    Live 4K drone surveys, civil milestone reports, and site photos are encrypted and accessible exclusively to owners of registered units.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Log In to View Your Unit Updates</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('register');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
                  >
                    Register My Property
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[10.5px] text-slate-400 font-semibold">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>256-Bit Encrypted Data Vault &bull; RERA Verified Access</span>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* UNLOCKED: Shown when logged in as Verified Owner */
          <div className="space-y-6">
            {/* Owner Welcome Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <UserCheck size={16} />
                </div>
                <div>
                  <span className="font-black text-emerald-950">Verified Allottee Access Granted</span>
                  <p className="text-slate-600 font-medium">Logged in as {currentUser.name}. Live field inspection photos and drone recordings unlocked.</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Open Full Owner Dashboard</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Unlocked Photo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {updates.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:border-emerald-500"
                  onClick={() => setSelectedPhoto(item)}
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    <div className={`absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-md ${
                      item.type === 'Drone Survey'
                        ? 'bg-cyan-950/85 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950/85 text-amber-300 border-amber-500/40 shadow-sm'
                    }`}>
                      {item.type === 'Drone Survey' ? <Video size={11} className="text-cyan-400" /> : <Camera size={11} className="text-amber-400" />}
                      <span>{item.type.toUpperCase()}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} className="text-emerald-400" /> {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                        {item.project}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2 mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1">
                        {item.notes}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-600" /> Audited Stage
                      </span>
                      <span className="text-emerald-700 font-black group-hover:underline">
                        View Full HD
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Photo Inspection (Owners Only) */}
      {selectedPhoto && isOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 text-white rounded-full hover:bg-slate-900 cursor-pointer"
            >
              <X size={20} />
            </button>

            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="p-6 space-y-2">
              <div className="text-xs font-black text-emerald-700 uppercase">
                {selectedPhoto.project} &bull; {selectedPhoto.date}
              </div>
              <h3 className="text-lg font-black text-slate-900 font-serif">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {selectedPhoto.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestConstructionFeed;
