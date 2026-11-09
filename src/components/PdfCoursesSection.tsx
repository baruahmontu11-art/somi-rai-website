import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Send,
  Sparkles,
  CheckCircle,
  X,
} from 'lucide-react';
import { PdfCourseItem } from '../types';

export const PdfCoursesSection: React.FC = () => {
  const { courses, setActiveView, startContactFlow } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<PdfCourseItem | null>(null);

  // Filter only published courses
  const publishedCourses = courses.filter((c) => c.published);

  const handleBuyOrView = (course: PdfCourseItem) => {
    setSelectedCourse(course);
  };

  const getWhatsAppCourseUrl = (course: PdfCourseItem) => {
    const text = `Hello Somi Rai,\n\nI want to purchase/enroll in the PDF Course:\n*${course.title}*\nPrice: ${course.isFree ? 'FREE' : `₹${course.price}`}\n\nPlease share the download link and details.\n\nThank you!`;
    return `https://wa.me/916381061760?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
            Educational Resources
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            PDF Master Courses & Guides
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Step-by-step verified blueprints authored by Somi Rai for account security, digital payouts, and copyright protection.
          </p>
        </div>

        {/* Course Cards Grid */}
        {publishedCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200 shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Courses Published Yet</h3>
            <p className="text-sm text-slate-500 mt-1">
              Courses can be added and published from the Admin Panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publishedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Course Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3">
                      {course.isFree || course.price === 0 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs uppercase">
                          FREE
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {course.pdfFileName && (
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>PDF Included</span>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Access
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {course.isFree || course.price === 0 ? 'FREE' : `₹${course.price.toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBuyOrView(course)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{course.isFree ? 'View Guide' : 'Buy / View'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for viewing course details & download/buy */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
              
              {/* Modal header */}
              <div className="relative aspect-video w-full bg-slate-900">
                <img
                  src={selectedCourse.thumbnailUrl}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                    Somi Rai Course
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {selectedCourse.isFree || selectedCourse.price === 0 ? 'FREE' : `₹${selectedCourse.price.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {selectedCourse.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedCourse.description}
                </p>

                {/* Check if PDF file was locally uploaded */}
                {selectedCourse.pdfDataUrl ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>PDF Document Available ({selectedCourse.pdfFileName || 'Course.pdf'})</span>
                    </div>
                    <a
                      href={selectedCourse.pdfDataUrl}
                      download={selectedCourse.pdfFileName || 'Somi_Rai_Course.pdf'}
                      className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Guide</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
                    <p className="font-bold">Instant Delivery via Somi Rai WhatsApp:</p>
                    <p>Connect directly to receive your private download link and bonus consultation materials.</p>
                  </div>
                )}

                {/* Primary WhatsApp Action */}
                <a
                  href={getWhatsAppCourseUrl(selectedCourse)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Get Course on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 py-1 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
