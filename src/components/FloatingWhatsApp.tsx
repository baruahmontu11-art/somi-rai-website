import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/defaultData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/91${SOCIAL_LINKS.whatsappNumber}?text=${encodeURIComponent('Hello Somi Rai, I need professional account assistance.')}`;

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 left-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-lg shadow-emerald-200 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        aria-label="Chat on WhatsApp with Somi Rai"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
        </div>
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>
    </aside>
  );
};
