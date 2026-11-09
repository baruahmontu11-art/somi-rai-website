import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ActiveView,
  BrandingSettings,
  CustomerRequest,
  PaymentSettings,
  PdfCourseItem,
  RequestStatus,
  ServiceItem,
  WebsiteStatistics,
} from '../types';
import * as storage from '../services/storage';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  services: ServiceItem[];
  courses: PdfCourseItem[];
  branding: BrandingSettings;
  paymentSettings: PaymentSettings;
  statistics: WebsiteStatistics;
  requests: CustomerRequest[];
  
  // Service actions
  saveServicesList: (list: ServiceItem[]) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  toggleServiceEnabled: (id: string) => void;

  // Course actions
  saveCoursesList: (list: PdfCourseItem[]) => void;
  addCourse: (course: Omit<PdfCourseItem, 'id' | 'createdAt'>) => void;
  updateCourse: (course: PdfCourseItem) => void;
  deleteCourse: (id: string) => void;
  toggleCoursePublished: (id: string) => void;

  // Settings actions
  updateBranding: (branding: BrandingSettings) => void;
  updatePaymentSettings: (settings: PaymentSettings) => void;
  updateStatistics: (stats: WebsiteStatistics) => void;

  // Requests actions
  submitRequest: (request: CustomerRequest) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  deleteRequest: (id: string) => void;
  clearAllRequests: () => void;

  // Navigation helpers
  preselectedServiceId: string | null;
  startContactFlow: (serviceId?: string) => void;
  selectedCourseForModal: PdfCourseItem | null;
  setSelectedCourseForModal: (course: PdfCourseItem | null) => void;
  resetAllDefaults: () => void;
}

const getInitialView = (): ActiveView => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes('admin') || hash.includes('admin') || search.includes('view=admin')) {
    return 'admin';
  }
  if (path.includes('contact') || path.includes('thank-you') || hash.includes('contact') || search.includes('view=contact')) {
    return 'contact';
  }
  if (path.includes('courses') || hash.includes('courses') || search.includes('view=courses')) {
    return 'courses';
  }
  if (path.includes('social') || hash.includes('social') || search.includes('view=social')) {
    return 'social';
  }
  return 'home';
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveViewState] = useState<ActiveView>(getInitialView);
  const [services, setServices] = useState<ServiceItem[]>(() => storage.getServices());
  const [courses, setCourses] = useState<PdfCourseItem[]>(() => storage.getCourses());
  const [branding, setBranding] = useState<BrandingSettings>(() => storage.getBranding());
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => storage.getPaymentSettings());
  const [statistics, setStatistics] = useState<WebsiteStatistics>(() => storage.getStatistics());
  const [requests, setRequests] = useState<CustomerRequest[]>(() => storage.getRequests());
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<PdfCourseItem | null>(null);

  // Synchronized view setter with browser history
  const setActiveView = (view: ActiveView) => {
    setActiveViewState(view);
    try {
      if (typeof window !== 'undefined' && window.history && !window.location.pathname.includes('/admin')) {
        let newPath = '/';
        if (view === 'contact') newPath = '/contact.html';
        else if (view === 'courses') newPath = '/courses.html';
        else if (view === 'social') newPath = '/social.html';
        
        if (window.location.pathname !== newPath) {
          window.history.pushState({ view }, '', newPath);
        }
      }
    } catch {
      // Ignore security errors in restricted iframes
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveViewState(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Apply branding on mount & branding change
  useEffect(() => {
    storage.applyBrandingToDocument(branding);
  }, [branding]);

  // Service actions
  const saveServicesList = (list: ServiceItem[]) => {
    setServices(list);
    storage.saveServices(list);
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`,
    };
    const updated = [...services, newService];
    saveServicesList(updated);
  };

  const updateService = (updatedService: ServiceItem) => {
    const updated = services.map((s) => (s.id === updatedService.id ? updatedService : s));
    saveServicesList(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    saveServicesList(updated);
  };

  const toggleServiceEnabled = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    saveServicesList(updated);
  };

  // Course actions
  const saveCoursesList = (list: PdfCourseItem[]) => {
    setCourses(list);
    storage.saveCourses(list);
  };

  const addCourse = (courseData: Omit<PdfCourseItem, 'id' | 'createdAt'>) => {
    const newCourse: PdfCourseItem = {
      ...courseData,
      id: `crs-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...courses, newCourse];
    saveCoursesList(updated);
  };

  const updateCourse = (updatedCourse: PdfCourseItem) => {
    const updated = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    saveCoursesList(updated);
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    saveCoursesList(updated);
  };

  const toggleCoursePublished = (id: string) => {
    const updated = courses.map((c) => (c.id === id ? { ...c, published: !c.published } : c));
    saveCoursesList(updated);
  };

  // Settings
  const updateBranding = (newBranding: BrandingSettings) => {
    setBranding(newBranding);
    storage.saveBranding(newBranding);
  };

  const updatePaymentSettings = (newSettings: PaymentSettings) => {
    setPaymentSettings(newSettings);
    storage.savePaymentSettings(newSettings);
  };

  const updateStatistics = (newStats: WebsiteStatistics) => {
    setStatistics(newStats);
    storage.saveStatistics(newStats);
  };

  // Requests
  const submitRequest = (newRequest: CustomerRequest) => {
    storage.addRequest(newRequest);
    setRequests(storage.getRequests());
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    const updated = storage.updateRequestStatus(id, status);
    setRequests(updated);
  };

  const deleteRequest = (id: string) => {
    const updated = storage.deleteRequest(id);
    setRequests(updated);
  };

  const clearAllRequests = () => {
    storage.clearAllRequests();
    setRequests([]);
  };

  // Flow triggers
  const startContactFlow = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    } else {
      setPreselectedServiceId(null);
    }
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAllDefaults = () => {
    storage.resetAllToDefaults();
    setServices(storage.getServices());
    setCourses(storage.getCourses());
    setBranding(storage.getBranding());
    setPaymentSettings(storage.getPaymentSettings());
    setStatistics(storage.getStatistics());
    setRequests(storage.getRequests());
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        services,
        courses,
        branding,
        paymentSettings,
        statistics,
        requests,
        saveServicesList,
        addService,
        updateService,
        deleteService,
        toggleServiceEnabled,
        saveCoursesList,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleCoursePublished,
        updateBranding,
        updatePaymentSettings,
        updateStatistics,
        submitRequest,
        updateRequestStatus,
        deleteRequest,
        clearAllRequests,
        preselectedServiceId,
        startContactFlow,
        selectedCourseForModal,
        setSelectedCourseForModal,
        resetAllDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
