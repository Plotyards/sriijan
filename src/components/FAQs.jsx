import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is Promohomex free for homebuyers?",
    answer: "Yes! Creating your account, tracking stage-wise construction progress, drone videos, and document storage is completely free for registered homebuyers."
  },
  {
    question: "How are construction stage percentages updated?",
    answer: "Builder admins and verified project engineers update stage completion numbers (Foundation, Structure, Brickwork, Plumbing, Finishing) directly through the Admin Control Panel along with monthly drone survey videos."
  },
  {
    question: "How is property appreciation and resale value calculated?",
    answer: "Promohomex analyzes current builder price list revisions, recent micro-market resale transactions in your sector, and infrastructure completion timelines to provide accurate resale valuations."
  },
  {
    question: "Can I list my property directly on Plotyards for resale?",
    answer: "Yes! Integrated Plotyards support allows you to request instant resale listings and connect with active buyers directly from your Promohomex AI dashboard."
  },
  {
    question: "How are property documents stored securely?",
    answer: "All booking forms, BBA sale agreements, payment receipts, and demand letters are encrypted and digitally stamped under RERA compliance guidelines."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div id="faqs" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold tracking-widest text-amber-600 uppercase bg-amber-100/60 px-3.5 py-1.5 rounded-full border border-amber-200">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            Got Questions? We Have Answers
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg font-medium">
            Everything you need to know about tracking your property on Promohomex.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="spatial-glass rounded-2xl border border-white/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex items-center justify-between w-full p-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-black text-slate-900 text-sm sm:text-base pr-4 flex items-center gap-2.5">
                    <HelpCircle size={19} className="text-amber-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-500 font-bold' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-200/60 pt-3.5 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
