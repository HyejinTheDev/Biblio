import React, { useState } from 'react';
import { QuestionCard } from '../../components/question/QuestionCard';
import { AnswerInput } from '../../components/question/AnswerInput';
import { useSubmitAnswer } from '../../hooks/useSubmitAnswer';
import { Question } from '../../types/question';

export const PracticeSession: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const mockQuestion: Question = {
    id: 'Q3',
    skill_id: 'SKILL_FRAC',
    question_text: 'Rút gọn phân số 18/24 về dạng tối giản:',
    option_a: '2/3',
    option_b: '3/4',
    option_c: '4/3',
    option_d: '1/2',
    difficulty: 2,
  };

  const { submit, submitting, result, reset } = useSubmitAnswer();

  const handleSubmit = async () => {
    if (!selectedOption) return;
    await submit({
      student_id: 'student_001',
      question_id: mockQuestion.id,
      selected_option: selectedOption,
      response_time_sec: 12.5,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Luyện tập cá nhân hóa</h2>
        <span className="text-sm text-slate-500">Mã câu: {mockQuestion.id}</span>
      </div>

      <QuestionCard
        question={mockQuestion}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
        disabled={submitting || result !== null}
      />

      {!result && (
        <AnswerInput
          onSubmit={handleSubmit}
          isSubmitting={submitting}
          canSubmit={selectedOption !== null}
        />
      )}

      {result && (
        <div
          className={`p-6 rounded-2xl border ${
            result.is_correct
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="font-bold text-lg mb-2">
            {result.is_correct ? '🎉 Chính xác!' : '❌ Chưa chính xác!'}
          </div>
          <p className="text-sm mb-4">{result.explanation}</p>
          <div className="text-xs font-mono bg-white/70 p-3 rounded-lg border border-current">
            Mastery cập nhật qua BKT: {(result.new_mastery * 100).toFixed(1)}% ({result.status_changed})
          </div>
          <button
            onClick={() => {
              reset();
              setSelectedOption(null);
            }}
            className="mt-4 px-4 py-2 bg-white text-slate-800 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 text-sm"
          >
            Câu tiếp theo →
          </button>
        </div>
      )}
    </div>
  );
};
