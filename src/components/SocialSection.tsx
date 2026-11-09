import React from 'react';
import { Youtube, Facebook, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/defaultData';

export const SocialSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
            Official Channels
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect With Somi Rai
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Follow our verified social accounts for regular video tutorials, platform updates, and direct support.
          </p>
        </div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* YouTube */}
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                YouTube Channel
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Watch detailed video walkthroughs on digital problem solving and account recovery methods.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-rose-600 text-sm font-bold">
              <span>Subscribe & Watch</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          {/* Facebook */}
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Facebook className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Facebook Page
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Join our community updates, client testimonials, and announcements on Facebook.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 text-sm font-bold">
              <span>Visit Page</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/91${SOCIAL_LINKS.whatsappNumber}?text=Hello%20Somi%20Rai,%20I%20need%20support`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                WhatsApp Support
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Direct one-on-one consultation on +91 {SOCIAL_LINKS.whatsappNumber} for prompt assistance.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 text-sm font-bold">
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
