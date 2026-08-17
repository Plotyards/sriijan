import { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-gray-900 min-h-screen text-gray-300 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-12 uppercase tracking-widest font-semibold">Last Updated: October 2026</p>

          <div className="space-y-8 text-base sm:text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>Welcome to Promohomex. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers (specifically for WhatsApp updates).</li>
                <li><strong>Property Data</strong> includes details about the property you have purchased or are tracking (e.g., project name, unit number).</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                <li>To register you as a new user and connect your profile to your property unit.</li>
                <li>To send you automated updates regarding the construction progress of your property via WhatsApp.</li>
                <li>To notify you about changes to our terms or privacy policy.</li>
                <li>To administer and protect our business and this website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. WhatsApp Integration</h2>
              <p>By registering your phone number with Promohomex, you explicitly consent to receiving automated updates and manual support messages via WhatsApp. We do not sell your phone number to third-party marketers. Your communication with us via WhatsApp is subject to WhatsApp's own privacy policy and terms of service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p className="mt-4 text-brand-yellow font-medium">privacy@promohomex.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
