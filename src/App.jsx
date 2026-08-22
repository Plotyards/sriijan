import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
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
import Popup from './components/Popup';
import MobileBottomNav from './components/MobileBottomNav';

import BuyerDashboard from './pages/BuyerDashboard';
import AdminPanel from './pages/AdminPanel';
import AuthPage from './pages/AuthPage';

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

function AppContent() {
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
    const element = document.getElementById('register');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-500/30 pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
      <Navbar onRegisterClick={scrollToRegistration} />

      <Routes>
        <Route path="/" element={<Home scrollToRegistration={scrollToRegistration} />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard/*" element={<BuyerDashboard />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Home scrollToRegistration={scrollToRegistration} />} />
      </Routes>

      <Footer />
      <Popup />
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
