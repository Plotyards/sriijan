import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SellPropertyModal = ({ isOpen, onClose }) => {
  const { addNewPropertyBooking, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    tower: '',
    unitNo: '',
    type: '3 BHK Premium',
    carpetArea: '1850',
    expectedPrice: '16000000',
    bookedPrice: '12500000',
    possessionStatus: 'Under Construction (Possession Dec 2026)',
    ownerName: currentUser?.name || '',
    ownerPhone: currentUser?.phone || '',
    ownerEmail: currentUser?.email || '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addNewPropertyBooking({
        fullName: formData.ownerName || 'Property Owner',
        phone: formData.ownerPhone || '+91 98705 34978',
        ownerName: formData.ownerName || 'Property Owner',
        ownerPhone: formData.ownerPhone || '+91 98705 34978',
        email: formData.ownerEmail || 'owner@example.com',
        projectName: formData.projectName || 'Sriizan Premium Residency',
        tower: formData.tower || 'Tower A',
        unitNo: formData.unitNo || 'Unit 1204',
        bookedPrice: formData.bookedPrice || '12500000',
        paymentStatus: 'Resale Listed',
        paymentAmount: 0,
        transactionId: 'SELL-' + Date.now(),
        resalePrice: formData.expectedPrice
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-slate-200 overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-5 px-6 flex items-center justify-between border-b border-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={11} /> Sriizan Resale Marketplace
                </span>
                <h3 className="text-base font-black text-white">Sell My Property</h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          {!isSuccess && (
            <div className="bg-slate-100/80 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'}`}>1</span>
                <span>Property Basics</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-300"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'}`}>2</span>
                <span>Price & Status</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-300"></div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'}`}>3</span>
                <span>Verification</span>
              </div>
            </div>
          )}

          {/* Success State */}
          {isSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-black text-slate-900">Property Listed for Resale! 🎉</h4>
              <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                Your unit in <strong className="text-slate-900">{formData.projectName}</strong> ({formData.tower} - {formData.unitNo}) is now verified and listed on the Sriizan marketplace.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-bold max-w-sm mx-auto">
                Asking Price: <span className="font-mono text-emerald-800 text-sm">₹{(Number(formData.expectedPrice) / 10000000).toFixed(2)} Cr</span> • Active Resale Lead
              </div>
              <button
                onClick={handleClose}
                className="w-full max-w-xs mx-auto py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              {/* STEP 1: Property Basics */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      required
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="e.g. Sriizan Grand Residency / M3M Golf Hills"
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Tower / Block *
                      </label>
                      <input
                        type="text"
                        name="tower"
                        required
                        value={formData.tower}
                        onChange={handleChange}
                        placeholder="e.g. Tower B"
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Unit Number *
                      </label>
                      <input
                        type="text"
                        name="unitNo"
                        required
                        value={formData.unitNo}
                        onChange={handleChange}
                        placeholder="e.g. 1402 (14th Floor)"
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Unit Configuration
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      >
                        <option value="2 BHK Luxury">2 BHK Luxury</option>
                        <option value="2.5 BHK Golf Facing">2.5 BHK Golf Facing</option>
                        <option value="3 BHK Premium">3 BHK Premium + Servant</option>
                        <option value="4 BHK Ultra Luxury">4 BHK Ultra Luxury</option>
                        <option value="Penthouse">Sky Villa / Penthouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Carpet Area (Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        name="carpetArea"
                        value={formData.carpetArea}
                        onChange={handleChange}
                        placeholder="1850"
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Pricing & Status */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Expected Resale Asking Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="expectedPrice"
                      required
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      placeholder="16000000"
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-500 font-bold mt-1 block">
                      Equivalent: ₹{(Number(formData.expectedPrice) / 10000000).toFixed(2)} Crores
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Original Booked Price (₹)
                    </label>
                    <input
                      type="number"
                      name="bookedPrice"
                      value={formData.bookedPrice}
                      onChange={handleChange}
                      placeholder="12500000"
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                    {Number(formData.expectedPrice) > Number(formData.bookedPrice) && (
                      <span className="text-[10px] text-emerald-700 font-extrabold mt-1 block">
                        Estimated Capital Gain: +₹{((Number(formData.expectedPrice) - Number(formData.bookedPrice)) / 100000).toFixed(1)} Lakhs (+{(((Number(formData.expectedPrice) - Number(formData.bookedPrice)) / Number(formData.bookedPrice)) * 100).toFixed(0)}%)
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Current Construction / Possession Status
                    </label>
                    <select
                      name="possessionStatus"
                      value={formData.possessionStatus}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                    >
                      <option value="Under Construction (Possession Dec 2026)">Under Construction (Possession Dec 2026)</option>
                      <option value="Structure Complete (Possession Jun 2027)">Structure Complete (Possession Jun 2027)</option>
                      <option value="Finishing & Fitouts (Possession Late 2026)">Finishing & Fitouts (Possession Late 2026)</option>
                      <option value="Ready to Move / OC Received">Ready to Move / OC Received</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Verification & Contact */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Owner Full Name *
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        required
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        placeholder="+91 98705 34978"
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="ownerEmail"
                        required
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        placeholder="owner@example.com"
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                      <ShieldCheck size={16} className="text-emerald-600" /> 100% Direct Owner Listing
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      Zero broker harassment. Only verified genuine homebuyers can request site visits and send inquiries.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div></div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 rounded-xl font-black text-xs text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-700/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {step < 3 ? (
                    <>Next Step <ArrowRight size={14} /></>
                  ) : (
                    isSubmitting ? 'Publishing Listing...' : <>List on Marketplace <CheckCircle2 size={14} /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SellPropertyModal;
