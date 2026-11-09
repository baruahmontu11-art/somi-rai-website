/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactFlow } from './components/ContactFlow';
import { PdfCoursesSection } from './components/PdfCoursesSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Standalone admin lazy loaded only if directly accessed via path/hash
const AdminPanel = lazy(() => import('./components/AdminPanel').then((m) => ({ default: m.AdminPanel })));

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <StatsSection />
            <ServicesSection />
            <SocialSection />
          </>
        )}

        {activeView === 'contact' && <ContactFlow />}

        {activeView === 'courses' && <PdfCoursesSection />}

        {activeView === 'social' && <SocialSection />}

        {activeView === 'admin' && (
          <Suspense fallback={<div className="py-20 text-center text-slate-500 font-medium">Loading management area...</div>}>
            <AdminPanel />
          </Suspense>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

