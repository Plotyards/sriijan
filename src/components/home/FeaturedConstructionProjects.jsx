import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Video, Calendar, ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_PROPERTIES } from '../../data/mockData';

const FeaturedConstructionProjects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const locations = ['All', 'Gurugram', 'Dwarka Expressway', 'New Gurugram'];

  const projects = [
    {
      id: "PH-101",
      name: "Sriizan Grand Residency",
      builder: "Sriizan Infrastructure & Construction",
      location: "Sector 84, Gurugram",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop",
      reraNo: "HRERA-PKL-GGM-1420-2024",
      overallPercentage: 68,
      activeStage: "Brickwork & Plastering (85%)",
      expectedPossession: "Dec 2026",
      droneSurveyDate: "August 2026",
      startingPrice: "₹1.25 Cr",
      currentResale: "₹1.60 Cr",
      photosCount: 24,
      totalTowers: "4 Towers (G+18)"
    },
    {
      id: "PH-102",
      name: "M3M Golf Hills Suite",
      builder: "M3M India",
      location: "Sector 79, Gurugram",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop",
      reraNo: "HRERA-PKL-GGM-892-2024",
      overallPercentage: 42,
      activeStage: "RCC Superstructure (70%)",
      expectedPossession: "Jun 2027",
      droneSurveyDate: "July 2026",
      startingPrice: "₹98 Lakhs",
      currentResale: "₹1.21 Cr",
      photosCount: 18,
      totalTowers: "6 Towers (G+24)"
    },
    {
      id: "PH-103",
      name: "Signature Global Titanium",
      builder: "Signature Global",
      location: "Sector 71, SPR Road",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
      reraNo: "HRERA-PKL-GGM-673-2024",
      overallPercentage: 81,
      activeStage: "Plumbing, Electrical & Flooring (65%)",
      expectedPossession: "Sep 2026",
      droneSurveyDate: "August 2026",
      startingPrice: "₹1.85 Cr",
      currentResale: "₹2.35 Cr",
      photosCount: 32,
      totalTowers: "3 Towers (G+36)"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200 architectural-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-black uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <Building2 size={13} /> Live Construction Progress
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Under-Construction Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Every project audited with 4K drone surveillance, verified civil engineering milestones, and real-time possession forecast.
            </p>
          </div>

          {/* Location Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveFilter(loc)}
                className={`text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === loc
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-emerald-500"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none"></div>

                {/* RERA Badge Top Left */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/20">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>RERA VERIFIED</span>
                </div>

                {/* Drone Badge Top Right (Owner Locked Indicator) */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <Lock size={11} />
                  <span>4K DRONE AUDIT (OWNER)</span>
                </div>

                {/* Bottom Image Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin size={12} className="text-emerald-400" /> {project.location}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded">
                    {project.photosCount} Photos
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">
                    {project.builder} • {project.totalTowers}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {project.name}
                  </h3>
                </div>

                {/* Construction Progress Bar */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-slate-700">Construction Status</span>
                    <span className="text-emerald-700 font-mono text-sm">{project.overallPercentage}% Complete</span>
                  </div>

                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${project.overallPercentage}%` }}
                    ></div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between pt-0.5">
                    <span>Active: <strong className="text-slate-800">{project.activeStage}</strong></span>
                  </div>
                </div>

                {/* Timeline & Price Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Possession Date</span>
                    <div className="font-black text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar size={13} className="text-emerald-700" /> {project.expectedPossession}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Resale Market Price</span>
                    <div className="font-black text-emerald-700 mt-0.5">
                      {project.currentResale} <span className="text-[10px] text-slate-500">({project.startingPrice})</span>
                    </div>
                  </div>
                </div>

                {/* Track Button */}
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3.5 px-4 bg-slate-950 hover:bg-emerald-800 text-white font-black text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer group-hover:bg-emerald-700"
                >
                  <Building2 size={15} className="text-emerald-400" />
                  <span>Track Construction Milestones</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedConstructionProjects;
