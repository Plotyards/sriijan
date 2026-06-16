import React from 'react';
import { Eye, Clock, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Total Transparency',
    description: 'Get regular updates, photos, and videos directly from the construction site, eliminating all guesswork.',
    icon: Eye,
  },
  {
    name: 'Ultimate Convenience',
    description: 'Access all your property information from anywhere. No need for time-consuming physical site visits.',
    icon: Clock,
  },
  {
    name: 'Investment Tracking',
    description: 'Understand your property\'s market appreciation and investment growth with our data-driven insights.',
    icon: TrendingUp,
  },
  {
    name: 'Peace of Mind',
    description: 'Stay relaxed and informed throughout your entire home-buying journey, knowing your investment is secure.',
    icon: Heart,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const Features = () => {
  return (
    <div id="features" className="py-24 bg-gray-900 overflow-hidden relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <h2 className="text-sm font-bold tracking-widest text-brand-yellow uppercase mb-3">Our Core Value</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Why Promohomex?
          </h3>
          <p className="max-w-3xl mx-auto text-xl text-gray-400 font-light capitalize">
            We bridge the communication gap in real estate, offering unparalleled benefits and peace of mind to homebuyers.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.name} 
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: -5,
                boxShadow: "0 25px 50px -12px rgba(226, 157, 34, 0.2)"
              }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-xl perspective-1000 transform-gpu transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-dark text-white shadow-lg shadow-brand-red/30">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-6">
                  <h4 className="text-2xl font-bold text-white mb-3">{feature.name}</h4>
                  <p className="text-lg text-gray-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
