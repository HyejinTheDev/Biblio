import React, { useState, useEffect } from 'react';
import { questionApi } from '../../api/questionApi';
import { useSubmitAnswer } from '../../hooks/useSubmitAnswer';
import { Question, DifficultyTier } from '../../types/question';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface PracticeSessionProps {
  stageId?: string;
  initialDifficulty?: DifficultyTier;
  onBackToMap?: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({
  stageId = 'STAGE_1_1',
  initialDifficulty = 'normal',
  onBackToMap,
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyTier>(initialDifficulty);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { submit, submitting, result, reset } = useSubmitAnswer();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        reset();
        setSelectedOption(null);
        const data = await questionApi.getQuestionsByStage(stageId, difficulty);
        setQuestions(data);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Failed to load questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [stageId, difficulty]);

  const currentQuestion = questions[currentIndex] || null;

  const handleSubmit = async () => {
    if (!selectedOption || !currentQuestion) return;
    await submit({
      student_id: 'student_001',
      question_id: currentQuestion.id,
      selected_option: selectedOption,
      response_time_sec: 15.0,
      difficulty_tier: difficulty,
    });
  };

  const handleNextQuestion = () => {
    reset();
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getDifficultyBadge = (tier?: string) => {
    switch (tier) {
      case 'hell':
        return { label: 'ĐỊA NGỤC', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
      case 'hard':
        return { label: 'TRUNG BÌNH', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      default:
        return { label: 'THƯỜNG', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-white">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          {onBackToMap && (
            <button
              onClick={onBackToMap}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl transition-colors flex items-center gap-1"
            >
              ← Bản Đồ
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold text-white">
              Phòng Thử Thách: <span className="text-indigo-400">{stageId}</span>
            </h2>
          </div>
        </div>

        {/* 3-way Difficulty Toggles */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setDifficulty('normal')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              difficulty === 'normal'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Thường (50 EXP)
          </button>
          <button
            onClick={() => setDifficulty('hard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              difficulty === 'hard'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trung Bình (100 EXP)
          </button>
          <button
            onClick={() => setDifficulty('hell')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              difficulty === 'hell'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Địa Ngục (250 EXP)
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="text-xs text-slate-400 font-mono mt-3">Đang triệu hồi câu hỏi thử thách...</p>
        </div>
      ) : !currentQuestion ? (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-3">
          <p className="text-slate-300">Chưa có câu hỏi cho cấp độ này trong ải {stageId}.</p>
          <button
            onClick={() => setDifficulty('normal')}
            className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold"
          >
            Về cấp độ Thường
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    getDifficultyBadge(currentQuestion.difficulty_tier).color
                  }`}
                >
                  {getDifficultyBadge(currentQuestion.difficulty_tier).label}
                </span>
                <span className="text-xs font-mono text-indigo-400">
                  +{currentQuestion.exp_reward || 50} EXP
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Mã câu: {currentQuestion.id}
              </span>
            </div>

            {/* Question Title & Text */}
            <div className="space-y-3">
              {currentQuestion.question_title && (
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">
                  {currentQuestion.question_title}
                </h3>
              )}
              <div className="text-base md:text-lg font-medium text-slate-100 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {currentQuestion.question_text}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                { key: 'A', text: currentQuestion.option_a },
                { key: 'B', text: currentQuestion.option_b },
                { key: 'C', text: currentQuestion.option_c },
                { key: 'D', text: currentQuestion.option_d },
              ].map(({ key, text }) => {
                const isSelected = selectedOption === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={submitting || result !== null}
                    onClick={() => setSelectedOption(key)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-lg ring-2 ring-indigo-500/50'
                        : 'border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 text-slate-300'
                    } ${submitting || result !== null ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-xl text-xs font-black ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm leading-relaxed mt-0.5">{text}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Action */}
            {!result && (
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  disabled={!selectedOption || submitting}
                  onClick={handleSubmit}
                  className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {submitting ? 'Hệ thống đang chấm thi...' : 'Nộp Đáp Án Khiêu Chiến ⚔️'}
                </button>
              </div>
            )}
          </div>

          {/* Outcome / Victory / Defeat Modal Box */}
          {result && (
            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-2xl space-y-4 animate-fadeIn ${
                result.is_correct
                  ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500/40 text-emerald-300'
                  : 'bg-gradient-to-b from-rose-950/80 to-slate-900 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{result.is_correct ? '🏆' : '💀'}</span>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {result.is_correct ? 'CHIẾN THẮNG QUẢM CẢM!' : 'THỬ THÁCH THẤT BẠI!'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {result.recommended_message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-amber-400 text-xs font-bold border border-slate-700">
                    +{result.exp_gained} EXP
                  </span>
                  {result.stars_earned > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-amber-400 text-xs font-bold border border-slate-700">
                      {'★'.repeat(result.stars_earned)}
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed Technical Explanation */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-slate-300 text-xs leading-relaxed font-sans">
                <div className="font-bold text-white text-xs uppercase tracking-wide">
                  📖 Giải Thích Kỹ Thuật VinUni:
                </div>
                <p>{result.explanation}</p>
                <div className="pt-2 text-[11px] font-mono text-indigo-400 flex items-center justify-between border-t border-slate-800">
                  <span>Mức độ nắm vững BKT: {(result.new_mastery * 100).toFixed(1)}%</span>
                  <span>Trạng thái: {result.status_changed.toUpperCase()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                {onBackToMap && (
                  <button
                    onClick={onBackToMap}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Về Bản Đồ
                  </button>
                )}
                {currentIndex + 1 < questions.length && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors"
                  >
                    Câu Tiếp Theo →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
