import React from 'react';
import { Button } from '../common/Button';

interface AnswerInputProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
  canSubmit?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  onSubmit,
  isSubmitting = false,
  canSubmit = false,
}) => {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? 'Đang chấm điểm & phân tích...' : 'Gửi câu trả lời →'}
      </Button>
    </div>
  );
};
