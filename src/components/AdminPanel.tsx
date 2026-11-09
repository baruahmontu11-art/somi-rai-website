import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Image as ImageIcon,
  CreditCard,
  BarChart3,
  ClipboardList,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Upload,
  AlertTriangle,
  RotateCcw,
  Save,
  Check,
  Search,
  ExternalLink,
  Phone,
  FileText,
  Eye,
} from 'lucide-react';
import { CustomerRequest, PdfCourseItem, RequestStatus, ServiceItem } from '../types';
import { fileToDataUrl } from '../services/storage';

type AdminTab = 'dashboard' | 'services' | 'courses' | 'branding' | 'payments' | 'statistics' | 'requests';

export const AdminPanel: React.FC = () => {
  const {
    services,
    courses,
    branding,
    paymentSettings,
    statistics,
    requests,
    addService,
    updateService,
    deleteService,
    toggleServiceEnabled,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleCoursePublished,
    updateBranding,
    updatePaymentSettings,
    updateStatistics,
    updateRequestStatus,
    deleteRequest,
    clearAllRequests,
    resetAllDefaults,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Service Edit / Create Modal State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewServiceModal, setIsNewServiceModal] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    originalPrice: 0,
    currentPrice: 0,
    isFree: false,
    enabled: true,
    description: '',
  });

  // Course Edit / Create Modal State
  const [editingCourse, setEditingCourse] = useState<PdfCourseItem | null>(null);
  const [isNewCourseModal, setIsNewCourseModal] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    price: 0,
    isFree: false,
    thumbnailUrl: '',
    pdfFileName: '',
    pdfDataUrl: '',
    published: true,
  });

  // Branding Form State
  const [brandingForm, setBrandingForm] = useState(branding);

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState(paymentSettings);

  // Statistics Form State
  const [statsForm, setStatsForm] = useState(statistics);

  // Requests Filter & Search
  const [requestSearch, setRequestSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const showToast = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  // Image Upload Helper for Branding, QR, and Course Thumbnail
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string, fileName?: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      onSuccess(dataUrl, file.name);
      showToast(`Selected file "${file.name}" loaded locally!`);
    } catch (err) {
      alert('Failed to read file from your device.');
    }
  };

  // Service modal handlers
  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceFormData({
      name: '',
      originalPrice: 0,
      currentPrice: 0,
      isFree: false,
      enabled: true,
      description: '',
    });
    setIsNewServiceModal(true);
  };

  const openEditServiceModal = (s: ServiceItem) => {
    setEditingService(s);
    setServiceFormData({
      name: s.name,
      originalPrice: s.originalPrice,
      currentPrice: s.currentPrice,
      isFree: s.isFree,
      enabled: s.enabled,
      description: s.description || '',
    });
    setIsNewServiceModal(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.name.trim()) {
      alert('Please enter service name.');
      return;
    }

    if (editingService) {
      updateService({
        ...editingService,
        ...serviceFormData,
        currentPrice: serviceFormData.isFree ? 0 : Number(serviceFormData.currentPrice),
        originalPrice: Number(serviceFormData.originalPrice),
      });
      showToast(`Service "${serviceFormData.name}" updated successfully.`);
    } else {
      addService({
        ...serviceFormData,
        currentPrice: serviceFormData.isFree ? 0 : Number(serviceFormData.currentPrice),
        originalPrice: Number(serviceFormData.originalPrice),
      });
      showToast(`Service "${serviceFormData.name}" created successfully.`);
    }
    setIsNewServiceModal(false);
  };

  // Course modal handlers
  const openNewCourseModal = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      description: '',
      price: 0,
      isFree: false,
      thumbnailUrl: '',
      pdfFileName: '',
      pdfDataUrl: '',
      published: true,
    });
    setIsNewCourseModal(true);
  };

  const openEditCourseModal = (c: PdfCourseItem) => {
    setEditingCourse(c);
    setCourseFormData({
      title: c.title,
      description: c.description,
      price: c.price,
      isFree: c.isFree,
      thumbnailUrl: c.thumbnailUrl,
      pdfFileName: c.pdfFileName || '',
      pdfDataUrl: c.pdfDataUrl || '',
      published: c.published,
    });
    setIsNewCourseModal(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title.trim()) {
      alert('Please enter course title.');
      return;
    }

    const fallbackThumbnail = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200"><rect width="320" height="200" fill="%234338ca"/><text x="160" y="105" text-anchor="middle" fill="%23ffffff" font-size="18" font-family="system-ui" font-weight="bold">${encodeURIComponent(courseFormData.title.slice(0, 20))}</text></svg>`;

    const thumbnail = courseFormData.thumbnailUrl || fallbackThumbnail;

    if (editingCourse) {
      updateCourse({
        ...editingCourse,
        ...courseFormData,
        thumbnailUrl: thumbnail,
        price: courseFormData.isFree ? 0 : Number(courseFormData.price),
      });
      showToast(`Course "${courseFormData.title}" updated.`);
    } else {
      addCourse({
        ...courseFormData,
        thumbnailUrl: thumbnail,
        price: courseFormData.isFree ? 0 : Number(courseFormData.price),
      });
      showToast(`Course "${courseFormData.title}" added.`);
    }
    setIsNewCourseModal(false);
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.phoneNumber.includes(requestSearch) ||
      r.id.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.serviceName.toLowerCase().includes(requestSearch.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Notice Banner about Frontend / Local Storage */}
        <div className="mb-6 bg-slate-100 border border-slate-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Frontend Configuration (Local Storage): </span>
              <span>Settings and edits are saved in your current browser's local storage. This frontend-only panel operates without cloud databases or authentication. Changes apply to this browser/device.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset all website settings, services, and statistics back to default preloaded values?')) {
                  resetAllDefaults();
                  setBrandingForm(branding);
                  setPaymentForm(paymentSettings);
                  setStatsForm(statistics);
                  showToast('Restored all defaults.');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <a
              href="/"
              onClick={(e) => {
                if (!window.location.pathname.includes('/admin')) {
                  e.preventDefault();
                  setActiveView('home');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              View Live Website
            </a>
          </div>
        </div>

        {/* Toast Notification */}
        {saveMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-3 text-sm">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Admin Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                Direct Content Management
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Somi Rai — Admin Panel
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage services, PDF courses, branding, payment configurations, stats, and incoming customer requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  if (!window.location.pathname.includes('/admin')) {
                    e.preventDefault();
                    setActiveView('home');
                  }
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-all cursor-pointer"
              >
                <span>Back to Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2 border-t border-slate-100 pt-6">
            {[
              { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
              { id: 'services', label: 'SERVICES', icon: Layers },
              { id: 'courses', label: 'PDF COURSES', icon: BookOpen },
              { id: 'branding', label: 'BRANDING', icon: ImageIcon },
              { id: 'payments', label: 'PAYMENT SETTINGS', icon: CreditCard },
              { id: 'statistics', label: 'STATISTICS', icon: BarChart3 },
              { id: 'requests', label: 'REQUESTS', icon: ClipboardList, count: requests.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: DASHBOARD                                     */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Visitors
                </span>
                <div className="text-3xl font-black text-slate-900">
                  {statistics.totalVisitors.toLocaleString('en-IN')}+
                </div>
                <p className="mt-2 text-xs text-slate-500">Configured in Statistics tab</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Problems Solved
                </span>
                <div className="text-3xl font-black text-indigo-600">
                  {statistics.problemsSolved.toLocaleString('en-IN')}+
                </div>
                <p className="mt-2 text-xs text-slate-500">Accounts recovered & assisted</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  PDF Courses
                </span>
                <div className="text-3xl font-black text-purple-600">
                  {courses.length}
                </div>
                <p className="mt-2 text-xs text-slate-500">{courses.filter((c) => c.published).length} Published Guides</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Requests
                </span>
                <div className="text-3xl font-black text-emerald-600">
                  {requests.length}
                </div>
                <p className="mt-2 text-xs text-slate-500">{requests.filter((r) => r.status === 'Pending').length} Pending Review</p>
              </div>
            </div>

            {/* Quick Actions & Recent Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-slate-900 text-lg">Recent Customer Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    View All ({requests.length}) →
                  </button>
                </div>

                {requests.length === 0 ? (
                  <p className="text-sm text-slate-400 py-6 text-center">No customer requests logged yet.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {requests.slice(0, 4).map((req) => (
                      <div key={req.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{req.customerName}</span>
                            <span className="text-xs font-mono text-slate-400">({req.id})</span>
                          </div>
                          <p className="text-xs text-slate-500">{req.serviceName} • {req.isFree ? 'FREE' : `₹${req.price}`}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          req.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick shortcuts */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Admin Shortcuts</h3>
                <button
                  onClick={openNewServiceModal}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-xs text-slate-800 transition-colors"
                >
                  <span>+ Add New Service</span>
                  <Plus className="w-4 h-4 text-indigo-600" />
                </button>
                <button
                  onClick={openNewCourseModal}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-xs text-slate-800 transition-colors"
                >
                  <span>+ Add PDF Course</span>
                  <Plus className="w-4 h-4 text-indigo-600" />
                </button>
                <button
                  onClick={() => setActiveTab('branding')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-xs text-slate-800 transition-colors"
                >
                  <span>Update Logo & Photos</span>
                  <Upload className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-xs text-slate-800 transition-colors"
                >
                  <span>Configure UPI / Razorpay</span>
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: SERVICES                                      */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manage Services</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Preloaded services can be modified, disabled, or new custom services can be added.
                </p>
              </div>
              <button
                onClick={openNewServiceModal}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services List Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Service Name</th>
                      <th className="py-4 px-6">Original Price</th>
                      <th className="py-4 px-6">Current Price</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {services.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-extrabold text-slate-900">
                          {s.name}
                          {s.description && (
                            <span className="block text-xs font-normal text-slate-500 line-clamp-1">
                              {s.description}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-500 line-through">
                          ₹{s.originalPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-900">
                          {s.isFree ? <span className="text-emerald-600">FREE</span> : `₹${s.currentPrice.toLocaleString('en-IN')}`}
                        </td>
                        <td className="py-4 px-6">
                          {s.isFree ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                              FREE
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                              Paid
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => toggleServiceEnabled(s.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              s.enabled
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {s.enabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openEditServiceModal(s)}
                            className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${s.name}"?`)) {
                                deleteService(s.id);
                                showToast(`Deleted service ${s.name}`);
                              }
                            }}
                            className="p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: PDF COURSES                                   */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900">PDF Courses Management</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Add downloadable guides, set prices, and select thumbnails directly from your device gallery.
                </p>
              </div>
              <button
                onClick={openNewCourseModal}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-4 relative">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          course.published ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'
                        }`}>
                          {course.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1 line-clamp-2">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Price: {course.isFree ? 'FREE' : `₹${course.price}`}</span>
                      {course.pdfFileName && (
                        <span className="text-indigo-600 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF Attached</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleCoursePublished(course.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                        course.published ? 'bg-slate-100 text-slate-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {course.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <div className="space-x-1">
                      <button
                        onClick={() => openEditCourseModal(course)}
                        className="p-1.5 text-slate-600 hover:text-indigo-600"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete course "${course.title}"?`)) {
                            deleteCourse(course.id);
                            showToast(`Deleted course ${course.title}`);
                          }
                        }}
                        className="p-1.5 text-slate-600 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: BRANDING                                      */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'branding' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs max-w-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Branding & Media Configuration</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Update your circular logo, favicon, thank you page photo, and site title directly from your phone gallery or computer.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBranding(brandingForm);
                showToast('Branding settings saved successfully!');
              }}
              className="space-y-8"
            >
              {/* Site Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Website Name / Title
                </label>
                <input
                  type="text"
                  value={brandingForm.siteTitle}
                  onChange={(e) => setBrandingForm({ ...brandingForm, siteTitle: e.target.value })}
                  placeholder="Somi Rai"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Logo Selection */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Header Circular Logo
                </label>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shrink-0">
                    <img
                      src={brandingForm.logoUrl}
                      alt="Logo preview"
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-indigo-600" />
                      <span>Select Logo from Phone Gallery / File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setBrandingForm({ ...brandingForm, logoUrl: url }))
                        }
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Square/circular PNG, JPG, or SVG recommended.
                    </p>
                  </div>
                </div>
              </div>

              {/* Favicon Selection */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Browser Favicon
                </label>
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 p-0.5 bg-white shrink-0">
                    <img
                      src={brandingForm.faviconUrl}
                      alt="Favicon preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-indigo-600" />
                      <span>Upload Favicon</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setBrandingForm({ ...brandingForm, faviconUrl: url }))
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Thank You Page Photo */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Somi Rai Photo (Thank You Page)
                </label>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shrink-0">
                    <img
                      src={brandingForm.thankYouPhotoUrl}
                      alt="Thank you photo"
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-indigo-600" />
                      <span>Select Somi Rai Photo from Gallery</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setBrandingForm({ ...brandingForm, thankYouPhotoUrl: url }))
                        }
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Displayed on the post-submission Thank You screen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Branding Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: PAYMENT SETTINGS                              */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs max-w-3xl space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Payment Gateways & UPI Configuration</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Configure your Manual UPI parameters and hosted Razorpay link.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePaymentSettings(paymentForm);
                showToast('Payment settings saved successfully!');
              }}
              className="space-y-8"
            >
              {/* MANUAL UPI SETTINGS */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>Manual UPI Payment</span>
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.manualUpiEnabled}
                      onChange={(e) => setPaymentForm({ ...paymentForm, manualUpiEnabled: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span>Enable Manual UPI</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={paymentForm.upiId}
                    onChange={(e) => setPaymentForm({ ...paymentForm, upiId: e.target.value })}
                    placeholder="e.g. 6381061760@paytm or somirai@upi"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* QR Code Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    QR Code Image
                  </label>
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-300 bg-white p-2 shadow-xs shrink-0 flex items-center justify-center">
                      <img
                        src={paymentForm.qrCodeUrl}
                        alt="QR Code Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-indigo-600" />
                        <span>Select QR Image from Phone Gallery</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => setPaymentForm({ ...paymentForm, qrCodeUrl: url }))
                          }
                        />
                      </label>
                      <p className="text-[11px] text-slate-400">
                        Select a clear screenshot of your Google Pay, PhonePe, or Paytm QR.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Payment Instructions for Customer
                  </label>
                  <textarea
                    rows={2}
                    value={paymentForm.paymentInstructions}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentInstructions: e.target.value })}
                    placeholder="Scan QR code, enter UTR reference, and wait for confirmation."
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* RAZORPAY PAYMENT LINK SETTINGS */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span>Razorpay Hosted Payment Link</span>
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.razorpayEnabled}
                      onChange={(e) => setPaymentForm({ ...paymentForm, razorpayEnabled: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span>Enable Razorpay Option</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Razorpay Payment Link (URL)
                  </label>
                  <input
                    type="url"
                    value={paymentForm.razorpayPaymentLink}
                    onChange={(e) => setPaymentForm({ ...paymentForm, razorpayPaymentLink: e.target.value })}
                    placeholder="https://rzp.io/l/your-link (Leave empty for COMING SOON)"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="mt-2 text-xs text-slate-500">
                    <strong>Logic:</strong> If this field is empty, the customer payment page displays{' '}
                    <span className="font-bold text-slate-700">RAZORPAY — COMING SOON</span>. If a valid URL is provided, it displays the{' '}
                    <span className="font-bold text-blue-600">PAY WITH RAZORPAY</span> button.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Payment Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: STATISTICS                                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'statistics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs max-w-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Website Statistics</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Manually set the figures displayed in the homepage impact counter.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateStatistics({
                  totalVisitors: Number(statsForm.totalVisitors) || 0,
                  problemsSolved: Number(statsForm.problemsSolved) || 0,
                  pdfCoursesCount: Number(statsForm.pdfCoursesCount) || 0,
                });
                showToast('Website statistics updated!');
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Total Visitors
                </label>
                <input
                  type="number"
                  value={statsForm.totalVisitors}
                  onChange={(e) => setStatsForm({ ...statsForm, totalVisitors: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Problems Solved
                </label>
                <input
                  type="number"
                  value={statsForm.problemsSolved}
                  onChange={(e) => setStatsForm({ ...statsForm, problemsSolved: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  PDF Courses Count
                </label>
                <input
                  type="number"
                  value={statsForm.pdfCoursesCount}
                  onChange={(e) => setStatsForm({ ...statsForm, pdfCoursesCount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Statistics</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 7: REQUESTS                                      */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Customer Requests & Inquiries</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Stored securely in your local browser storage. Update progress or contact via WhatsApp.
                </p>
              </div>

              {requests.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all locally stored requests?')) {
                      clearAllRequests();
                      showToast('All local requests cleared.');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Requests</span>
                </button>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  placeholder="Search by customer name, phone, ID, or service..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Requests List */}
            {filteredRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">No requests found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Requests submitted through the "Contact With Somi" form will automatically show here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-4 px-6">ID & Date</th>
                        <th className="py-4 px-6">Customer</th>
                        <th className="py-4 px-6">Service & Price</th>
                        <th className="py-4 px-6">Payment Status</th>
                        <th className="py-4 px-6">Request Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-mono font-black text-indigo-600 block">
                              {req.id}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(req.createdAt).toLocaleDateString()} {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-slate-900 block">{req.customerName}</span>
                            <span className="text-xs text-slate-500 block">{req.phoneNumber}</span>
                            <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{req.address}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-extrabold text-slate-900 block uppercase text-xs">
                              {req.serviceName}
                            </span>
                            <span className="font-bold text-indigo-600 text-xs">
                              {req.isFree ? 'FREE' : `₹${req.price.toLocaleString('en-IN')}`}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                              req.paymentStatus.includes('Completed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {req.paymentStatus}
                            </span>
                            {req.paymentProofReference && (
                              <span className="block text-[11px] font-mono text-slate-500 mt-1">
                                Ref: {req.paymentProofReference}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={req.status}
                              onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                req.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                req.status === 'In Progress' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                req.status === 'Cancelled' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <a
                              href={`https://wa.me/91${req.phoneNumber}?text=${encodeURIComponent(`Hello ${req.customerName}, this is Somi Rai regarding your request (${req.id}) for ${req.serviceName}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => {
                                if (confirm(`Delete request ${req.id}?`)) {
                                  deleteRequest(req.id);
                                  showToast(`Request ${req.id} removed.`);
                                }
                              }}
                              className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODAL: ADD / EDIT SERVICE                            */}
        {/* ---------------------------------------------------- */}
        {isNewServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <form onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.name}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                    placeholder="e.g. ACCOUNT RECOVERY VIP"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      value={serviceFormData.originalPrice}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, originalPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current Price (₹)
                    </label>
                    <input
                      type="number"
                      disabled={serviceFormData.isFree}
                      value={serviceFormData.isFree ? 0 : serviceFormData.currentPrice}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, currentPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold disabled:bg-slate-200"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={serviceFormData.isFree}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, isFree: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>Mark as FREE Service</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={serviceFormData.enabled}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, enabled: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span>Enable Service</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    placeholder="Describe what is included in this service..."
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewServiceModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODAL: ADD / EDIT COURSE                             */}
        {/* ---------------------------------------------------- */}
        {isNewCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {editingCourse ? 'Edit Course' : 'Add New PDF Course'}
              </h3>
              <form onSubmit={handleSaveCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Course Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseFormData.title}
                    onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                    placeholder="e.g. Master Account Recovery Blueprint"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={courseFormData.description}
                    onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                    placeholder="Summary of course contents..."
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      disabled={courseFormData.isFree}
                      value={courseFormData.isFree ? 0 : courseFormData.price}
                      onChange={(e) => setCourseFormData({ ...courseFormData, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold disabled:bg-slate-200"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={courseFormData.isFree}
                        onChange={(e) => setCourseFormData({ ...courseFormData, isFree: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span>Mark as Free Course</span>
                    </label>
                  </div>
                </div>

                {/* Thumbnail upload from gallery */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Course Thumbnail (From Phone Gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {courseFormData.thumbnailUrl && (
                      <img
                        src={courseFormData.thumbnailUrl}
                        alt="Thumbnail"
                        className="w-16 h-10 object-cover rounded-lg border"
                      />
                    )}
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Select Thumbnail Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setCourseFormData({ ...courseFormData, thumbnailUrl: url }))
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* PDF File picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    PDF Document File
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Select PDF File from Device</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url, name) =>
                          setCourseFormData({ ...courseFormData, pdfDataUrl: url, pdfFileName: name || 'course.pdf' })
                        )
                      }
                    />
                  </label>
                  {courseFormData.pdfFileName && (
                    <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Loaded: {courseFormData.pdfFileName}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={courseFormData.published}
                      onChange={(e) => setCourseFormData({ ...courseFormData, published: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span>Publish Course (Visible to Visitors)</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewCourseModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors"
                  >
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
