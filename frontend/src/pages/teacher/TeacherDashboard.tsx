import React from 'react';
import { MasteryChart } from '../../components/dashboard/MasteryChart';

export const TeacherDashboard: React.FC = () => {
  const classData = {
    'Số nguyên & Phép tính': 0.88,
    'Phân số & Phân thức': 0.42,
    'Phương trình bậc nhất': 0.58,
    'Phương trình bậc hai': 0.35,
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Bảng điều khiển giáo viên — Lớp 8A1</h1>
        <p className="text-sm text-slate-500">Phân tích mức độ nắm vững kiến thức toàn lớp</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800">Tỷ lệ thành thạo kỹ năng cả lớp</h3>
          <MasteryChart data={classData} />
        </div>

        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl space-y-3">
          <h3 className="font-semibold text-rose-900">Cảnh báo lỗ hổng chung</h3>
          <p className="text-sm text-rose-700">
            Hơn <strong>58% học sinh</strong> trong lớp đang gặp khó khăn ở kỹ năng <em>Phân số & Phân thức</em>. Đây là nguyên nhân khiến các bài giải phương trình bị sai sót nhiều.
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-rose-200 text-rose-800 rounded-md">
              Khuyến nghị: Dành 1 tiết ôn tập lại Phân thức đại số
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
