export interface ServiceItem {
  id: string;
  name: string;
  originalPrice: number;
  currentPrice: number;
  isFree: boolean;
  enabled: boolean;
  description?: string;
  category?: string;
}

export interface PdfCourseItem {
  id: string;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  thumbnailUrl: string;
  pdfFileName?: string;
  pdfDataUrl?: string;
  published: boolean;
  createdAt: string;
}

export interface BrandingSettings {
  siteTitle: string;
  logoUrl: string;
  faviconUrl: string;
  thankYouPhotoUrl: string;
}

export interface PaymentSettings {
  manualUpiEnabled: boolean;
  upiId: string;
  qrCodeUrl: string;
  paymentInstructions: string;
  razorpayEnabled: boolean;
  razorpayPaymentLink: string;
}

export interface WebsiteStatistics {
  totalVisitors: number;
  problemsSolved: number;
  pdfCoursesCount: number;
}

export type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface CustomerRequest {
  id: string; // e.g. "SR-9428"
  customerName: string;
  phoneNumber: string;
  address: string;
  serviceId: string;
  serviceName: string;
  price: number;
  isFree: boolean;
  paymentMethod: 'FREE' | 'MANUAL_UPI' | 'RAZORPAY';
  paymentStatus: 'Payment Verification Pending' | 'Completed (Free)' | 'Razorpay Initiated' | 'Confirmed';
  paymentProofReference?: string;
  paymentProofImage?: string;
  createdAt: string;
  status: RequestStatus;
  notes?: string;
}

export type ActiveView = 'home' | 'contact' | 'courses' | 'admin' | 'social';
