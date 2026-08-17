import { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-gray-900 min-h-screen text-gray-300 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-12 uppercase tracking-widest font-semibold">Last Updated: October 2026</p>

          <div className="space-y-8 text-base sm:text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the Promohomex website and platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p>Promohomex provides homebuyers with a platform to track the construction progress of their purchased properties and view estimated property value appreciation. We act as an informational bridge between the property developer and the buyer.</p>
              <p className="mt-4 text-brand-yellow">Disclaimer: We do not guarantee the accuracy of construction timelines or the final financial appreciation of any property. All data provided is for informational purposes only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
              <p>You agree to use our services only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others, or otherwise cause damage to the site or the content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. WhatsApp Communications</h2>
              <p>You agree to receive communications from us electronically via WhatsApp or Email. We will communicate with you regarding updates to your property. You may opt-out of these communications at any time by replying "STOP" to our automated messages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p>The Site and its original content, features, and functionality are owned by Promohomex and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
              <p>Promohomex reserves the right, in its sole discretion, to change the Terms under which the website and services are offered. The most current version of the Terms will supersede all previous versions. We encourage you to periodically review the Terms to stay informed of our updates.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
