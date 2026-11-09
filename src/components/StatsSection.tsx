import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckCircle, BookOpen } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { statistics } = useApp();

  const stats = [
    {
      id: 'visitors',
      label: 'TOTAL VISITORS',
      value: statistics.totalVisitors.toLocaleString('en-IN') + '+',
      icon: Users,
      description: 'Satisfied visitors & community members',
      color: 'from-blue-600 to-indigo-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      id: 'solved',
      label: 'PROBLEMS SOLVED',
      value: statistics.problemsSolved.toLocaleString('en-IN') + '+',
      icon: CheckCircle,
      description: 'Account recoveries & resolved cases',
      color: 'from-purple-600 to-indigo-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      id: 'courses',
      label: 'PDF COURSES',
      value: statistics.pdfCoursesCount.toLocaleString('en-IN'),
      icon: BookOpen,
      description: 'Guides & educational material available',
      color: 'from-indigo-600 to-violet-600',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider border border-indigo-100">
            Verified Statistics
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Impact & Community Reach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-105">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight my-1">
                  {item.value}
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
