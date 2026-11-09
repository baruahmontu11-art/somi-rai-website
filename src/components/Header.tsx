import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Shield, BookOpen, Send, Share2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeView, setActiveView, branding, startContactFlow } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'courses' | 'social') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    startContactFlow();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            aria-label="Go to Somi Rai Home"
          >
            {/* Circular Logo Container */}
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg border-2 border-indigo-100 overflow-hidden shadow-xs transition-transform group-hover:scale-105">
              <img
                src={branding.logoUrl}
                alt="Somi Rai Logo"
                className="w-full h-full rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                {branding.siteTitle || 'Somi Rai'}
              </span>
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Professional Account Support
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-indigo-600'
              }`}
            >
              Home
            </button>

            <button
              onClick={handleContactClick}
              className={`transition-colors cursor-pointer ${
                activeView === 'contact'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-indigo-600'
              }`}
            >
              Contact With Somi
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className={`transition-colors cursor-pointer ${
                activeView === 'courses'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-indigo-600'
              }`}
            >
              PDF Course
            </button>

            <button
              onClick={() => handleNavClick('social')}
              className={`transition-colors cursor-pointer ${
                activeView === 'social'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-indigo-600'
              }`}
            >
              Social Media
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={handleContactClick}
              className="bg-indigo-600 text-white text-xs lg:text-sm font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get Started</span>
            </button>
          </nav>

          {/* Mobile Actions: Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeView === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-5 h-5 text-indigo-600" />
            Home
          </button>

          <button
            onClick={handleContactClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeView === 'contact' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Send className="w-5 h-5 text-indigo-600" />
            Contact With Somi
          </button>

          <button
            onClick={() => handleNavClick('courses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeView === 'courses' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            PDF Course
          </button>

          <button
            onClick={() => handleNavClick('social')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
              activeView === 'social' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Share2 className="w-5 h-5 text-indigo-600" />
            Social Media
          </button>

          <div className="pt-2">
            <button
              onClick={handleContactClick}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-sm text-sm active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
