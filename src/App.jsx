import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const Home = ({ scrollToRegistration }) => (
  <main className="flex-grow">
    <Hero onRegisterClick={scrollToRegistration} />
    <HowItWorks />
    <Testimonials />
    <Features />
    <FAQs />
    <RegistrationForm />
  </main>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  const scrollToRegistration = () => {
    // If not on home page, we would typically redirect first, but since the button is mostly on Home, it's fine.
    // Let's just scroll if we are on the homepage.
    const element = document.getElementById('register');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-brand-yellow/30">
      <Navbar onRegisterClick={scrollToRegistration} />

      <Routes>
        <Route path="/" element={<Home scrollToRegistration={scrollToRegistration} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
