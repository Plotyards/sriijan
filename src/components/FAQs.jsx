import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is the Promohomex platform free for homebuyers?",
    answer: "Yes! Tracking your property updates and connecting with our support team is completely free for registered homebuyers."
  },
  {
    question: "How often will I receive updates on WhatsApp?",
    answer: "You will receive updates at every major construction milestone, such as slab casting, brickwork completion, and final finishing, along with regular monthly progress reports."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We employ industry-standard encryption and strict privacy protocols. Your data is only used to send you verified updates regarding your specific property."
  },
  {
    question: "Can I reply to the WhatsApp messages?",
    answer: "Yes, our WhatsApp integration connects you directly to a dedicated support representative who can answer your specific queries about the construction progress."
  },
  {
    question: "How is the property value appreciation calculated?",
    answer: "Our system analyzes current local real estate trends, recent sales data in your project, and the completion percentage to provide an estimated current market value of your unit."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-4 hover:border-brand-yellow/30 transition-colors"
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
      >
        <span className="text-white font-semibold text-lg sm:text-xl pr-8">{faq.question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-yellow text-gray-900 border-brand-yellow' : 'text-gray-400'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 text-base leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  return (
    <div id="faqs" className="py-16 sm:py-24 bg-gray-900 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 font-light"
          >
            Everything you need to know about tracking your property with Promohomex.
          </motion.p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={index === openIndex} 
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
