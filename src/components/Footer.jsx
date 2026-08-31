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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden w-full">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-14 lg:px-8 relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3">
              <Logo variant="dark" size="normal" />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
              Know What's Being Built. Know What's Available.<br />
              Bharat's Premier Property Construction & Investment Tracking Platform.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-emerald-500 tracking-widest uppercase">Platform</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
              <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-slate-300 hover:text-emerald-500 transition-colors">How it Works</a></li>
              <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-slate-300 hover:text-emerald-500 transition-colors">Features</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-slate-300 hover:text-emerald-500 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-emerald-500 tracking-widest uppercase">Support & WhatsApp</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
              <li><a href="#register" onClick={(e) => scrollToSection(e, 'register')} className="text-slate-300 hover:text-emerald-500 transition-colors">Register Property</a></li>
              <li><a href="https://wa.me/919870534978" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-500 transition-colors">WhatsApp Concierge (+91 98705 34978)</a></li>
              <li><a href="#faqs" onClick={(e) => scrollToSection(e, 'faqs')} className="text-slate-300 hover:text-emerald-500 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-emerald-500 tracking-widest uppercase">Legal & Compliance</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
              <li><Link to="/privacy" className="text-slate-300 hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-medium gap-2">
          <p>&copy; 2026 Sriizan. All rights reserved.</p>
          <p className="font-extrabold text-emerald-500 tracking-wider text-[11px]">BUILT • TRACKED • TRADED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
