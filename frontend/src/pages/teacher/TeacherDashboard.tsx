import React from 'react';
import { MasteryChart } from '../../components/dashboard/MasteryChart';

export const TeacherDashboard: React.FC = () => {
  const classData = {
    'Python & NumPy Vectorization': 0.84,
    'Đại Số Tuyến Tính & Gradient Calculus': 0.62,
    'Classical ML (Trees & XGBoost)': 0.55,
    'Deep Learning & PyTorch Autograd': 0.38,
    'Transformer & Self-Attention': 0.25,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-white">
      <header className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">
                Bảng Phân Tích Giảng Viên — Khóa AI Thực Chiến VinUni
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                Cohort 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Phân tích tỷ lệ nắm vững kỹ năng theo mô hình BKT của 42 học viên
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Sĩ số:</span> <span className="font-bold text-white">42</span>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Điểm BKT Trung Bình:</span>{' '}
              <span className="font-bold text-emerald-400">52.8%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-sm">
              Mức Độ Thành Thạo Toàn Khóa (BKT Mastery)
            </h3>
            <span className="text-xs text-slate-400">Cập nhật real-time</span>
          </div>
          <MasteryChart data={classData} />
        </div>

        <div className="space-y-4">
          <div className="bg-rose-950/40 border border-rose-500/30 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>⚠️ Cảnh Báo Lỗ Hổng Kiến Thức</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              Hơn <strong>72% ứng viên</strong> đang gặp khó khăn nghiêm trọng ở phần{' '}
              <em>Transformer & Self-Attention</em> (đặc biệt là công thức chia căn d_k và shape nhân ma trận QK^T).
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold px-3 py-1 bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/30">
                Đề xuất: Mở buổi Workshop Live Code Transformer Block bằng PyTorch
              </span>
            </div>
          </div>

          <div className="bg-amber-950/40 border border-amber-500/30 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>💡 Thống Kê Phỏng Vấn Thử (Mock Interview)</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Các câu hỏi cấp độ <strong>Địa ngục (Hell)</strong> về tối ưu hóa bộ nhớ RAM Pandas và
              Backpropagation đạo hàm ma trận có tỷ lệ trả lời đúng lần đầu chỉ đạt <strong>24%</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
