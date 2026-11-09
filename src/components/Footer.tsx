import React from 'react';
import { useApp } from '../context/AppContext';
import { SOCIAL_LINKS } from '../data/defaultData';
import { Youtube, Facebook, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { branding, startContactFlow, setActiveView } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-slate-600 pt-12 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center p-0.5 border-2 border-indigo-100 shadow-xs overflow-hidden">
                <img
                  src={branding.logoUrl}
                  alt="Somi Rai Logo"
                  className="w-full h-full rounded-full object-cover bg-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {branding.siteTitle || 'Somi Rai'}
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              Professional Account Support & Digital Services. We specialize in recovery, transfers, and royalty management with verified speed.
            </p>
            <div className="text-xs text-slate-400 font-medium">
              Direct Helpline: <span className="text-slate-700 font-semibold">+91 {SOCIAL_LINKS.whatsappNumber}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    startContactFlow();
                  }}
                  className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Contact With Somi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('courses');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  PDF Course
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Social Media
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-600 hover:text-rose-600 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-rose-500" />
                  <span>YouTube Channel</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Facebook Page</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/91${SOCIAL_LINKS.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: {SOCIAL_LINKS.whatsappNumber}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with copyright and verified support agent badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Somi Rai. All rights reserved.</div>

          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] font-medium">
            <span className="text-slate-600 uppercase tracking-wider font-bold">Verified Support Agent</span>
            <span className="w-px h-3.5 bg-slate-200"></span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
