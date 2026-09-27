import React, { useState } from 'react';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { PracticeSession } from './pages/student/PracticeSession';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { StageNodeData, DifficultyTier } from './types/skill';

export const App: React.FC = () => {
  const [tab, setTab] = useState<'student' | 'practice' | 'teacher'>('student');
  const [currentBattleStage, setCurrentBattleStage] = useState<string>('STAGE_1_1');
  const [currentBattleDifficulty, setCurrentBattleDifficulty] = useState<DifficultyTier>('normal');

  const handleStartStageBattle = (stage: StageNodeData, difficulty: DifficultyTier) => {
    setCurrentBattleStage(stage.id);
    setCurrentBattleDifficulty(difficulty);
    setTab('practice');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="font-black text-white text-base">B</span>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white">Biblio</span>
              <span className="ml-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                VINUNI AI TRACK
              </span>
            </div>
          </div>

          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setTab('student')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'student'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Bản Đồ Vượt Ải
            </button>
            <button
              onClick={() => setTab('practice')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚔️ Đấu Trường AI
            </button>
            <button
              onClick={() => setTab('teacher')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Báo Cáo Giảng Viên
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content View */}
      <main className="py-8">
        {tab === 'student' && (
          <StudentDashboard onStartStageBattle={handleStartStageBattle} />
        )}
        {tab === 'practice' && (
          <PracticeSession
            stageId={currentBattleStage}
            initialDifficulty={currentBattleDifficulty}
            onBackToMap={() => setTab('student')}
          />
        )}
        {tab === 'teacher' && <TeacherDashboard />}
      </main>
    </div>
  );
};

export default App;
