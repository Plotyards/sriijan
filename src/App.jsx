import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedConstructionProjects from './components/home/FeaturedConstructionProjects';
import FeaturedResaleMarketplace from './components/home/FeaturedResaleMarketplace';
import CreativeMarketingSection from './components/home/CreativeMarketingSection';
import TrustVerificationSection from './components/home/TrustVerificationSection';
import SellPropertyModal from './components/home/SellPropertyModal';
import ListServiceModal from './components/home/ListServiceModal';
import ProviderProfileModal from './components/home/ProviderProfileModal';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import MobileBottomNav from './components/MobileBottomNav';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoadingSpinner from './components/common/PageLoadingSpinner';

const BuyerDashboard = lazy(() => import('./pages/BuyerDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ResalePropertiesPage = lazy(() => import('./pages/ResalePropertiesPage'));
const ProviderDashboard = lazy(() => import('./pages/ProviderDashboard'));
const FreelancerProfilePage = lazy(() => import('./pages/FreelancerProfilePage'));

const Home = ({ 
  scrollToRegistration, 
  onOpenSellModal, 
  onOpenListServiceModal,
  selectedCategory,
  setSelectedCategory,
  onOpenProviderModal
}) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-grow">
      {/* Top Hero */}
      <Hero 
        onTrackClick={() => scrollToSection('tracking-section')} 
        onSellClick={onOpenSellModal}
        onServicesClick={() => scrollToSection('creative-marketing-section')}
        onListServiceClick={onOpenListServiceModal}
      />

      {/* Construction Milestone Tracking */}
      <FeaturedConstructionProjects />

      {/* Direct Resale Marketplace */}
      <FeaturedResaleMarketplace onOpenSellModal={onOpenSellModal} />

      {/* Verified Real Estate Creators, Marketers & Consultants */}
      <CreativeMarketingSection 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenListService={onOpenListServiceModal}
        onOpenProviderModal={onOpenProviderModal}
      />

      {/* How Sriizan Works & Institutional Trust Standards (Unified) */}
      <TrustVerificationSection />

      {/* Social Proof & FAQs */}
      <Testimonials />
      <FAQs />

      {/* Clean Call To Action Section */}
      <RegistrationForm />
    </main>
  );
};

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
    <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-inner">
      404
    </div>
    <h1 className="text-3xl font-black text-slate-900 mb-2">Page Not Found</h1>
    <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      className="px-6 py-3 rounded-full bg-slate-950 hover:bg-emerald-600 text-white text-xs font-black transition shadow-md cursor-pointer"
    >
      Return to Home
    </Link>
  </div>
);

function AppContent() {
  const location = useLocation();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isListServiceModalOpen, setIsListServiceModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProviderForModal, setSelectedProviderForModal] = useState(null);

  // Standard Scroll Restoration on Navigation
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.state]);

  const scrollToRegistration = () => {
    const element = document.getElementById('register');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500/30 w-full max-w-full overflow-x-hidden">
      <Navbar 
        onRegisterClick={scrollToRegistration} 
        onSellClick={() => setIsSellModalOpen(true)}
        onListServiceClick={() => setIsListServiceModalOpen(true)}
      />

      <ErrorBoundary>
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  scrollToRegistration={scrollToRegistration} 
                  onOpenSellModal={() => setIsSellModalOpen(true)}
                  onOpenListServiceModal={() => setIsListServiceModalOpen(true)}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onOpenProviderModal={(provider) => setSelectedProviderForModal(provider)}
                />
              } 
            />
            <Route 
              path="/resale" 
              element={<ResalePropertiesPage onOpenSellModal={() => setIsSellModalOpen(true)} />} 
            />
            <Route 
              path="/resale-properties" 
              element={<ResalePropertiesPage onOpenSellModal={() => setIsSellModalOpen(true)} />} 
            />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard/*" element={<BuyerDashboard />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/pro-dashboard" element={<ProviderDashboard />} />
            <Route path="/creator-dashboard" element={<ProviderDashboard />} />
            <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
            <Route path="/provider/:id" element={<FreelancerProfilePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {/* Global Sell My Property Listing Modal */}
      <SellPropertyModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
      />

      {/* Global List Real Estate Service Provider Modal (₹699 Lifetime) */}
      <ListServiceModal 
        isOpen={isListServiceModalOpen}
        onClose={() => setIsListServiceModalOpen(false)}
        initialCategory={selectedCategory !== 'All' ? selectedCategory : 'Video Editors'}
      />

      {/* Global Professional Detailed Profile Modal */}
      <ProviderProfileModal 
        isOpen={!!selectedProviderForModal}
        provider={selectedProviderForModal}
        onClose={() => setSelectedProviderForModal(null)}
      />

      <Footer />
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
