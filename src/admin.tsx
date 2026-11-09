import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import { AdminPanel } from './components/AdminPanel';
import './index.css';

const AdminRoot: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <AdminPanel />
      </div>
    </AppProvider>
  );
};

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <AdminRoot />
  </React.StrictMode>
);
