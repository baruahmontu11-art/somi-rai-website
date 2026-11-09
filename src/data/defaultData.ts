import { BrandingSettings, CustomerRequest, PaymentSettings, PdfCourseItem, ServiceItem, WebsiteStatistics } from '../types';

// Default circular logo SVG Data URL
export const DEFAULT_LOGO_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234f46e5;stop-opacity:1" /><stop offset="100%" style="stop-color:%237c3aed;stop-opacity:1" /></linearGradient></defs><circle cx="60" cy="60" r="58" fill="url(%23grad1)" stroke="%23ffffff" stroke-width="3"/><text x="50%" y="54%" text-anchor="middle" fill="%23ffffff" font-size="40" font-family="system-ui,-apple-system,sans-serif" font-weight="800" dy=".3em">SR</text></svg>`;

// Default Somi Rai photo SVG Data URL
export const DEFAULT_SOMIRAI_PHOTO_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><defs><linearGradient id="photoBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%233b82f6;stop-opacity:1" /><stop offset="100%" style="stop-color:%236366f1;stop-opacity:1" /></linearGradient></defs><rect width="200" height="200" rx="28" fill="url(%23photoBg)"/><circle cx="100" cy="72" r="38" fill="%23ffffff" opacity="0.95"/><path d="M42 165 C42 125, 158 125, 158 165 Z" fill="%23ffffff" opacity="0.95"/><text x="100" y="80" text-anchor="middle" fill="%234338ca" font-size="28" font-family="system-ui,sans-serif" font-weight="bold">SR</text><rect x="55" y="172" width="90" height="18" rx="9" fill="%23ffffff" opacity="0.8"/><text x="100" y="184" text-anchor="middle" fill="%231e1b4b" font-size="10" font-family="system-ui,sans-serif" font-weight="700">SOMI RAI</text></svg>`;

// Default sample QR Code SVG
export const DEFAULT_QR_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="%23ffffff"/><rect x="15" y="15" width="55" height="55" fill="%230f172a"/><rect x="25" y="25" width="35" height="35" fill="%23ffffff"/><rect x="33" y="33" width="19" height="19" fill="%234338ca"/><rect x="130" y="15" width="55" height="55" fill="%230f172a"/><rect x="140" y="25" width="35" height="35" fill="%23ffffff"/><rect x="148" y="33" width="19" height="19" fill="%234338ca"/><rect x="15" y="130" width="55" height="55" fill="%230f172a"/><rect x="25" y="140" width="35" height="35" fill="%23ffffff"/><rect x="33" y="148" width="19" height="19" fill="%234338ca"/><rect x="85" y="20" width="15" height="45" fill="%230f172a"/><rect x="105" y="25" width="15" height="20" fill="%230f172a"/><rect x="80" y="80" width="40" height="40" rx="8" fill="%234338ca"/><text x="100" y="105" text-anchor="middle" fill="%23ffffff" font-size="14" font-weight="bold" font-family="system-ui">UPI</text><rect x="25" y="85" width="40" height="15" fill="%230f172a"/><rect x="30" y="105" width="25" height="15" fill="%230f172a"/><rect x="135" y="85" width="25" height="20" fill="%230f172a"/><rect x="150" y="115" width="35" height="15" fill="%230f172a"/><rect x="85" y="135" width="25" height="30" fill="%230f172a"/><rect x="120" y="145" width="30" height="35" fill="%230f172a"/><rect x="160" y="140" width="25" height="25" fill="%230f172a"/></svg>`;

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'SOURCE TRANSFER',
    originalPrice: 5499,
    currentPrice: 3500,
    isFree: false,
    enabled: true,
    description: 'Safe and verified digital source and ownership transfer assistance with guaranteed compliance.',
  },
  {
    id: 'srv-2',
    name: 'CREATE NEW PAYOUT',
    originalPrice: 2499,
    currentPrice: 0,
    isFree: true,
    enabled: true,
    description: 'Setup and configure new seamless payout methods for your online platforms with zero setup fee.',
  },
  {
    id: 'srv-3',
    name: 'DISABLE ACCOUNT RECOVERY',
    originalPrice: 55000,
    currentPrice: 25000,
    isFree: false,
    enabled: true,
    description: 'High-priority comprehensive recovery and appeals for permanently or temporarily disabled accounts.',
  },
  {
    id: 'srv-4',
    name: 'HACKED ACCOUNT RECOVERY',
    originalPrice: 5900,
    currentPrice: 3999,
    isFree: false,
    enabled: true,
    description: 'Emergency security audit and recovery protocol for compromised or hijacked digital accounts.',
  },
  {
    id: 'srv-5',
    name: 'SERVICE & ROYELITY SERVICE ADD',
    originalPrice: 1499,
    currentPrice: 0,
    isFree: true,
    enabled: true,
    description: 'Link and authenticate your royalty services, distribution accounts, and content monetisation.',
  },
];

