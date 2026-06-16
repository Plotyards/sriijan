import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    projectName: '',
    unitNumber: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Very subtle tilt for a large form
  const rotateX = useTransform(y, [-500, 500], [5, -5]);
  const rotateY = useTransform(x, [-500, 500], [-5, 5]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Background Database/Google Sheet Save (Hidden from URL)
    try {
      // TODO: Replace this with your actual Google Apps Script Web App URL or Webhook
      const dbWebhookUrl = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"; 
      
      // We only execute if the URL is set
      if (dbWebhookUrl !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        await fetch(dbWebhookUrl, {
          method: 'POST',
          mode: 'no-cors', // Prevents CORS issues with Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
      }
    } catch (error) {
      console.error("Error saving to database:", error);
      // We proceed to WhatsApp even if background save fails silently
    }

    // 2. Construct WhatsApp message
    const message = `Hello Promohomex Team! I would like to register for construction updates. 
    
*Details:*
- *Name:* ${formData.name}
- *Mobile:* ${formData.mobile}
- *Email:* ${formData.email}
- *Project Name:* ${formData.projectName}
- *Unit Number:* ${formData.unitNumber}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '919870534978'; 
    
    // 3. Redirect to WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset Form
    setIsSubmitting(false);
    setFormData({ name: '', mobile: '', email: '', projectName: '', unitNumber: '' });
  };

  return (
    <div id="register" className="bg-gray-900 py-16 sm:py-24 lg:py-32 relative overflow-hidden perspective-[2000px]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red rounded-full opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[800px] h-[800px] bg-brand-yellow rounded-full opacity-10 blur-[120px]"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        
        <motion.div 
          style={{ rotateX, rotateY, z: 100, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouse}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-gray-800/40 backdrop-blur-3xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 transform-style-3d"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full relative z-10" style={{ transform: "translateZ(30px)" }}>
            
            {/* Form Info Section */}
            <div className="lg:col-span-2 bg-gradient-to-br from-brand-red to-brand-red-dark backdrop-blur-md p-6 sm:p-10 text-white flex flex-col justify-between shadow-[20px_0_50px_rgba(0,0,0,0.3)] relative z-20 border-r border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">Start Tracking</h3>
                <p className="text-red-100/80 font-light mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed">
                  Fill in your details to get securely connected with our support team on WhatsApp and start receiving your property updates.
                </p>
                <div className="space-y-6 sm:space-y-8 hidden sm:block">
                  <div className="flex items-start group cursor-default">
                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-2xl border border-white/10 shadow-inner backdrop-blur-sm">
                      <svg className="w-6 h-6 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-brand-yellow uppercase tracking-widest mb-1">WhatsApp Updates</p>
                      <p className="text-lg font-bold text-white">Direct to your phone</p>
                    </div>
                  </div>
                  <div className="flex items-start group cursor-default">
                    <div className="flex-shrink-0 bg-white/10 p-3 rounded-2xl border border-white/10 shadow-inner backdrop-blur-sm">
                      <svg className="w-6 h-6 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-brand-yellow uppercase tracking-widest mb-1">Secure & Private</p>
                      <p className="text-lg font-bold text-white">Verified buyer data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Input Section */}
            <div className="lg:col-span-3 p-6 sm:p-10 relative z-10" style={{ transform: "translateZ(10px)" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} 
                      className="block w-full rounded-xl bg-white/5 border border-white/10 py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-inner" 
                      placeholder="John Doe" />
                  </div>
                  
                  <div>
                    <label htmlFor="mobile" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mobile Number</label>
                    <input type="tel" name="mobile" id="mobile" required value={formData.mobile} onChange={handleChange} 
                      className="block w-full rounded-xl bg-white/5 border border-white/10 py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-inner" 
                      placeholder="+91 98765 43210" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} 
                      className="block w-full rounded-xl bg-white/5 border border-white/10 py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-inner" 
                      placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="projectName" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Project Name</label>
                    <input type="text" name="projectName" id="projectName" required value={formData.projectName} onChange={handleChange} 
                      className="block w-full rounded-xl bg-white/5 border border-white/10 py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-inner" 
                      placeholder="e.g. Plotyards Valley" />
                  </div>

                  <div>
                    <label htmlFor="unitNumber" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Unit Number</label>
                    <input type="text" name="unitNumber" id="unitNumber" required value={formData.unitNumber} onChange={handleChange} 
                      className="block w-full rounded-xl bg-white/5 border border-white/10 py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-inner" 
                      placeholder="e.g. A-102" />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} 
                    className="w-full flex justify-center items-center py-4 px-8 border border-transparent rounded-full shadow-[0_0_20px_rgba(155,0,0,0.3)] text-lg font-bold tracking-wide text-white bg-gradient-to-r from-brand-red to-brand-red-light hover:from-brand-red-light hover:to-brand-red focus:outline-none transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70">
                    {isSubmitting ? 'Processing...' : 'Connect on WhatsApp'}
                  </button>
                  <p className="mt-4 text-center text-xs font-medium text-gray-500">By registering, you agree to our <a href="#" className="text-brand-yellow hover:text-white transition-colors">terms of service</a>.</p>
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
