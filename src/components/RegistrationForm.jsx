import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, UserCheck, Lock, AlertCircle, Building2, LogIn, UserPlus } from 'lucide-react';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { addNewPropertyBooking, currentUser } = useApp();
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    mobile: currentUser?.phone || '',
    email: currentUser?.email || '',
    projectName: '',
    tower: '',
    unitNumber: '',
    bookedPrice: '12500000'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-500, 500], [3, -3]);
  const rotateY = useTransform(x, [-500, 500], [-3, 3]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser || !currentUser.isLoggedIn) {
      navigate('/signup');
      return;
    }

    if (!formData.name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.projectName.trim() || !formData.unitNumber.trim()) {
      setFormError("Please fill in your Project Name and Unit Number.");
      return;
    }

    // Direct Property Registration (No payment required on this form)
    setIsSubmitting(true);
    addNewPropertyBooking({
      fullName: formData.name,
      phone: formData.mobile,
      email: formData.email,
      projectName: formData.projectName,
      tower: formData.tower || 'Tower A',
      unitNo: formData.unitNumber,
      bookedPrice: formData.bookedPrice,
      paymentStatus: 'Registered',
      paymentAmount: 0,
      transactionId: 'REG-' + Date.now()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div id="register" className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden border-b border-slate-200">
      {/* Soft Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          style={{ rotateX, rotateY, z: 100, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouse}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-white/90 backdrop-blur-3xl rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.12)] overflow-hidden border border-white/90 relative"
        >
          {/* Frosted Glass Lock Overlay when User is NOT Logged In */}
          {(!currentUser || !currentUser.isLoggedIn) && (
            <div className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center text-white border border-white/10 space-y-4 sm:space-y-5 transition-all overflow-y-auto">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-600/30 to-emerald-700/10 text-emerald-400 border border-emerald-600/40 flex items-center justify-center shadow-[0_0_50px_rgba(5,150,105,0.25)] animate-pulse">
                <Lock size={38} />
              </div>

              <div className="max-w-md space-y-2">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-600/10 px-3.5 py-1 rounded-full border border-emerald-600/30">
                  <ShieldCheck size={13} /> Authentication Required
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Sign Up Before Registering Property
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  Please create a buyer account or sign in first to link and register your booked property to your personal dashboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/25 border border-emerald-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus size={18} /> Sign Up <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs sm:text-sm transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn size={18} /> Sign In
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            {/* Left Info Panel (Spatial Dark Glass Panel) */}
            <div className="lg:col-span-2 bg-slate-950/95 backdrop-blur-3xl p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-600/10 px-3.5 py-1.5 rounded-full border border-emerald-600/30 shadow-xs">
                  <Sparkles size={14} className="animate-pulse" /> Instant Dashboard Access
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-4 text-white tracking-tight leading-tight">
                  Register Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500">
                    Booked Property
                  </span>
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Enter your property booking details to unlock your personalized construction tracking timeline, ROI analytics, drone surveys, and document vault.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3.5 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white font-black shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-emerald-400 tracking-wider">STAGE PROGRESS</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">Monthly site photos & drone surveys</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white font-black shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-emerald-400 tracking-wider">INVESTMENT GROWTH</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">Live market resale price updates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-semibold flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" /> 256-Bit Encrypted Builder Verified Portal
              </div>
            </div>

            {/* Form Inputs Section */}
            <div className="lg:col-span-3 p-8 sm:p-10 bg-white">
              {currentUser?.isLoggedIn && (
                <div className="mb-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 flex items-center justify-between text-xs font-bold shadow-xs">
                  <span className="flex items-center gap-2">
                    <UserCheck size={16} className="text-emerald-600" />
                    Auto-filled details from your account ({currentUser.name})
                  </span>
                  <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded text-emerald-950 font-bold uppercase">
                    Profile Linked
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" /> {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="e.g. Nikhil Jangra"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Mobile Phone
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="+91 98705 34978"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="nikhil@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectName" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      id="projectName"
                      required
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="e.g. Sriizan Grand Residency"
                    />
                  </div>

                  <div>
                    <label htmlFor="tower" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Tower / Block
                    </label>
                    <input
                      type="text"
                      name="tower"
                      id="tower"
                      required
                      value={formData.tower}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="e.g. Tower B"
                    />
                  </div>

                  <div>
                    <label htmlFor="unitNumber" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Unit Number
                    </label>
                    <input
                      type="text"
                      name="unitNumber"
                      id="unitNumber"
                      required
                      value={formData.unitNumber}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="e.g. Unit 1402"
                    />
                  </div>

                  <div>
                    <label htmlFor="bookedPrice" className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
                      Booked Price (₹ Rupees)
                    </label>
                    <input
                      type="number"
                      name="bookedPrice"
                      id="bookedPrice"
                      required
                      value={formData.bookedPrice}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 px-4 text-slate-900 text-xs font-semibold placeholder-slate-400 outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 transition-all"
                      placeholder="12500000"
                    />
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm tracking-wide text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 border border-emerald-500 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating Dashboard...' : (
                      <>
                        <Building2 size={17} /> Register Property & Track Live <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-semibold text-slate-500">
                    Instant property registration with RERA digital vault & automated valuation reports.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationForm;
