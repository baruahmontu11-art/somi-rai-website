import React from 'react';
import { useApp } from '../context/AppContext';
import { Send, BookOpen, ShieldCheck, Zap, Headphones, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { branding, startContactFlow, setActiveView } = useApp();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 border-b border-slate-200">
      {/* Clean ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute top-10 -right-20 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Professional Solutions Pill Badge */}
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider mb-5">
            Professional Solutions
          </div>

          {/* Circular Logo Container matching theme */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600 flex items-center justify-center p-1 border-2 border-indigo-100 shadow-md">
              <img
                src={branding.logoUrl}
                alt="Somi Rai Official Logo"
                className="w-full h-full rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Main Hero Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3">
            {branding.siteTitle || 'Somi Rai'}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight mb-4">
            Professional Account Support & Digital Services
          </p>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            We specialize in recovery, transfers, and royalty management with premium speed and verified resolution. Trusted support tailored for content creators, influencers, and brands.
          </p>

          {/* The Two Main Action Buttons - Professional Polish Styling */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto">
            <button
              onClick={() => startContactFlow()}
              id="hero-contact-button"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base sm:text-lg"
            >
              <Send className="w-5 h-5 shrink-0" />
              <span>CONTACT WITH SOMI</span>
            </button>

            <button
              onClick={() => {
                setActiveView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="hero-pdf-button"
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-100 rounded-xl font-bold hover:border-indigo-600 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base sm:text-lg shadow-xs"
            >
              <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>PDF COURSE</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Support Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Fast WhatsApp Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-indigo-600" />
              <span>Priority Customer Care</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
