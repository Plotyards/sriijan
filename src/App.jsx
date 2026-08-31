import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DualActionHub from './components/home/DualActionHub';
import UserJourneyMap from './components/home/UserJourneyMap';
import FeaturedConstructionProjects from './components/home/FeaturedConstructionProjects';
import LatestConstructionFeed from './components/home/LatestConstructionFeed';
import FeaturedResaleMarketplace from './components/home/FeaturedResaleMarketplace';
import TrustVerificationSection from './components/home/TrustVerificationSection';
import SellPropertyModal from './components/home/SellPropertyModal';
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

const Home = ({ scrollToRegistration, onOpenSellModal }) => (
  <main className="flex-grow">
    <Hero 
      onTrackClick={() => {
        const el = document.getElementById('hub');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }} 
      onSellClick={onOpenSellModal} 
    />
    {/* Dedicated Transition Hub */}
    <div id="hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-14 relative z-20">
      <DualActionHub onOpenSellModal={onOpenSellModal} />
    </div>
    <UserJourneyMap />
    <FeaturedConstructionProjects />
    <LatestConstructionFeed />
    <FeaturedResaleMarketplace onOpenSellModal={onOpenSellModal} />
    <TrustVerificationSection />
    <Testimonials />
    <FAQs />
    <RegistrationForm />
  </main>
);

function AppContent() {
  const location = useLocation();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500/30 pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
      <Navbar 
        onRegisterClick={scrollToRegistration} 
        onSellClick={() => setIsSellModalOpen(true)}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              scrollToRegistration={scrollToRegistration} 
              onOpenSellModal={() => setIsSellModalOpen(true)} 
            />
          } 
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard/*" element={<BuyerDashboard />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route 
          path="*" 
          element={
            <Home 
              scrollToRegistration={scrollToRegistration} 
              onOpenSellModal={() => setIsSellModalOpen(true)} 
            />
          } 
        />
      </Routes>

      {/* Global Sell My Property Listing Modal */}
      <SellPropertyModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
      />

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
