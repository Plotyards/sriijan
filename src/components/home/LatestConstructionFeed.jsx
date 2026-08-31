import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Video, Camera, CheckCircle2, Calendar, MapPin, ExternalLink, X } from 'lucide-react';

const LatestConstructionFeed = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
    <section id="updates" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-cyan-900 text-xs font-black uppercase tracking-wider bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
            <Camera size={13} className="text-cyan-700" /> Field Audits & Drone Media
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Latest Construction Updates Feed
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Live photographic documentation and civil inspection logs uploaded monthly by our on-site verification engineers.
          </p>
        </div>

        {/* 4 Cards Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {updates.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:border-cyan-500"
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Type Tag (Cyan for Drone, Gold for Site Photo) */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-md ${
                  item.type === 'Drone Survey'
                    ? 'bg-cyan-950/85 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-900/30'
                    : 'bg-slate-950/85 text-amber-300 border-amber-500/40 shadow-sm'
                }`}>
                  {item.type === 'Drone Survey' ? <Video size={11} className="text-cyan-400" /> : <Camera size={11} className="text-amber-400" />}
                  <span>{item.type.toUpperCase()}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                    <Calendar size={11} className="text-emerald-400" /> {item.date}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                    {item.project}
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2 mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1">
                    {item.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="text-emerald-800 font-extrabold flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-600" /> Verified Stage
                  </span>
                  <span className="text-emerald-700 font-black flex items-center gap-1 group-hover:underline">
                    View HD <ExternalLink size={11} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {selectedPhoto && (
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
                {selectedPhoto.project} • {selectedPhoto.date}
              </div>
              <h3 className="text-lg font-black text-slate-900">
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
