import React, { useState } from 'react';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { PracticeSession } from './pages/student/PracticeSession';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';

export const App: React.FC = () => {
  const [tab, setTab] = useState<'student' | 'practice' | 'teacher'>('student');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Navigation header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-lg">
              B
            </span>
            <span className="font-bold text-xl tracking-tight text-slate-900">Biblio</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTab('student')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === 'student' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Học sinh (Bản đồ)
            </button>
            <button
              onClick={() => setTab('practice')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === 'practice' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Luyện tập
            </button>
            <button
              onClick={() => setTab('teacher')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === 'teacher' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Giáo viên
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-8">
        {tab === 'student' && <StudentDashboard />}
        {tab === 'practice' && <PracticeSession />}
        {tab === 'teacher' && <TeacherDashboard />}
      </main>
    </div>
  );
};

export default App;
