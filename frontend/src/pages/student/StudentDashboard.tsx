import React from 'react';
import { useStudentState } from '../../hooks/useStudentState';
import { KnowledgeGraph } from '../../components/knowledge-graph/KnowledgeGraph';
import { ProgressBar } from '../../components/dashboard/ProgressBar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { SkillNodeData } from '../../types/skill';

export const StudentDashboard: React.FC = () => {
  const studentId = 'student_001';
  const { state, loading, error } = useStudentState(studentId);

  // Mock skills data combined with student masteries
  const skills: SkillNodeData[] = [
    {
      id: 'SKILL_INT',
      name: 'Số nguyên & Phép tính cơ bản',
      description: 'Cộng trừ nhân chia số nguyên',
      prerequisites: [],
      difficulty: 1,
      mastery_prob: state?.mastery_map['SKILL_INT'] ?? 0.85,
      status: (state?.mastery_map['SKILL_INT'] ?? 0.85) >= 0.75 ? 'mastered' : 'average',
    },
    {
      id: 'SKILL_FRAC',
      name: 'Phân số & Phân thức đại số',
      description: 'Rút gọn, quy đồng phân số',
      prerequisites: ['SKILL_INT'],
      difficulty: 2,
      mastery_prob: state?.mastery_map['SKILL_FRAC'] ?? 0.35,
      status: (state?.mastery_map['SKILL_FRAC'] ?? 0.35) < 0.45 ? 'weak' : 'average',
    },
    {
      id: 'SKILL_EQ1',
      name: 'Phương trình bậc nhất 1 ẩn',
      description: 'Giải phương trình ax + b = 0',
      prerequisites: ['SKILL_FRAC'],
      difficulty: 2,
      mastery_prob: state?.mastery_map['SKILL_EQ1'] ?? 0.5,
      status: 'average',
    },
  ];

  if (loading) return <LoadingSpinner size="lg" />;
  if (error) return <div className="p-8 text-center text-rose-600">Lỗi: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lộ trình học của {state?.name || 'Học sinh'}</h1>
          <p className="text-sm text-slate-500">Môn học: Toán học Lớp 8 — Thích ứng cá nhân hóa</p>
        </div>
        <div className="w-full md:w-72">
          <ProgressBar progress={state?.overall_progress || 65} />
        </div>
      </header>

      {/* Recommended Next Action Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-1">
            <span>📌 Gợi ý tiếp theo từ AI Agent</span>
          </div>
          <p className="text-slate-800 text-base">
            Hệ thống nhận diện bạn nên <strong className="text-indigo-900 font-semibold">ôn lại Phân số & Phân thức</strong> trước khi giải phương trình phức tạp hơn.
          </p>
        </div>
        <Button variant="primary" size="md">
          Bắt đầu luyện tập →
        </Button>
      </div>

      {/* Interactive Knowledge Graph */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <KnowledgeGraph skills={skills} />
      </section>
    </div>
  );
};
