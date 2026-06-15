import React from 'react';
import { Camera, Bell, Handshake } from 'lucide-react';

const steps = [
  {
    title: 'Book Your Home',
    description: 'Purchase your dream home and register your details on our secure platform.',
    icon: Handshake,
    number: '01',
  },
  {
    title: 'Track Progress',
    description: 'Receive timely photo and video updates straight from your construction site to your phone.',
    icon: Camera,
    number: '02',
  },
  {
    title: 'Stay Informed',
    description: 'Get notified about major milestones, payment schedules, and property value appreciation.',
    icon: Bell,
    number: '03',
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-brand-yellow uppercase mb-3">The Process</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            How It Works
          </h3>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 font-light">
            We've simplified the entire process so you can sit back and watch your home come to life.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-brand-yellow via-brand-red to-brand-yellow opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative group perspective-1000">
                {/* Step Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform-gpu transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-2 hover:shadow-[0_20px_40px_rgba(226,157,34,0.15)] flex flex-col items-center text-center relative z-10">
                  
                  {/* Icon Circle */}
                  <div className="w-24 h-24 rounded-full bg-gray-800 border-[6px] border-gray-900 flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 z-20 shadow-xl shadow-black/50">
                    <div className="absolute inset-0 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"></div>
                    <step.icon className="w-10 h-10 text-brand-yellow relative z-10" />
                  </div>

                  {/* Step Number Background */}
                  <div className="absolute top-4 right-6 text-7xl font-extrabold text-white/5 pointer-events-none group-hover:text-brand-yellow/10 transition-colors duration-500">
                    {step.number}
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
