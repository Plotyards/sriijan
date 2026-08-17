import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 xl:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3">
              <Logo variant="dark" size="normal" />
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Tracking Homes. Building Trust.<br />
              Bharat's Premier Property Construction & Investment Tracking Platform.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-black text-amber-400 tracking-widest uppercase">Platform</h3>
                <ul className="mt-4 space-y-3 text-sm font-bold">
                  <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-slate-300 hover:text-amber-400 transition-colors">How it Works</a></li>
                  <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-slate-300 hover:text-amber-400 transition-colors">Features</a></li>
                  <li><a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-slate-300 hover:text-amber-400 transition-colors">Testimonials</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-xs font-black text-amber-400 tracking-widest uppercase">Support & WhatsApp</h3>
                <ul className="mt-4 space-y-3 text-sm font-bold">
                  <li><a href="#register" onClick={(e) => scrollToSection(e, 'register')} className="text-slate-300 hover:text-amber-400 transition-colors">Register Property</a></li>
                  <li><a href="https://wa.me/919870534978" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">WhatsApp Concierge (+91 98705 34978)</a></li>
                  <li><a href="#faqs" onClick={(e) => scrollToSection(e, 'faqs')} className="text-slate-300 hover:text-amber-400 transition-colors">FAQs</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-black text-amber-400 tracking-widest uppercase">Legal & Compliance</h3>
                <ul className="mt-4 space-y-3 text-sm font-bold">
                  <li><Link to="/privacy" className="text-slate-300 hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-slate-300 hover:text-amber-400 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
          <p>&copy; 2026 Promohomex Platform. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-extrabold text-amber-400 tracking-wider">CONSTRUCTION • TRACKED • LIVE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
