import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle, Sparkles, ShieldAlert, KeyRound, CreditCard, Layers, ShieldCheck, Zap } from 'lucide-react';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { services, startContactFlow, paymentSettings, setActiveView } = useApp();

  // Filter only enabled services
  const activeServices = services.filter((s) => s.enabled);

  // Helper icon selector based on service name
  const getServiceIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('hacked') || lower.includes('recovery')) {
      return ShieldAlert;
    }
    if (lower.includes('disable')) {
      return KeyRound;
    }
    if (lower.includes('payout')) {
      return CreditCard;
    }
    if (lower.includes('royelity') || lower.includes('royalty')) {
      return Sparkles;
    }
    return Layers;
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            <span>Available Services</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Account Support & Digital Solutions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select a service below to request immediate assistance directly with Somi Rai.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service: ServiceItem) => {
            const Icon = getServiceIcon(service.name);
            const isFree = service.isFree;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md ${
                  isFree
                    ? 'bg-indigo-50/50 border-2 border-indigo-200 border-dashed hover:border-indigo-300'
                    : 'bg-white border border-slate-200 hover:border-indigo-200'
                }`}
              >
                {/* Top content */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    {isFree ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        FREE GIFT
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                        Verified Service
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {service.description || 'Professional priority assistance provided by Somi Rai with verified resolution.'}
                  </p>
                </div>

                {/* Price Section & Action Button */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Pricing:
                      </span>
                      <div className="flex items-center gap-2">
                        {service.originalPrice > 0 && (
                          <span className="text-xs font-semibold text-slate-400 line-through">
                            ₹{service.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {isFree ? (
                          <span className="text-2xl font-black text-emerald-600 uppercase">
                            Free
                          </span>
                        ) : (
                          <span className="text-2xl font-black text-indigo-600">
                            ₹{service.currentPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {service.originalPrice > service.currentPrice && !isFree && (
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
                        Save ₹{(service.originalPrice - service.currentPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Select button */}
                  <button
                    onClick={() => startContactFlow(service.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer active:scale-95 ${
                      isFree
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-indigo-200'
                    }`}
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Polish Gateway / Admin Highlight Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verified Payment Gateways</span>
                </div>
                <div className="text-base font-bold text-white">
                  Fast & Secure Direct Processing
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <div className="bg-white/10 px-3 py-1 rounded-full font-mono text-slate-200">
                    UPI: {paymentSettings?.upiId || '6381061760@paytm'}
                  </div>
                  <div className="bg-indigo-600/90 text-white px-3 py-1 rounded-full font-medium">
                    {paymentSettings?.razorpayPaymentLink ? 'Razorpay: Connected' : 'Razorpay: Available'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  startContactFlow();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                Request Assistance
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};

