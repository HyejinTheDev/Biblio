import React, { useState, useEffect, useCallback } from 'react';
import { studentApi } from '../../api/studentApi';
import { AdventureMapData, StageNodeData, DifficultyTier } from '../../types/skill';
import { GamerProfileHeader } from '../../components/game/GamerProfileHeader';
import { PhaseSelector } from '../../components/game/PhaseSelector';
import { AdventureMap } from '../../components/game/AdventureMap';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface StudentDashboardProps {
  onStartStageBattle?: (stage: StageNodeData, difficulty: DifficultyTier) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onStartStageBattle }) => {
  const studentId = 'student_001';
  const [mapData, setMapData] = useState<AdventureMapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('phase_1');

  const fetchMapData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentApi.getAdventureMap(studentId);
      setMapData(data);
      if (data.phases.length > 0 && !selectedPhaseId) {
        setSelectedPhaseId(data.phases[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi tải bản đồ vượt ải');
    } finally {
      setLoading(false);
    }
  }, [studentId, selectedPhaseId]);

  useEffect(() => {
    fetchMapData();
  }, [fetchMapData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-slate-400 font-mono">Đang tải Bản đồ AI Thực Chiến VinUni...</p>
      </div>
    );
  }

  if (error || !mapData) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-slate-900 border border-rose-800 rounded-3xl text-rose-400">
        <p className="font-bold text-lg mb-2">Không thể tải dữ liệu bản đồ</p>
        <p className="text-sm text-slate-400 mb-4">{error}</p>
        <button
          onClick={fetchMapData}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500"
        >
          Thử Lại
        </button>
      </div>
    );
  }

  const currentPhase =
    mapData.phases.find((p) => p.id === selectedPhaseId) || mapData.phases[0];

  const handleSelectStageBattle = (stage: StageNodeData, difficulty: DifficultyTier) => {
    if (onStartStageBattle) {
      onStartStageBattle(stage, difficulty);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
      {/* RPG Gamer Profile Header */}
      <GamerProfileHeader
        profile={mapData.gamer_profile}
        overallProgress={mapData.overall_progress}
      />

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <span>✨ AI Agent VinUni Đề Xuất Chiến Thuật</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">
            Bạn đang ở <strong className="text-white">{currentPhase.title}</strong>. 
            Để đỗ vòng tuyển chọn VinUni, hãy tập trung thử thách ở cấp độ <strong className="text-amber-400">Trung bình</strong> và <strong className="text-rose-400">Địa ngục</strong> để làm quen bẫy phỏng vấn!
          </p>
        </div>

        <button
          onClick={() => {
            const firstActive = currentPhase.stages.find((s) => s.status === 'active') || currentPhase.stages[0];
            handleSelectStageBattle(firstActive, 'normal');
          }}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap transition-all"
        >
          Chiến Ải Tiếp Theo ⚔️
        </button>
      </div>

      {/* Phase Selection Tabs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Chọn Giai Đoạn (Phases):
          </h2>
          <span className="text-xs text-slate-400">4 Giai đoạn — 40 Ải thực chiến</span>
        </div>

        <PhaseSelector
          phases={mapData.phases}
          selectedPhaseId={selectedPhaseId}
          onSelectPhase={setSelectedPhaseId}
        />
      </section>

      {/* Main Adventure Stage Road */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-white">{currentPhase.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentPhase.description}</p>
          </div>
        </div>

        <AdventureMap
          stages={currentPhase.stages}
          onSelectStageBattle={handleSelectStageBattle}
        />
      </section>
    </div>
  );
};
