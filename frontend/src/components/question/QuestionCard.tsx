import React from 'react';
import { Question } from '../../types/question';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  disabled,
}) => {
  const options = [
    { key: 'A', text: question.option_a },
    { key: 'B', text: question.option_b },
    { key: 'C', text: question.option_c },
    { key: 'D', text: question.option_d },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
          Kỹ năng: {question.skill_id}
        </span>
        <span className="text-xs text-slate-400">Độ khó: {question.difficulty}/3</span>
      </div>

      <h3 className="text-lg font-medium text-slate-900 mb-6">{question.question_text}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map(({ key, text }) => (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(key)}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
              selectedOption === key
                ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium ring-2 ring-indigo-500'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            } ${disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold ${
                selectedOption === key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {key}
            </span>
            <span className="text-sm">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
