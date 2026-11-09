import {
  DEFAULT_BRANDING,
  DEFAULT_COURSES,
  DEFAULT_PAYMENT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_STATISTICS,
  SAMPLE_REQUESTS,
} from '../data/defaultData';
import {
  BrandingSettings,
  CustomerRequest,
  PaymentSettings,
  PdfCourseItem,
  RequestStatus,
  ServiceItem,
  WebsiteStatistics,
} from '../types';

const STORAGE_KEYS = {
  SERVICES: 'somirai_services_v1',
  COURSES: 'somirai_courses_v1',
  BRANDING: 'somirai_branding_v1',
  PAYMENTS: 'somirai_payments_v1',
  STATISTICS: 'somirai_statistics_v1',
  REQUESTS: 'somirai_requests_v1',
};

// Generic safe JSON getter
function getJson<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to parse localStorage key ${key}:`, err);
    return defaultValue;
  }
}

// Generic safe JSON setter
function setJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write localStorage key ${key}:`, err);
  }
}

// Services storage
export function getServices(): ServiceItem[] {
  return getJson<ServiceItem[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
}

export function saveServices(services: ServiceItem[]): void {
  setJson(STORAGE_KEYS.SERVICES, services);
}

// Courses storage
export function getCourses(): PdfCourseItem[] {
  return getJson<PdfCourseItem[]>(STORAGE_KEYS.COURSES, DEFAULT_COURSES);
}

export function saveCourses(courses: PdfCourseItem[]): void {
  setJson(STORAGE_KEYS.COURSES, courses);
}

// Branding storage
export function getBranding(): BrandingSettings {
  return getJson<BrandingSettings>(STORAGE_KEYS.BRANDING, DEFAULT_BRANDING);
}

export function saveBranding(branding: BrandingSettings): void {
  setJson(STORAGE_KEYS.BRANDING, branding);
  applyBrandingToDocument(branding);
}

export function applyBrandingToDocument(branding: BrandingSettings): void {
  try {
    if (branding.siteTitle) {
      document.title = `${branding.siteTitle} — Professional Account Support & Digital Services`;
    }
    if (branding.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  } catch (e) {
    // Ignore DOM update errors
  }
}

// Payment Settings storage
export function getPaymentSettings(): PaymentSettings {
  return getJson<PaymentSettings>(STORAGE_KEYS.PAYMENTS, DEFAULT_PAYMENT_SETTINGS);
}

export function savePaymentSettings(settings: PaymentSettings): void {
  setJson(STORAGE_KEYS.PAYMENTS, settings);
}

// Statistics storage
export function getStatistics(): WebsiteStatistics {
  return getJson<WebsiteStatistics>(STORAGE_KEYS.STATISTICS, DEFAULT_STATISTICS);
}

export function saveStatistics(stats: WebsiteStatistics): void {
  setJson(STORAGE_KEYS.STATISTICS, stats);
}

// Requests storage
export function getRequests(): CustomerRequest[] {
  return getJson<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, SAMPLE_REQUESTS);
}

export function addRequest(request: CustomerRequest): void {
  const existing = getRequests();
  const updated = [request, ...existing];
  setJson(STORAGE_KEYS.REQUESTS, updated);
}

export function updateRequestStatus(id: string, status: RequestStatus): CustomerRequest[] {
  const existing = getRequests();
  const updated = existing.map((req) => (req.id === id ? { ...req, status } : req));
  setJson(STORAGE_KEYS.REQUESTS, updated);
  return updated;
}

export function deleteRequest(id: string): CustomerRequest[] {
  const existing = getRequests();
  const updated = existing.filter((req) => req.id !== id);
  setJson(STORAGE_KEYS.REQUESTS, updated);
  return updated;
}

export function clearAllRequests(): void {
  setJson(STORAGE_KEYS.REQUESTS, []);
}

// Utility: Generate Unique Request ID (e.g. SR-4892)
export function generateRequestId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SR-${randomNum}`;
}

// Utility: File to Data URL helper (for images & PDF uploads from phone/desktop)
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file size warning for localStorage (recommend < 4MB)
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

// Reset everything to defaults
export function resetAllToDefaults(): void {
  saveServices(DEFAULT_SERVICES);
  saveCourses(DEFAULT_COURSES);
  saveBranding(DEFAULT_BRANDING);
  savePaymentSettings(DEFAULT_PAYMENT_SETTINGS);
  saveStatistics(DEFAULT_STATISTICS);
  setJson(STORAGE_KEYS.REQUESTS, SAMPLE_REQUESTS);
}