export const DEFAULT_COURSES: PdfCourseItem[] = [
  {
    id: 'crs-1',
    title: 'Complete Account Security & Recovery Blueprint',
    description: 'Step-by-step master guide on preventing account locks, resolving policy violations, and restoring access.',
    price: 499,
    isFree: false,
    thumbnailUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200"><defs><linearGradient id="c1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e1b4b;stop-opacity:1" /><stop offset="100%" style="stop-color:%234338ca;stop-opacity:1" /></linearGradient></defs><rect width="320" height="200" fill="url(%23c1)"/><circle cx="160" cy="80" r="35" fill="%23ffffff" opacity="0.15"/><path d="M160 55 L180 95 L140 95 Z" fill="%2360a5fa"/><text x="160" y="140" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="system-ui" font-weight="700">Account Security Guide</text><text x="160" y="165" text-anchor="middle" fill="%2393c5fd" font-size="12" font-family="system-ui">Master Edition • Somi Rai</text></svg>`,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'crs-2',
    title: 'Digital Payouts & Monetization Handbook',
    description: 'Comprehensive walkthrough for international banking details, tax forms, and fast payout verifications.',
    price: 0,
    isFree: true,
    thumbnailUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200"><defs><linearGradient id="c2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23064e3b;stop-opacity:1" /><stop offset="100%" style="stop-color:%23059669;stop-opacity:1" /></linearGradient></defs><rect width="320" height="200" fill="url(%23c2)"/><circle cx="160" cy="80" r="35" fill="%23ffffff" opacity="0.15"/><circle cx="160" cy="80" r="22" fill="%2334d399"/><text x="160" y="86" text-anchor="middle" fill="%23064e3b" font-size="18" font-family="system-ui" font-weight="900">₹</text><text x="160" y="140" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="system-ui" font-weight="700">Payouts Handbook</text><text x="160" y="165" text-anchor="middle" fill="%23a7f3d0" font-size="12" font-family="system-ui">Free Community Edition</text></svg>`,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'crs-3',
    title: 'Digital Copyright & Royalty Rights Management',
    description: 'Protect your original digital assets, claim royalty earnings, and resolve copyright disputes efficiently.',
    price: 799,
    isFree: false,
    thumbnailUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200"><defs><linearGradient id="c3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23581c87;stop-opacity:1" /><stop offset="100%" style="stop-color:%239333ea;stop-opacity:1" /></linearGradient></defs><rect width="320" height="200" fill="url(%23c3)"/><circle cx="160" cy="80" r="35" fill="%23ffffff" opacity="0.15"/><text x="160" y="89" text-anchor="middle" fill="%23f3e8ff" font-size="28" font-family="system-ui" font-weight="bold">©</text><text x="160" y="140" text-anchor="middle" fill="%23ffffff" font-size="16" font-family="system-ui" font-weight="700">Royalty Rights Masterclass</text><text x="160" y="165" text-anchor="middle" fill="%23e9d5ff" font-size="12" font-family="system-ui">Legal & Technical Playbook</text></svg>`,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_BRANDING: BrandingSettings = {
  siteTitle: 'Somi Rai',
  logoUrl: DEFAULT_LOGO_URL,
  faviconUrl: DEFAULT_LOGO_URL,
  thankYouPhotoUrl: DEFAULT_SOMIRAI_PHOTO_URL,
};

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  manualUpiEnabled: true,
  upiId: '6381061760@paytm',
  qrCodeUrl: DEFAULT_QR_URL,
  paymentInstructions: 'Scan the QR code or send payment to the UPI ID. Once transferred, enter your UPI reference/UTR number below and click Submit to confirm.',
  razorpayEnabled: false,
  razorpayPaymentLink: '', // Empty by default -> will show "RAZORPAY — COMING SOON"
};

export const DEFAULT_STATISTICS: WebsiteStatistics = {
  totalVisitors: 15420,
  problemsSolved: 3850,
  pdfCoursesCount: 3,
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@williamskiratrai5507?si=hj3q8rb_fXii67oO',
  facebook: 'https://www.facebook.com/share/1EycMcEV3f/',
  whatsappNumber: '6381061760',
};

export const SAMPLE_REQUESTS: CustomerRequest[] = [
  {
    id: 'SR-8492',
    customerName: 'Rahul Sharma',
    phoneNumber: '9876543210',
    address: 'Sector 14, Gurugram, Haryana',
    serviceId: 'srv-1',
    serviceName: 'SOURCE TRANSFER',
    price: 3500,
    isFree: false,
    paymentMethod: 'MANUAL_UPI',
    paymentStatus: 'Payment Verification Pending',
    paymentProofReference: 'UTR-948271038291',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'Pending',
    notes: 'Requires transfer assistance for YouTube channel owner rights.',
  },
  {
    id: 'SR-7219',
    customerName: 'Priya Patel',
    phoneNumber: '9823456781',
    address: 'Navrangpura, Ahmedabad, Gujarat',
    serviceId: 'srv-2',
    serviceName: 'CREATE NEW PAYOUT',
    price: 0,
    isFree: true,
    paymentMethod: 'FREE',
    paymentStatus: 'Completed (Free)',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    status: 'In Progress',
    notes: 'Configuring direct wire payout.',
  },
];
