import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  Send,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CreditCard,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { CustomerRequest, ServiceItem } from '../types';
import { generateRequestId } from '../services/storage';

export const ContactFlow: React.FC = () => {
  const {
    services,
    branding,
    paymentSettings,
    submitRequest,
    preselectedServiceId,
    setActiveView,
  } = useApp();

  // Active step: 1 = Details, 2 = Service, 3 = Payment, 4 = Thank You
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Payment method selection & proof
  const [paymentMethod, setPaymentMethod] = useState<'MANUAL_UPI' | 'RAZORPAY'>('MANUAL_UPI');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Final submission state
  const [submittedRecord, setSubmittedRecord] = useState<CustomerRequest | null>(null);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  // Enabled services list
  const activeServices = services.filter((s) => s.enabled);

  // Pre-select service if started from service card
  useEffect(() => {
    if (preselectedServiceId) {
      const match = services.find((s) => s.id === preselectedServiceId && s.enabled);
      if (match) {
        setSelectedService(match);
      }
    }
  }, [preselectedServiceId, services]);

  // Validation for Step 1
  const validateStep1 = () => {
    const errors: { name?: string; phone?: string; address?: string } = {};
    if (!fullName.trim()) {
      errors.name = 'Please enter your full name.';
    }
    if (!phoneNumber.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else if (phoneNumber.trim().length < 8) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!address.trim()) {
      errors.address = 'Please enter your address or city.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Step 2 selection
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    if (service.isFree) {
      // Free service flow: proceed directly to confirmation/thank you
      handleFinalSubmission(service, 'FREE', 'Completed (Free)');
    } else {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Final submission handler
  const handleFinalSubmission = (
    service: ServiceItem,
    method: 'FREE' | 'MANUAL_UPI' | 'RAZORPAY',
    paymentStatus: CustomerRequest['paymentStatus'],
    reference?: string
  ) => {
    const newId = generateRequestId();
    const newRecord: CustomerRequest = {
      id: newId,
      customerName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      serviceId: service.id,
      serviceName: service.name,
      price: service.isFree ? 0 : service.currentPrice,
      isFree: service.isFree,
      paymentMethod: method,
      paymentStatus: paymentStatus,
      paymentProofReference: reference || undefined,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    submitRequest(newRecord);
    setSubmittedRecord(newRecord);
    setCurrentStep(4); // Thank You step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy UPI ID to clipboard
  const handleCopyUpi = () => {
    if (paymentSettings.upiId) {
      navigator.clipboard.writeText(paymentSettings.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Build WhatsApp URL with the exact message format
  const getWhatsAppUrl = () => {
    if (!submittedRecord) return '#';
    const cleanPhone = '916381061760';

    const rawMessage = `Hello Somi Rai,

I want assistance with the following service.

Name: ${submittedRecord.customerName}
Phone: ${submittedRecord.phoneNumber}
Address: ${submittedRecord.address}

Selected Service: ${submittedRecord.serviceName}
Price: ₹${submittedRecord.price.toLocaleString('en-IN')}
Payment Status: ${submittedRecord.paymentStatus}
Request ID: ${submittedRecord.id}

Thank you.`;

    const encoded = encodeURIComponent(rawMessage);
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  };

  return (
    <div className="min-h-[80vh] py-8 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb / Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                if (currentStep === 1) {
                  setActiveView('home');
                } else if (currentStep === 2) {
                  setCurrentStep(1);
                } else if (currentStep === 3) {
                  setCurrentStep(2);
                } else {
                  setActiveView('home');
                }
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 4 ? 'Back to Home' : 'Back'}</span>
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {currentStep === 1 && 'Step 1 of 3: Details'}
              {currentStep === 2 && 'Step 2 of 3: Service'}
              {currentStep === 3 && 'Step 3 of 3: Payment'}
              {currentStep === 4 && 'Request Confirmed'}
            </span>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`h-2 rounded-full transition-all ${
                  currentStep >= stepNumber
                    ? 'bg-indigo-600'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* STEP 1: CUSTOMER DETAILS                             */}
        {/* ---------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs animate-in fade-in duration-300">
            <div className="text-center max-w-md mx-auto mb-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3">
                <User className="w-6 h-6" />
              </div>
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider border border-indigo-100 mb-2">
                Step 1 of 3
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Customer Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Please provide your contact information to begin your service request.
              </p>
            </div>

            <form onSubmit={handleNextFromStep1} className="space-y-5 max-w-md mx-auto">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                    }}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      formErrors.name ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{formErrors.name}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                    placeholder="e.g. 9876543210 (Calling & WhatsApp)"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      formErrors.phone ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{formErrors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                    }}
                    placeholder="Enter your address, city, or state"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${
                      formErrors.address ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                </div>
                {formErrors.address && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{formErrors.address}</p>
                )}
              </div>

              {/* NEXT Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  id="contact-form-next-button"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your contact information is strictly confidential
                </span>
              </div>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 2: SERVICE SELECTION                            */}
        {/* ---------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs animate-in fade-in duration-300">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                Choose Assistance
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Select Your Service
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Hi {fullName || 'there'}, pick the assistance service you need. Free services proceed instantly without payment.
              </p>
            </div>

            <div className="space-y-4">
              {activeServices.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight uppercase">
                          {service.name}
                        </h3>
                        {service.isFree && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                            FREE
                          </span>
                        )}
                      </div>
                      {service.description && (
                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        {service.originalPrice > 0 && (
                          <span className="text-xs font-medium text-slate-400 line-through block">
                            ₹{service.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {service.isFree ? (
                          <span className="text-xl font-black text-emerald-600">
                            FREE
                          </span>
                        ) : (
                          <span className="text-xl font-black text-slate-900">
                            ₹{service.currentPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                          service.isFree
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {service.isFree ? 'Select (Free)' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Details
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 3: PAYMENT PAGE (FOR PAID SERVICES)            */}
        {/* ---------------------------------------------------- */}
        {currentStep === 3 && selectedService && !selectedService.isFree && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm animate-in fade-in duration-300">
            <div className="text-center max-w-md mx-auto mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Payment Verification
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Confirm your order details and choose your preferred payment method.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 mb-8 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
                Order Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Customer Name</span>
                  <span className="font-bold text-slate-800">{fullName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Phone</span>
                  <span className="font-bold text-slate-800">{phoneNumber}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-slate-400 block">Address</span>
                  <span className="font-medium text-slate-700">{address}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Selected Service</span>
                  <span className="font-extrabold text-indigo-700 uppercase">
                    {selectedService.name}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Original Price</span>
                  <span className="font-medium text-slate-500 line-through">
                    ₹{selectedService.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                <span className="text-2xl font-black text-indigo-600">
                  ₹{selectedService.currentPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Payment Option
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Manual UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MANUAL_UPI')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === 'MANUAL_UPI'
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <QrCode className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-sm text-slate-900">Manual UPI Payment</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Scan QR or pay via any UPI App (GPay, PhonePe, Paytm)
                  </p>
                </button>

                {/* Option 2: Razorpay Payment Link */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-sm text-slate-900">Razorpay Link</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Pay via official Razorpay hosted checkout
                  </p>
                </button>
              </div>
            </div>

            {/* Payment Details Container */}
            {paymentMethod === 'MANUAL_UPI' ? (
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 space-y-6">
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                    Scan QR to Pay ₹{selectedService.currentPrice.toLocaleString('en-IN')}
                  </span>
                  
                  {/* QR Code Container */}
                  <div className="inline-block p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-md">
                    <img
                      src={paymentSettings.qrCodeUrl}
                      alt="UPI Payment QR Code"
                      className="w-44 h-44 object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* UPI ID with Copy Button */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-sm font-mono font-bold text-slate-800">
                      {paymentSettings.upiId || 'somirai@upi'}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <p className="font-bold mb-1">Payment Instructions:</p>
                  <p>{paymentSettings.paymentInstructions || 'Scan with GPay, PhonePe, or Paytm. Transfer the exact amount and enter the 12-digit UPI reference/UTR number below.'}</p>
                </div>

                {/* Reference / UTR input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    UPI Reference / UTR Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="Enter 12-digit UTR / Transaction ID (e.g. 482910382910)"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Found in your UPI app receipt under 'UPI Ref No' or 'UTR'.
                  </p>
                </div>

                {/* Submission notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Status Note:</strong> Submitting will mark your request as{' '}
                    <span className="font-bold underline">Payment Verification Pending</span>. Our team manually verifies the bank credit.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleFinalSubmission(
                      selectedService,
                      'MANUAL_UPI',
                      'Payment Verification Pending',
                      utrNumber.trim() || 'Pending Reference'
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                >
                  <FileCheck className="w-5 h-5" />
                  <span>Submit Payment Verification</span>
                </button>
              </div>
            ) : (
              /* RAZORPAY LOGIC REQUIRED BY PROMPT */
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>

                {/* Check if Razorpay link is empty or populated */}
                {!paymentSettings.razorpayPaymentLink || !paymentSettings.razorpayPaymentLink.trim() ? (
                  <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                    <span className="text-sm sm:text-base font-black text-slate-600 tracking-wider">
                      RAZORPAY — COMING SOON
                    </span>
                    <p className="mt-2 text-xs text-slate-500">
                      Online payment gateway link is currently being configured. Please use Manual UPI payment above for instant service.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Click below to open the official Razorpay payment page for ₹{selectedService.currentPrice.toLocaleString('en-IN')}.
                    </p>
                    <a
                      href={paymentSettings.razorpayPaymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                      <span>PAY WITH RAZORPAY</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleFinalSubmission(
                            selectedService,
                            'RAZORPAY',
                            'Razorpay Initiated',
                            'Razorpay Link Transaction'
                          );
                        }}
                        className="text-xs text-indigo-600 font-bold hover:underline"
                      >
                        I have completed the Razorpay payment → Continue to Confirmation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Service
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 4: DEDICATED THANK YOU PAGE                    */}
        {/* ---------------------------------------------------- */}
        {currentStep === 4 && submittedRecord && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs text-center animate-in fade-in duration-300">
            
            {/* Somi Rai Photo (Configurable from Admin Panel) */}
            <div className="inline-block p-1 rounded-full bg-indigo-600 border-2 border-indigo-100 shadow-md mb-5">
              <img
                src={branding.thankYouPhotoUrl}
                alt="Somi Rai"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Header Messages required by prompt */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>REQUEST RECEIVED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              THANK YOU!
            </h2>
            <p className="text-base sm:text-lg font-medium text-slate-600 max-w-md mx-auto mb-8">
              Your request has been received successfully.
            </p>

            {/* Required details card: Customer Name, Selected Service, Payment Status, Request ID */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-7 border border-slate-200 max-w-lg mx-auto text-left mb-8 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Request ID:</span>
                <span className="font-mono text-base font-black text-indigo-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {submittedRecord.id}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Customer Name:</span>
                <span className="font-bold text-slate-900">{submittedRecord.customerName}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Phone Number:</span>
                <span className="font-bold text-slate-900">{submittedRecord.phoneNumber}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Address:</span>
                <span className="font-medium text-slate-700 text-right max-w-[200px] truncate">{submittedRecord.address}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Selected Service:</span>
                <span className="font-extrabold text-indigo-700 uppercase">{submittedRecord.serviceName}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Price:</span>
                <span className="font-black text-slate-900">
                  {submittedRecord.isFree ? 'FREE' : `₹${submittedRecord.price.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Payment Status:</span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  submittedRecord.paymentStatus === 'Completed (Free)'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {submittedRecord.paymentStatus}
                </span>
              </div>
            </div>

            {/* 10. SEND FORM BUTTON (WhatsApp with Pre-filled message) */}
            <div className="max-w-lg mx-auto space-y-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="send-form-whatsapp-button"
                className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>SEND FORM</span>
              </a>

              <p className="text-xs text-slate-500">
                Clicking <strong>SEND FORM</strong> opens WhatsApp with your pre-filled details to send directly to Somi Rai (6381061760).
              </p>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  Return to Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50"
                >
                  Explore PDF Courses
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
